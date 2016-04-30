<?php
require_once (BASE_PATH.'/google-api/examples/templates/base.php');
class API extends Controller {

	private static $allowed_actions = array (
		'trips', 'trip','usercount','distance','test','firebase','getUser','userTest'
	);


	public function init(){
		parent::init();
		$this->Title = 'CyclePhilly.org API';
	}

	public function getUser(){
		$query = new SQLQuery();
        $result = $query->setFrom('user')->setSelect('email,id')->addWhere("email = 'acri.corey@gmail.com'")->execute();
         foreach($result as $row) {
        	echo "ID: ".$row['id'].PHP_EOL;
        }
        
	}

	public function userTest(){
		$query = new SQLQuery();
        $result = $query->setFrom('user')->setSelect('email,id')->addWhere("email = 'juliana.f.reyes@gmail.com'")->execute();
         foreach($result as $row) {
        	echo "ID: ".$row['id'].PHP_EOL;
        }
	}

	public function test($userid){
		$window=5;
		$today = date('Y-m-d 00:00:00');
        $prevdate = date('Y-m-d 00:00:00', mktime(0, 0, 0, date("m")  , date("d")-$window, date("Y")));
        $query = new SQLQuery();
        //$result = $query->setFrom('trip')->setSelect('*')->addWhere("purpose = 'Commute'")->addWhere("start BETWEEN '".$prevdate."' AND '".$today."'")->execute();
        $result = $query->setFrom('trip')->setSelect('*')->addWhere("user_id = ".$userid)->execute();
        foreach($result as $row) {
        	echo "Start: ".$row['start'].PHP_EOL;
        }
	}
	public function firebase(){
		$fire = new Firebase('https://cyclephilly.firebaseio.com/','bi7GsULLfYOxmv47jt3gh2rgnN5XvjlnpLVTu8wy');
		
	}

	public function usercount(){
		//$count = DB::query('SELECT COUNT(*) FROM "trip"')->value();
		$fire = new Firebase('https://cyclephilly.firebaseio.com/stats/','bi7GsULLfYOxmv47jt3gh2rgnN5XvjlnpLVTu8wy');
		$query = new SQLQuery();
		$count = $query->setFrom('user')->setSelect('COUNT(*)')->execute();
		$fire->set('users/count',$count->value());
	}

	public function coordsByTrip($tripid,$skew=true){
		$query = new SQLQuery();
		$result = $query->setFrom('coord')->setSelect('*')->addWhere('trip_id = '.$tripid)->setOrderBy('recorded ASC')->execute();
		$first = $result->First();
		$last = $result->seek($result->numRecords());
		//var_dump($result->First());
		$prev = array();
		$dtotal = 0;
		$count = 0;
		foreach($result as $row) {
			$distanceFromStart = $this->dist($first['latitude'],$first['longitude'],$row['latitude'],$row['longitude'],"K");
			$distanceFromEnd = $this->dist($last['latitude'],$last['longitude'],$row['latitude'],$row['longitude'],"K");
			//echo "Distance from start: ".$distance.". Accuracy: ".$row['hAccuracy'].PHP_EOL;
			if ($distanceFromStart < .08 && $skew == true) {
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
				$dtotal += $d;

				// If over 500 points in trip, skip points by .2 km
				if($result->numRecords() > 500 && $d < 0.02){
					continue;
				}
			}
			$count++;
			$prev = $row;
			//echo $row['recorded'];
		}
		echo "Count: ".$count.PHP_EOL;
		return $count;
		//echo "Distance Total: ".$dtotal.PHP_EOL;

	}



	public function trip($request){
		//var_dump($request->param('ID'));
		
		//var_dump($tripdetails);
		if ($request->param('ID')) {
			if(is_numeric($request->param('ID'))){
				$this->tripInfo = self::tripInfo($request);
				$this->UserId = $this->tripInfo['user_id'];
				$this->TripId = $request->param('ID');
				switch ($request->param('OtherID')) {
					case 'details':
						# code...
						self::getTripDetails($request);
						break;
					
					default:
						# code...
						self::getTripData($request);
						break;
				}
			}
			
		}
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


	private function tripInfo($request){
		$points = array();
		$sqlQuery = new SQLQuery();
		$sqlQuery->setFrom('trip');
		$sqlQuery->setSelect(array('user_id','purpose','notes','start','stop','n_coord'));
		$sqlQuery->addWhere('id = '.$request->param('ID'));
		 
		// Get the raw SQL (optional)
		$rawSQL = $sqlQuery->sql();
		 
		// Execute and return a Query object
		$result = $sqlQuery->execute();
		 
		// Iterate over results
		foreach($result as $row) {
		  $points=$row;
		}
		return $points;
	}

	private function getTripData($request){
		$points = array();
		$sqlQuery = new SQLQuery();
		$sqlQuery->setFrom('coord');
		$sqlQuery->setSelect(array('latitude','longitude','recorded','altitude','speed'));
		$sqlQuery->addWhere('trip_id = '.$request->param('ID'));
		 
		// Get the raw SQL (optional)
		$rawSQL = $sqlQuery->sql();
		 
		// Execute and return a Query object
		$result = $sqlQuery->execute();
		 
		// Iterate over results
		foreach($result as $row) {
		  array_push($points,$row);
		}
		$data= array(
			"trip311"=>$points);

		echo json_encode($points);
	}

	private function getUserTrips($userId){
		$points = array();
		$sqlQuery = new SQLQuery();
		$sqlQuery->setFrom('trip');
		$sqlQuery->setSelect(array('id','purpose'));
		$sqlQuery->addWhere('user_id = '.$userId);
		 
		// Get the raw SQL (optional)
		$rawSQL = $sqlQuery->sql();
		 
		// Execute and return a Query object
		$result = $sqlQuery->execute();
		 
		// Iterate over results
		foreach($result as $row) {
		  array_push($points,$row);
		}
		return $points;
	}

	private function getTripDetails($request){
		$points = array();
		$sqlQuery = new SQLQuery();
		$sqlQuery->setFrom('coord');
		$sqlQuery->setSelect(array('recorded','altitude','speed'));
		$sqlQuery->addWhere('trip_id = '.$request->param('ID'));
		 
		// Get the raw SQL (optional)
		$rawSQL = $sqlQuery->sql();
		 
		// Execute and return a Query object
		$result = $sqlQuery->execute();
		// Iterate over results
		$timestamp = array();
		$count = 0;
		$avgspeed = 0;
		$speedTotal = 0;
		foreach($result as $row) {
			//var_dump($row);
			$timestamp[] = $row['recorded'];
			$speedTotal = $speedTotal+$row['speed'];
			++$count;
		  //array_push($points,$row);
		}
		

		$start = $timestamp[0];
		$end = end($timestamp);
		$d_start    = new DateTime($start); 
	    $d_end      = new DateTime($end); 
	    $diff = $d_start->diff($d_end); 
		
		$date = $d_start->format('M d, Y');
		$time = $d_start->format('H:i:s');
		$duration = $diff->format('%h').' hours, '.$diff->format('%i').' minutes, '.$diff->format('%s').' seconds';
		$avgspeed = $speedTotal / $count;
		$trips = self::getUserTrips($this->UserId);
		$data = array(
			"Date" => $date,
			"StartTime" => $time,
			"Purpose" => $this->tripInfo['purpose'],
			"Duration" => $duration,
			"AverageSpeed" => round($avgspeed,2),
			"TotalPoints" => $this->tripInfo['n_coord'],
			"UserTrips" => $trips);
		echo json_encode($data);
	}
    
}
