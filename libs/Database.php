<?php
/*
 *
 *TEMPLATE FOR Database CLASS. EDIT APPROPRIATELY AND RENAME TO "Database.php" 
 *
 */
 
require_once( 'Util.php' );

abstract class DatabaseConnection extends mysqli
{
	
	// const DATABASE = 'cyclelive';

	public function __construct( $host, $user, $password, $database, $port )
	{
		parent::__construct( $host, $user, $password, $database, $port );

		if ( mysqli_connect_error() )
			throw new DatabaseConnectionException();
	}

	public function query( $query )
	{
		if ( !($result = parent::query( $query ) ) )
			Util::log( __METHOD__ . "() ERROR {$this->errno}: {$this->error}: \"{$query}\"" );
		
		return $result;
	}
}

class LocalDatabaseConnection extends DatabaseConnection 
{
	//const HOST     = getenv('OPENSHIFT_MYSQL_DB_HOST');

	public function __construct()
	{
		$database = 'cyclelive';
		/*
		* If you are using openshift mysql database cartridge, or want to use it for testing, uncomment this section, and comment out any other database construct ref
		*/
		// This requires the inclusion of mysql db cartridge. 
		// $host = (getenv('OPENSHIFT_MYSQL_DB_HOST')) ? getenv('OPENSHIFT_MYSQL_DB_HOST') : putenv('OPENSHIFT_MYSQL_DB_HOST=localhost') ;
		// $port = (getenv('OPENSHIFT_MYSQL_DB_PORT')) ? getenv('OPENSHIFT_MYSQL_DB_PORT') : putenv('OPENSHIFT_MYSQL_DB_PORT=3306');
		// $user = (getenv('OPENSHIFT_MYSQL_DB_USERNAME')) ? getenv('OPENSHIFT_MYSQL_DB_USERNAME') : putenv('OPENSHIFT_MYSQL_DB_USERNAME=root') ;
		// $pass = (getenv('OPENSHIFT_MYSQL_DB_PASSWORD')) ? getenv('OPENSHIFT_MYSQL_DB_PASSWORD') : putenv('OPENSHIFT_MYSQL_DB_PASSWORD=root') ;

		// parent::__construct( getenv('OPENSHIFT_MYSQL_DB_HOST'), getenv('OPENSHIFT_MYSQL_DB_USERNAME'), getenv('OPENSHIFT_MYSQL_DB_PASSWORD'), self::DATABASE, getenv('OPENSHIFT_MYSQL_DB_PORT') );
		
		$host = 'your host here';
		$port = '3306';
		$user = 'cycleUser' ;
		$pass = '';
		parent::__construct( $host, $user, $pass, $database, $port );
	}
}

class DatabaseConnectionFactory 
{
	static protected $connection = null;

	public static function getConnection()
	{
		if ( self::$connection )
			return self::$connection;
		else
			return self::$connection = new LocalDatabaseConnection();
	}
}

class DatabaseException extends Exception
{
	public function __construct( $message, $code )
	{
		parent::__construct( $message, $code );
	}
}

class DatabaseConnectionException extends DatabaseException
{
	public function __construct( $message=null, $code=null )
	{
		if ( !$message )
			mysqli_connect_error();

		if ( !$code )
			mysqli_connect_errno();

		parent::__construct( mysqli_connect_error(), mysqli_connect_errno() );
	}
}

