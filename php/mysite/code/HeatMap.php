<?php

class HeatMap extends Controller {

	private static $allowed_actions = array (
		'index', 'getData'
	);


	public function init(){
		parent::init();
		$this->Title = 'CyclePhilly.org HeatMap';
	}

	public function index($request){
		//var_dump($request->param('ID'));
		if ($request->param('ID')) {
			$this->TripId= $request->param('ID');
		}else{
			$this->TripId = 311;
		}
		return $this->renderWith('HeatMap');
		
	}

	public function getData($request){
		include_once('CoordFactory.php');
		include_once('TripFactory.php');
		//include_once('UserFactory.php');
		include_once('Util.php');
		ob_start('ob_gzhandler');
		//Util::log( "t: {$_POST['t']} and q: {$_POST['q']}" );

		if($_POST['t']=="get_coords_by_trip"){	
			$obj = new CoordFactory();	
			echo $obj->getCoordsByTrip($_POST['q']);
		} else if ($_POST['t']=="get_trip_ids"){
			$obj = new TripFactory();
			echo $obj->getTripIds();	
		} else if($_POST['t']=="get_filtered_users"){	
			$obj = new TripFactory();	
			echo $obj->getTripAttrsByFilteredUser($_POST['demo'], $_POST['purpose']);
		} else {
			//no-op
		}

	}
    
}
