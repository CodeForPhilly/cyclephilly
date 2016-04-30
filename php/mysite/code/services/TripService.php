<?php

     	#doc
	#	classname:	TwitterTask
        #	scope:          PUBLIC
        #
	#/This task checks twitter ever hour for the latest updates

class TripService implements WebServiceable {

    public function __construct() {
        $this->CycleURL = "https://yourbase.firebaseio.com";
        $this->CycleSecret = "";
        $this->GAPIKey = "";

    }
    
    public function publicWebMethods() {
        return array(
            'query'      => 'GET',
            'count' => 'GET',
            'test' => 'GET',

        );
    }

    /* Sample Method */
    public function myMethod($param) {
        return array(
            'SomeParam'         => 'Goes here',
            'Boolean'           => true,
            'Return'            => $param,
        );
    }

    public function count(){
        $window=7;
        $fire = new Firebase($this->CycleURL,$this->CycleSecret);
        $controller = Director::get_current_page();
        $type = $controller->getRequest()->requestVar('type');
        
        //If save is true, save results to firebase
        $save = $controller->getRequest()->requestVar('save');
        //If save is true, path is required for which path to save to
        $path = $controller->getRequest()->requestVar('path');
        $start = ($controller->getRequest()->requestVar('start')) ? $controller->getRequest()->requestVar('start') : '-1 week';
        $end = ($controller->getRequest()->requestVar('end')) ? $controller->getRequest()->requestVar('end') : 'now';
        
        if($start){
            $startdate = date('Y-m-d 00:00:00', strtotime($start));
        }else{
            $startdate = date('Y-m-d 00:00:00', mktime(0, 0, 0, date("m")  , date("d")-$window, date("Y")));
        }
        
        $enddate = date('Y-m-d 00:00:00',strtotime($end));
        $query = new SQLQuery();
        $result = $query->setFrom('trip')->setSelect('*');

        if($type){
            $result->addWhere("purpose = '".$type."'");
        }
        $result->addWhere("start BETWEEN '".$startdate."' AND '".$enddate."'")->execute();

        if($save == true && $path){
            //Writing to firebase
            $fire->set($path,$result->count());
        }

        return array(
            'start' => $start,
            'end' => $end,
            'total' => $result->count()
        );
    }

    public function test(){
        $window=5;
        $today = date('Y-m-d 00:00:00');
        $prevdate = date('Y-m-d 00:00:00', mktime(0, 0, 0, date("m")  , date("d")-$window, date("Y")));
        $query = new SQLQuery();
        // $result = $query->setFrom('trip')->setSelect('*')->addWhere("purpose = 'Commute'")->addWhere("start BETWEEN '".$prevdate."' AND '".$today."'")->execute();
        $result = $query->setFrom('user')->setSelect('*')->addWhere("email = 'l@emelle.me'")->execute();
        $tripdata = array();
        foreach($result as $row) {
            var_dump($row);
            //array_push($trips, $row);
        }
        return array(
            'trips' => array('test'=>2,'test2'));
    }
       



    public function query(){
        //Search
        $controller = Director::get_current_page();
        $latestQuery = $controller->getRequest()->requestVar('latestQuery');
        $a = array();
        $start = $controller->getRequest()->requestVar('start');
        $start = (@!empty($start)) ? $start : 1 ;
        
        $sql = "https://www.googleapis.com/customsearch/v1?key=".$this->GAPIKey."&cx=008412048315283472498:hpaolvuy8y4&q=".$latestQuery.'&start='.$start.'&alt=json';
        $r = new RestfulService($sql,$expiry = 300);
        $resp = $r->request();
        $results = null;
        $status = $resp->getStatusCode();
        if ($status != 200){
            $b = array('title' =>'Site Maintanence',
            'link' => '',
            'snippet' => 'Site Maintanence');
            array_push($a,$b);
            var_dump($resp->getBody());
            return $a;
        }else{
            $results = json_decode($resp->getBody());
            foreach ($results->items as $r) {

                $b = array('title' =>$r->title,
                'link' => $r->link,
                'snippet' => $r->snippet);
                array_push($a,$b);
            }
            return $a;
        }
        
    }

}