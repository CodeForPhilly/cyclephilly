<?php

require_once('Database_dev.php');
require_once('Trip.php');

class TripFactory
{
	static $class = 'Trip';

	public static function insert( $user_id, $purpose, $notes, $start )
	{
		$db = DatabaseConnectionFactory::getConnection();

		$query = "INSERT INTO trip ( user_id, purpose, notes, start ) VALUES ( '" .
				$db->escape_string( $user_id ) . "', '" .
				$db->escape_string( $purpose ) . "', '" .
				$db->escape_string( $notes ) . "', '" .
				$db->escape_string( $start ) . "' )";

		if ( ( $db->query( $query ) === true ) &&
			 ( $id = $db->insert_id ) )
		{
			Util::log( __METHOD__ . "() created new trip {$id} for user {$user_id}, start {$start}, {$purpose}: {$notes}" );
			return self::getTrip( $id );
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to create new trip for user {$user_id}, start {$start}, {$purpose}: {$notes}" );

		return false;
	}

	/* Returns a Trip object for the given tripid */ 
	public static function getTrip( $id )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$trip = null;

		if ( ( $result = $db->query( "SELECT * FROM trip WHERE id='" . $db->escape_string( $id ) . "'" ) ) &&
				( $result->num_rows ) )
		{
			$trip = $result->fetch_object( self::$class );
			$result->close();
		}

		return $trip;
	}
  
	/**
	* Returns an array of trip ids within the given bounding box. 
	* Returns null for error.
	* Returns an empty array if no Trips are found.
	**/
	public static function getTripsByBoundingBox( $lat_center, $lat_maxdist, 
		$long_center, $long_maxdist) 
	{
		$query = "SELECT distinct trip_id from coord where latitude>=" . ($lat_center-$lat_maxdist);
		$query .= " and latitude<=" . ($lat_center+$lat_maxdist);
		$query .= " and longitude>=" . ($long_center-$long_maxdist);
		$query .= " and longitude<=" . ($long_center+$long_maxdist);
		$db = DatabaseConnectionFactory::getConnection();
		$result = $db->query($db->escape_string($query));

		// no result, empty array
		if ($result->num_rows == 0) { return array(); }

		$trips = array();
		while ($trip_id = $result->fetch_array())
		{
			$trips[] = $trip_id['trip_id'];
		}

		$result->close();
		return $trips;
	}

	public static function getTripByUserStart( $user_id, $start )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$trip = null;

		$query = "SELECT * FROM trip WHERE user_id='" . $db->escape_string( $user_id ) . "' AND " .
				 "start='" . $db->escape_string( $start ) . "'";

		if ( ( $result = $db->query( $query ) ) &&
				( $result->num_rows ) )
		{
			$trip = $result->fetch_object( self::$class );
			$result->close();
		}

		return $trip;
	}

	/**
	* Given a trip_id, returns the age, gender, homeZIP, schoolZIP, workZIP and
	* cycling frequency as an associative array.  Returns null if nothing found.
	*/
	public static function getTripAttrsByTrips($trip_id) {
		$db = DatabaseConnectionFactory::getConnection();
		$query = "select trip.id,user.id,age,gender,homezip,schoolzip,workzip,cycling_freq.text,purpose,device from trip LEFT JOIN (user,cycling_freq) on (user.id=trip.user_id AND user.cycling_freq=cycling_freq.id) where trip.id='" . $db->escape_string($trip_id) . "' ORDER BY trip.id ASC";

		if ( ( $result = $db->query( $query ) ) && $result->num_rows )
		{
			$toret = $result->fetch_array();
			$result->close();
			return $toret;
		}
		return null;
 	}

	public static function update( $id, $stop, $n_coord )
	{
		$db = DatabaseConnectionFactory::getConnection();

		$query = "UPDATE trip SET " .
				 "stop='" . $db->escape_string( $stop ) . "', " .
				 "n_coord='" . $db->escape_string( $n_coord ) . "' " .
				 "WHERE id='" . $db->escape_string( $id ) . "' LIMIT 1";

		if ( $db->query( $query ) ) 
		{
			Util::log( __METHOD__ . "() updated trip {$id}" );
			return self::getTrip( $id );
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to update trip {$id}: {$query}" );

		return false;
	}
	
	public static function getTripIds(){
		$db = DatabaseConnectionFactory::getConnection();
		$trip_ids = array();

		$query = "SELECT id FROM trip";

		$result = $db->query( $query );		
		while ( $trip = $result->fetch_object( self::$class ) )
				$trip_ids[] = $trip;

		$result->close();
		 
		return json_encode($trip_ids);
	}
	
	public static function getTripIdsByNotes($tag){
		$db = DatabaseConnectionFactory::getConnection();
		$trip_ids = array();

		$query = "SELECT id FROM trip WHERE notes LIKE '%{$tag}%'";

		$result = $db->query( $query );		
		while ( $trip = $result->fetch_object( self::$class ) )
				$trip_ids[] = $trip;

		$result->close();
		 
		return json_encode($trip_ids);
	}
}
