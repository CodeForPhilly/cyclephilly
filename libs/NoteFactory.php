<?php

require_once('Database.php');
require_once('Note.php');
require_once(dirname(__FILE__).'/pel/PelJpeg.php');

define ('IMAGE_PATH', '../uploads/');

class NoteFactory
{
	static $class = 'Note';

	public static function insert( $user_id, $recorded, $latitude, $longitude, $altitude=0, $speed=0, $hAccuracy=0, $vAccuracy=0, $note_type, $details, $image_url, $image_file )
	{
		$db = DatabaseConnectionFactory::getConnection();		
		$query = "INSERT INTO note ( user_id, recorded, latitude, longitude, altitude, speed, hAccuracy, vAccuracy, note_type, details, image_url ) VALUES ( '" .
				$db->escape_string( $user_id ) . "', '" .
				$db->escape_string( $recorded ) . "', '" .
				$db->escape_string( $latitude ) . "', '" .
				$db->escape_string( $longitude ) . "', '" .
				$db->escape_string( $altitude ) . "', '" .
				$db->escape_string( $speed ) . "', '" .
				$db->escape_string( $hAccuracy ) . "', '" .
				$db->escape_string( $vAccuracy ) . "', '" .
				$db->escape_string( $note_type ) . "', '" .
				$db->escape_string( $details ) . "', '" .
				$db->escape_string( $image_url ) . "' )";

		if ( $db->query( $query ) === true &&
			 ( $id = $db->insert_id ) )
		{
			Util::log( __METHOD__ . "() added note for user {$user_id}, at ( {$latitude}, {$longitude} ), on {$recorded}, type {$note_type}, details {$details}" );
			
			$query = "SELECT text from note_type WHERE id=". $note_type;
			$result = $db->query($db->escape_string($query));
			
			// no result, empty array
			// if ($result->num_rows == 0) { return array(); }
			
			$note_type_text = $result->fetch_object()->text;
			$result->close();
			//return $trips;
			
			Util::log("note type text: {$note_type_text}");
			
			//save the image
			if (filesize($image_file)>0){		
				if(move_uploaded_file($_FILES['file']['tmp_name'], IMAGE_PATH . $image_url . ".jpg")) {
					// Move succeed.
					Util::log ("Image saved to ". IMAGE_PATH . $image_url . ".jpg");
					//
					$user_comment = $note_type_text . ": " . $details;
					self::addGpsInfo(IMAGE_PATH . $image_url . ".jpg",IMAGE_PATH . $image_url . ".jpg", null, $user_comment, null, $longitude, $latitude, $altitude, $recorded );
				} else {
				    // Move failed. Possible duplicate?
					Util::log ("WARNING: Image not saved ". IMAGE_PATH . $image_url . ".jpg");
				}
			}
			
			return self::getNote( $id );
		}
		else
			Util::log( __METHOD__ . "() ERROR failed to added flagged location for user {$user_id}, at ( {$latitude}, {$longitude} ), on {$recorded}, type {$note_type}, details {$details}" );

		return false;
	}
	
	public static function getNote( $id )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$trip = null;

		if ( ( $result = $db->query( "SELECT * FROM note WHERE id='" . $db->escape_string( $id ) . "'" ) ) &&
				( $result->num_rows ) )
		{
			$trip = $result->fetch_object( self::$class );
			$result->close();
		}

		return $trip;
	}
	
	public static function getNoteByUserStart( $user_id, $recorded )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$note = null;

		$query = "SELECT * FROM note WHERE user_id='" . $db->escape_string( $user_id ) . "' AND " .
				 "recorded='" . $db->escape_string( $recorded ) . "'";

		if ( ( $result = $db->query( $query ) ) &&
				( $result->num_rows ) )
		{
			$note = $result->fetch_object( self::$class );
			$result->close();
		}

		return $note;
	}
	
	public static function getNotesByUser ( $user_id )
	{
		$db = DatabaseConnectionFactory::getConnection();
		$notes = array();
		
		$query = "SELECT * FROM note WHERE user_id={$user_id}";

		$result = $db->query( $query );		
		while ( $note = $result->fetch_object( self::$class ) )
				$notes[] = $note;

		$result->close();
		 
		return $notes;

	}

	// functions for mucking EXIF data, pulled from gps example in pel project
	
	public static function convertDecimalToDMS($degree) {
		if ($degree > 180 || $degree < -180)
		return null;
		
		$degree = abs($degree);            // make sure number is positive
		                                 // (no distinction here for N/S
		                                 // or W/E).
		
		$seconds = $degree * 3600;         // Total number of seconds.
		
		$degrees = floor($degree);         // Number of whole degrees.
		$seconds -= $degrees * 3600;       // Subtract the number of seconds
		                                 // taken by the degrees.
		
		$minutes = floor($seconds / 60);   // Number of whole minutes.
		$seconds -= $minutes * 60;         // Subtract the number of seconds
		                                 // taken by the minutes.
		
		$seconds = round($seconds*100, 0); // Round seconds with a 1/100th
		                                 // second precision.
		
		return array(array($degrees, 1), array($minutes, 1), array($seconds, 100));
	}
	/**
	 * Add GPS information to an image basic metadata. Any old Exif data
	 * is discarded.
	 *
	 * @param string the input filename.
	 *
	 * @param string the output filename. An updated copy of the input
	 * image is saved here.
	 *
	 * @param string image description.
	 *
	 * @param string user comment.
	 *
	 * @param string camera model.
	 *
	 * @param float longitude expressed as a fractional number of degrees,
	 * e.g. 12.345?. Negative values denotes degrees west of Greenwich.
	 *
	 * @param float latitude expressed as for longitude. Negative values
	 * denote degrees south of equator.
	 *
	 * @param float the altitude, negative values express an altitude
	 * below sea level.
	 *
	 * @param string the date and time.
	 */
	public static function addGpsInfo($input, $output, $description, $comment, $model,
                    $longitude, $latitude, $altitude, $date_time) {
		/* Load the given image into a PelJpeg object */
		$jpeg = new PelJpeg($input);
		
		/* Create and add empty Exif data to the image (this throws away any
		* old Exif data in the image). */
		$exif = new PelExif();
		$jpeg->setExif($exif);
		
		/* Create and add TIFF data to the Exif data (Exif data is actually
		* stored in a TIFF format). */
		$tiff = new PelTiff();
		$exif->setTiff($tiff);
		
		/* Create first Image File Directory and associate it with the TIFF
		* data. */
		$ifd0 = new PelIfd(PelIfd::IFD0);
		$tiff->setIfd($ifd0);
		
		/* Create a sub-IFD for holding GPS information. GPS data must be
		* below the first IFD. */
		$gps_ifd = new PelIfd(PelIfd::GPS);
		$ifd0->addSubIfd($gps_ifd);
		
		/* The USER_COMMENT tag must be put in a Exif sub-IFD under the
		* first IFD. */
		$exif_ifd = new PelIfd(PelIfd::EXIF);
		$exif_ifd->addEntry(new PelEntryUserComment($comment));
		$ifd0->addSubIfd($exif_ifd);
		
		$inter_ifd = new PelIfd(PelIfd::INTEROPERABILITY);
		$ifd0->addSubIfd($inter_ifd);
		
		$ifd0->addEntry(new PelEntryAscii(PelTag::MODEL, $model));
		$ifd0->addEntry(new PelEntryAscii(PelTag::DATE_TIME, $date_time));
		$ifd0->addEntry(new PelEntryAscii(PelTag::IMAGE_DESCRIPTION, $description));
		
		$gps_ifd->addEntry(new PelEntryByte(PelTag::GPS_VERSION_ID, 2, 2, 0, 0));
		
		/* Use the convertDecimalToDMS function to convert the latitude from
		* something like 12.34? to 12? 20' 42" */
		list($hours, $minutes, $seconds) = self::convertDecimalToDMS($latitude);
		
		/* We interpret a negative latitude as being south. */
		$latitude_ref = ($latitude < 0) ? 'S' : 'N';
		
		$gps_ifd->addEntry(new PelEntryAscii(PelTag::GPS_LATITUDE_REF,
		                                   $latitude_ref));
		$gps_ifd->addEntry(new PelEntryRational(PelTag::GPS_LATITUDE,
		                                      $hours, $minutes, $seconds));
		
		/* The longitude works like the latitude. */
		list($hours, $minutes, $seconds) = self::convertDecimalToDMS($longitude);
		$longitude_ref = ($longitude < 0) ? 'W' : 'E';
		
		$gps_ifd->addEntry(new PelEntryAscii(PelTag::GPS_LONGITUDE_REF,
		                                   $longitude_ref));
		$gps_ifd->addEntry(new PelEntryRational(PelTag::GPS_LONGITUDE,
		                                      $hours, $minutes, $seconds));
		
		/* Add the altitude. The absolute value is stored here, the sign is
		* stored in the GPS_ALTITUDE_REF tag below. */
		$gps_ifd->addEntry(new PelEntryRational(PelTag::GPS_ALTITUDE,
		                                      array(abs($altitude), 1)));
		/* The reference is set to 1 (true) if the altitude is below sea
		* level, or 0 (false) otherwise. */
		$gps_ifd->addEntry(new PelEntryByte(PelTag::GPS_ALTITUDE_REF,
		                                  (int)($altitude < 0)));
		
		/* Finally we store the data in the output file. */
		file_put_contents($output, $jpeg->getBytes());
	}

}