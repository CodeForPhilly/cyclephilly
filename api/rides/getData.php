<?php
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

?>
