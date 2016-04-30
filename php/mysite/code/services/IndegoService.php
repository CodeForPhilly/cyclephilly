<?php

     	#doc
	#	classname:	TwitterTask
        #	scope:          PUBLIC
        #
	#/This task checks twitter ever hour for the latest updates

class IndegoService implements WebServiceable {

    public function __construct() {
        $this->CycleURL = "https://cyclephilly.firebaseio.com";
        $this->PHLURL = "https://phl.firebaseio.com";
        $this->CycleSecret = "bi7GsULLfYOxmv47jt3gh2rgnN5XvjlnpLVTu8wy";
        $this->PHLSecret = "91Hnwq3bFhPcIeXSfibsVm0E1li0mYN1TqtW5r8J";

    }
    
    public function publicWebMethods() {
        return array(
            'sync'      => 'GET',
            'test' => 'GET',
            'stations' => 'GET',
            'citystations' => 'GET',
            'station' => 'GET',
            'racks' => 'GET'
        );
    }

    public function myMethod($param) {
        return array(
            'SomeParam'         => 'Goes here',
            'Boolean'           => true,
            'Return'            => $param,
        );
    }

    public function racks(){
        // https://raw.githubusercontent.com/CityOfPhiladelphia/phl-open-geodata/master/bike_racks/bike_racks.csv
        $fire = new Firebase($this->PHLURL,$this->PHLSecret);
        $phlracks = "https://raw.githubusercontent.com/CityOfPhiladelphia/phl-open-geodata/master/bike_racks/bike_racks.csv";
        $rr = new RestfulService($phlracks,$expiry2 = 6000);
        $resp2 = $rr->request();
        $racks = json_decode($resp2->getBody());
        var_dump($racks);exit;
        foreach ($racks->features as $key => $value) {
            // var_dump($value);
            $fire->set("indego/kiosks/".$value->properties->kioskId,$value);
        }
        // $fire->set("_indego_raw",$indego);
        // var_dump($indego);exit;
        return array(
            'trips' => array('test'=>2,'test2'));
    }

    public function stations(){
        $fire = new Firebase($this->PHLURL,$this->PHLSecret);
        $indego = $fire->get("indego/kiosks/");
        // var_dump($indego);exit;
        return json_decode($indego);
    }
    
    public function citystations(){
	$phlapi = "https://api.phila.gov/bike-share-stations/v1";
        $rr = new RestfulService($phlapi,$expiry2 = 60);
        $resp2 = $rr->request();
        $indego = json_decode($resp2->getBody());
	return $indego;
    }

    public function station($id){
        $fire = new Firebase($this->PHLURL,$this->PHLSecret);
        $indego = $fire->get("indego/kiosks/".$id);
        // var_dump($indego);exit;
        return json_decode($indego);
    }

    public function sync(){
        $fire = new Firebase($this->PHLURL,$this->PHLSecret);
        $phlapi = "https://api.phila.gov/bike-share-stations/v1";
        $rr = new RestfulService($phlapi,$expiry2 = 60);
        $resp2 = $rr->request();
        $indego = json_decode($resp2->getBody());
        var_dump($indego);
        foreach ($indego->features as $key => $value) {
            // var_dump($value);
            $fire->set("indego/kiosks/".$value->properties->kioskId,$value);
        }
        // $fire->set("_indego_raw",$indego);
        // var_dump($indego);exit;
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
