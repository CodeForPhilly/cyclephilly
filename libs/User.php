<?php

class User
{
	public $id;
	public $created;
	public $device;
	public $email;
	public $age;
	public $gender;
	public $ethnicity;
	public $income;
	public $homeZIP;
	public $schoolZIP;
	public $workZIP;
	public $cycling_freq;
	public $rider_history;
	public $rider_type;
	public $app_version;
	

	public function __construct( $object=null )
	{
		if ( is_object( $object ) )
		{
			// NOTE: trim string values to remove whitespace
			// "Tell us about yourself"
			if ( isset( $object->email ) )
				$this->email        = trim( $object->email );

			if ( isset( $object->age ) )
				$this->age          = $object->age;

			if ( isset( $object->gender ) )
				$this->gender       = $object->gender;

			if ( isset( $object->ethnicity ) )
				$this->ethnicity       = $object->ethnicity;

			if ( isset( $object->income ) )
				$this->income       = $object->income;

			if ( isset( $object->gender ) )
				$this->gender       = $object->gender;
			
			// "Your Typical Commute"
			if ( isset( $object->homeZIP ) )
				$this->homeZIP      = trim( $object->homeZIP );

			if ( isset( $object->schoolZIP ) )
				$this->schoolZIP    = trim( $object->schoolZIP );

			if ( isset( $object->workZIP ) )
				$this->workZIP      = trim( $object->workZIP );
			
			/*
			if ( isset( $object->cycling_freq ) )
				$this->cycling_freq = $object->cycling_freq;
			*/
			
			// "How often do you cycle?"
			if ( isset( $object->cyclingFreq ) )
				$this->cycling_freq = $object->cyclingFreq;
						
			// "What kind of rider are you?"
			if ( isset( $object->rider_type ) )
				$this->rider_type = $object->rider_type;

			// "How long have you cycled?"
			if ( isset( $object->rider_history ) )
				$this->rider_history = $object->rider_history;
				
			// app version
			if ( isset( $object->app_version ) )
				$this->app_version = $object->app_version;
		}
	}

	/**
	* @desc return user-editable personal info fields
	* @return array of user-editable personal info fields as key / value pairs
	*/
	public function getPersonalInfo()
	{
		$info = array(
			'email'        	=> $this->email,
			'age'          	=> $this->age,
			'gender'       	=> $this->gender,
			'ethnicity'    	=> $this->ethnicity,
			'income'       	=> $this->income,
			'homeZIP'      	=> $this->homeZIP,
			'schoolZIP'    	=> $this->schoolZIP,
			'workZIP'      	=> $this->workZIP,
			'cycling_freq' 	=> $this->cycling_freq,
			'rider_type' 	=> $this->rider_type,
			'rider_history' => $this->rider_history,
			'app_version'	=> $this->app_version,
			
		);

		return $info;
	}
}
