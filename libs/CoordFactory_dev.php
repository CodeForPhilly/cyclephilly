<?php

require_once('Database_dev.php');
require_once('Coord.php');

class CoordFactory
{
	static $class = 'Coord';

	public static function insert( $trip_id, $recorded, $latitude, $longitude, $altitude=0, $speed=0, $hAccuracy=0, $vAccuracy=0 )
	{
		$db = DatabaseConnectionFactory::getConnection();

		$query = "INSERT INTO coord ( trip_id, recorded, latitude, longitude, altitude, speed, hAccuracy, vAccuracy ) VALUES ( '" .
				$db->escape_string( $trip_id ) . "', '" .
				$db->escape_string( $recorded ) . "', '" .
				$db->escape_string( $latitude ) . "', '" .
				$db->escape_string( $longitude ) . "', '" .
				$db->escape_string( $altitude ) . "', '" .
				$db->escape_string( $speed ) . "', '" .
				$db->escape_string( $hAccuracy ) . "', '" .
				$db->escape_string( $vAccuracy ) . "' )";

		if ( $db->query( $query ) === true )
		{
			//Util::log( __METHOD__ . "() added coord ( {$latitude}, {$longitude} ) to trip $trip_id" );
			return true;
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to add coord ( {$latitude}, {$longitude} ) to trip $trip_id" );

		return false;
	}

	// trip_id can be a single id, or an array of ids
	// if it's an array of ids, returns the result object directly because creating an
	// array of hundreds of thousands of Coord objects is memory-intensive and not useful
	public static function getCoordsByTrip( $trip_id )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$coords = array();
		$query = "SELECT * FROM coord WHERE ";
	    if (is_array($trip_id)) {
	      $first = True;
	  		foreach ($trip_id as $idx => $single_trip_id ) {
	        	if ($first) {
					$first = False;
				} else {
					$query .= " OR ";
				}
				$query .= "trip_id='" . $db->escape_string($single_trip_id) . "'";
			}
		} else {
			$query .= "trip_id='" . $db->escape_string( $trip_id ) . "'";
		}
		$query .= " ORDER BY trip_id ASC, recorded ASC";
		/*
Util::log( __METHOD__ . "() with query of length " . strlen($query) . 
			': memory_usage = ' . memory_get_usage(True));
*/

		if ( ( $result = $db->query( $query ) ) && $result->num_rows )
		{
		  /*
Util::log( __METHOD__ . "() with query of length " . strlen($query) . 
				' returned ' . $result->num_rows .' rows: memory_usage = ' . memory_get_usage(True));
*/

			// if the request was for an array of trip_ids then just return the $result class
			// (I know, this is not very OO but putting it all in a structure in memory is no good either
			// cL note: not clear this will work over JSON.
			if (is_array($trip_id)) {
				return $result;
			}

			while ( $coord = $result->fetch_object( self::$class ) )
				$coords[] = $coord;

			$result->close();
		}
		/*
Util::log( __METHOD__ . "() with query of length " . strlen($query) . 
			' RET2: memory_usage = ' . memory_get_usage(True));
*/

		return json_encode($coords);
	}
}
