<?php

/**
* @desc collect static utility functions here
*/
class Util
{
	const DEV_HOSTNAME  = 'mytracks.phillyopen.org';
	const PROD_HOSTNAME = 'mytracks.phillyopen.org';

	protected static $hostname = null;

	public static function log( $data )
	{
		if ( is_string( $data ) )
		{
			if ( defined( '__SCRIPT__' ) )
				$data = __SCRIPT__ . " {$data}";

			error_log( $data );
		}
		elseif ( is_object( $data ) && $data instanceof Exception )
			error_log( $data->__toString() );
		else
			error_log( var_export( $data, true ) );
	}

	/**
	 * @desc produces a case-sensitive URL-safe base64-encoded hash
	 * NOTE: throws away any '=' characters for padding;
	 *       which results in an un-decodeable string.
	 * @param binary $data
	 */
	public static function hash64( $data )
	{
		$base64	= base64_encode( $data );
		$replace = array (
				'+' => '-',
				'/' => '_',
				'=' => '',
				);
		//$hash64 = strtr( $base64, '+/=', '-_.' );
		$hash64 = strtr( $base64, $replace );
		return $hash64;
	}

	/**
	 * @desc produces a case-sensitive URL-safe base64-encoded hash
	 * @param string $url
	 */
	public static function hashURL( $url )
	{
		return self::hash64( md5( $url, true ) );
	}

	/**
	 * @desc decode a URL-safe base64 encoded data
	 */
	public static function safe64_decode( $safe64 )
	{
		$base64	= strtr( $safe64, '-_.', '+/=' );
		$data	= base64_decode( $base64 );
		return $data;
	}

	/**
	 * @desc encode a URL-safe base64 encoded data
	 */
	public static function safe64_encode( $data )
	{
		$base64	= base64_encode( $data );
		$safe64 = strtr( $base64, '+/=', '-_.' );
		return $safe64;
	}

	public static function baseURL()
	{
		if ( self::httpHost() != self::serverAddr() )
			$base = self::httpHost();
		else
			$base = self::serverName();

		return "http://{$base}/";
	}

	public static function isDev()
	{
		return ( self::hostName() === self::DEV_HOSTNAME );
	}

	public static function isProd()
	{
		return ( self::hostName() === self::PROD_HOSTNAME );
	}

	public static function hostName()
	{
		if ( !isset( self::$hostname ) )
			self::$hostname = trim( `/bin/hostname` );

		return self::$hostname; 
	}

	public static function httpHost()
	{
		return $_SERVER['HTTP_HOST'];
	}

	public static function serverAddr()
	{
		return $_SERVER['SERVER_ADDR'];
	}

	public static function serverName()
	{
		return $_SERVER['SERVER_NAME'];
	}
	
	//additional utilities
	
	/**
	 * @desc return distance (in km) between a pair of lat-longs.
	 */
	public static function latlongPointDistance($lat1, $lng1, $lat2, $lng2)
	{
		$pi80 = M_PI / 180;
		$lat1 *= $pi80;
		$lng1 *= $pi80;
		$lat2 *= $pi80;
		$lng2 *= $pi80;
	 
		$r = 6372.797; // mean radius of Earth in km
		$dlat = $lat2 - $lat1;
		$dlng = $lng2 - $lng1;
		$a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		$km = $r * $c;
	 
		return ($km);
	}

}

