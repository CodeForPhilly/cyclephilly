<?php

class SingleTripMap extends Controller {

	private static $allowed_actions = array (
		't', 'trip'
	);


	public function init(){
		parent::init();
		$this->Title = 'CyclePhilly.org API';
	}

	public function t($request){
		//var_dump($request->param('ID'));
		if ($request->param('ID')) {
			$this->TripId= $request->param('ID');
		}else{
			$this->TripId = 311;
		}
		return $this->renderWith('GMap');
		
	}
    
}
