<?php

     	#doc
	#	classname:	TwitterTask
        #	scope:          PUBLIC
        #
	#/This task checks twitter ever hour for the latest updates

class TripsService implements WebServiceable {

    public function __construct() {
        
    }
    
    public function publicWebMethods() {
        return array(
            'heat'      => 'GET',
            'get' => 'GET'
        );
    }

    public function myMethod($param) {
        return array(
            'SomeParam'         => array('test','test2'),
            'Boolean'           => true,
            'Return'            => $param,
        );
    }

    public function get($userid){
        $window=5;
        $today = date('Y-m-d 00:00:00');
        $prevdate = date('Y-m-d 00:00:00', mktime(0, 0, 0, date("m")  , date("d")-$window, date("Y")));
        $query = new SQLQuery();
        // $result = $query->setFrom('trip')->setSelect('*')->addWhere("purpose = 'Commute'")->addWhere("start BETWEEN '".$prevdate."' AND '".$today."'")->execute();
        $result = $query->setFrom('trip')->setSelect('*')->addWhere("user_id = ".$userid)->execute();
        $tripdata = array();
        foreach($result as $row) {
            var_dump($row);
            //array_push($trips, $row);
        }
        return array(
            'trips' => array('test'=>2,'test2'));
    }
       
#doc
    #   methodname:  heat
        #   scope:          PUBLIC
        #
    #/This method produces json for heat map
    public function heat($purpose,$window=30,$skew=true){
        //Get Trips by purpose
        $today = date('Y-m-d 00:00:00');
        $prevdate = date('Y-m-d 00:00:00', mktime(0, 0, 0, date("m")  , date("d")-$window, date("Y")));
        $query = new SQLQuery();
        $result = $query->setFrom('trip')->setSelect('*')->addWhere("purpose = 'Commute'")->addWhere("start BETWEEN '".$prevdate."' AND '".$today."'")->execute();
        $ncoords = 0;
        $coords = array();
        foreach($result as $row) {
            $ncoords += $row['n_coord'];
            $c = $this->coordsByTrip($row['id']);
            $coords= $coords + $c;
            //echo "Count: ".$row['n_coord'].PHP_EOL;
        }
        return $coords;
    }

    public function coordsByTrip($tripid,$skew=true){
        $query = new SQLQuery();
        $result = $query->setFrom('coord')->setSelect('latitude,longitude')->addWhere('trip_id = '.$tripid)->setOrderBy('recorded ASC')->execute();
        $first = $result->First();
        $last = $result->seek($result->numRecords());

        //var_dump($result->First());
        $prev = array();
        $dtotal = 0;
        $count = 0;
        $coords = array();
        foreach($result as $row) {
            $distanceFromStart = $this->dist($first['latitude'],$first['longitude'],$row['latitude'],$row['longitude'],"K");
            $distanceFromEnd = $this->dist($last['latitude'],$last['longitude'],$row['latitude'],$row['longitude'],"K");
            //echo "Distance from start: ".$distance.". Accuracy: ".$row['hAccuracy'].PHP_EOL;
            if ($distanceFromStart < .04 && $skew == true) {
                # skew...
                continue;
            }
            if ($distanceFromEnd < .04 && $skew == true) {
                # skew...
                continue;
            }
            if(!empty($prev)){
                //Distance between points
                $d = $this->dist($prev['latitude'],$prev['longitude'],$row['latitude'],$row['longitude'],"K");
                //$dtotal += $d;

                // If over 500 points in trip, skip points by .2 km
                /*if($result->numRecords() > 500 && $result->numRecords() < 1500 && $d < 0.02){
                    continue;
                }*/
                if($result->numRecords() > 500 && $d < 0.04){
                    continue;
                }
            }
            //$count++;
            array_push($coords, array($row['latitude'],$row['longitude']));
            $prev = $row;
            //echo $row['recorded'];
        }
        //echo "Count: ".$count.PHP_EOL;
        return $coords;
        //echo "Distance Total: ".$dtotal.PHP_EOL;

    }

    private function dist($lat1, $lon1, $lat2, $lon2, $unit) {

        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }
    }
}