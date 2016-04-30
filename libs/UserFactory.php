<?php

require_once('Database.php');
require_once('User.php');

class UserFactory
{
	static $class = 'User';

	public static function insert( $device )
	{
		$db = DatabaseConnectionFactory::getConnection();

		$query = "INSERT INTO user ( device ) VALUES ( '" .
				$db->escape_string( $device ) . "' )";

		if ( ( $db->query( $query ) === true ) &&
			 ( $id = $db->insert_id ) )
		{
			Util::log( __METHOD__ . "() created new user {$id} for device {$device}" );
			return self::getUser( $id );
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to create new user for device {$device}" );

		return false;
	}

	public static function getUser( $id )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$user = null;

		if ( ( $result = $db->query( "SELECT * FROM user WHERE id='" . $db->escape_string( $id ) . "'" ) ) &&
				( $result->num_rows ) )
		{
			$user = $result->fetch_object( self::$class );
			$result->close();
		}

		return $user;
	}

	public static function getUserByDevice( $device, User $userdata )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$user = null;

		//First query by Email
		foreach ( $userdata->getPersonalInfo() as $key => $value )
		{
			Util::log($key." -> ".$value );
			if ( !empty( $value ) || is_numeric( $value ) )
			{
				if($key == 'email'){
					//add the email address to the email table as well
					Util::log("email: ".$value );
					$result = $db->query( "SELECT * FROM user WHERE email='" .$value. "'");
					if ( $result->num_rows > 0 ){
						$user = $result->fetch_object( self::$class );
						$result->close();
						Util::log("user by email!" );
						return $user;
					}else{
						if($value != null){
							//Update by email
							$q = "INSERT INTO user ( email ) VALUES ( '" . $value . "' )";

							if ( ( $result = $db->query( $q ) === true ))
							{
								Util::log( __METHOD__ . "() created new user for email {$value}" );
								$user = $result->fetch_object( self::$class );
								$result->close();
								Util::log("user by email!" );
								return $user;
							}
							else
								Util::log( __METHOD__ . "() ERROR failed to create new user for device {$value}" );
						}
					}
				}
			}			
		}

		if ( ( $result = $db->query( "SELECT * FROM user WHERE device='" . $db->escape_string( $device ) . "'" ) ) &&
				( $result->num_rows ) )
		{
			$user = $result->fetch_object( self::$class );
			$result->close();
			Util::log("user by id!" );
			return $user;
		}else{
			$result = $db->query( "SELECT * FROM user WHERE id=4");
			$user = $result->fetch_object( self::$class );
			$result->close();
			Util::log("Anon User!");
			return $user;
		}
		
	}

	public static function getUserByEmail( $email )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$user = null;

		if ( ( $result = $db->query( "SELECT * FROM user WHERE device='" . $db->escape_string( $device ) . "'" ) ) &&
				( $result->num_rows ) )
		{
			$user = $result->fetch_object( self::$class );
			$result->close();
		}

		return $user;
	}

	/**
	* @desc update user record identified by $old with diffs in $new
	* @param User $old object instantiated from current DB record for user
	* @param User $new object instantiated from client data
	*/
	public static function update( User $old, User $new )
	{
		$db = DatabaseConnectionFactory::getConnection();

		$update = '';
		
		$noAppVersion = true;
		$email = null;
		//$fields = (array) $old;
		foreach ( $new->getPersonalInfo() as $key => $value )
		{
			// only update values if non-null or '0'

			if ( !empty( $value ) || is_numeric( $value ) )
			{
				//and only if it's not the email address, handle that elsewhere
				//if($key != 'email'){
				Util::log( "updating {$key}\t=> '{$value}'" );
				if ( !empty( $update ) )
					$update .= ', ';

				$update .= "{$key}='" . $db->escape_string( $value ) . "'";
				//}
				if($key == 'email'){
					//add the email address to the email table as well
					self::addEmail( $value );	
					$email = $value;					
					
				}
				if($key == 'app_version'){
					$noAppVersion = false;
				}			
			}
		}
		if($noAppVersion){
			if ( !empty( $update ) )
					$update .= ', ';
			$update .= "app_version='1.0'";
		}
		// sanity check - ensure we have at least one field to update
		// and a valid user.id to work with
		if ( $update && isset( $old->id ) && $old->id )
		{
			// build update query
			$result = $db->query( "SELECT * FROM user WHERE email='" .$email. "'");
			if ( $result->num_rows > 0 ){

				$query = "UPDATE user SET {$update} WHERE email='" . $email . "' LIMIT 1";
			}else{
				// Email Address not found. check if email exists; if does, update by email; else by userid
				if($email != null){
					//Update by email
					$q = "INSERT INTO user ( email ) VALUES ( '" .
					$email . "' )";

					if ( ( $db->query( $q ) === true ))
					{
						Util::log( __METHOD__ . "() created new user {$id} for email {$email}" );
						//Now Update User info by email
						$query = "UPDATE user SET {$update} WHERE email='" . $email . "' LIMIT 1";
					}
					else
						Util::log( __METHOD__ . "() ERROR failed to create new user for device {$email}" );
				}else{
					$query = "UPDATE user SET {$update} WHERE id='" . $db->escape_string( $old->id ) . "' LIMIT 1";
				}
			}

			if ( $db->query( $query ) ) 
			{
				Util::log( __METHOD__ . "() updated user {$old->id}:" );
				Util::log( $query );
				return self::getUser( $old->id );
			}
			else
				Util::log( __METHOD__ . "() ERROR failed to update user {$old->id}" );
		}
		else
			Util::log( __METHOD__ . " nothing to do" );

		return false;
	}
	
	public static function addEmail( $email )
	{
		$db = DatabaseConnectionFactory::getConnection();
//		$query = "INSERT into email (email_address) VALUES ('".$db->escape_string( $email )."')";
		$query = "INSERT into email (email) SELECT '".$db->escape_string( $email )."' FROM email WHERE email='".$db->escape_string( $email )."' HAVING COUNT(*)=0";
		if ( $db->query( $query ) ) 
		{
			Util::log( __METHOD__ . "() added email {$email}:" );
			Util::log( $query );			
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to add email {$email}" );		
	}
}
