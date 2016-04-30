<?php

class ChatPrompt extends Controller {

	private static $allowed_actions = array (
		't', 'trip','room'
	);


	public function init(){
		parent::init();
		$this->Title = 'CyclePhilly.org Prompt';
	}

	public function index($request){
		//var_dump($request->param('ID'));
		if ($request->param('ID')) {
			$this->TripId= $request->param('ID');
		}else{
			$this->TripId = 311;
		}
		return $this->renderWith('Chat');
		
	}
    
}
