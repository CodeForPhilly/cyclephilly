<?php

define('SS_ENVIRONMENT_TYPE', 'dev');

/*$host = (getenv('OPENSHIFT_MYSQL_DB_HOST')) ? getenv('OPENSHIFT_MYSQL_DB_HOST') : putenv('OPENSHIFT_MYSQL_DB_HOST=173.194.251.23') ;
$port = (getenv('OPENSHIFT_MYSQL_DB_PORT')) ? getenv('OPENSHIFT_MYSQL_DB_PORT') : putenv('OPENSHIFT_MYSQL_DB_PORT=3306');
$user = (getenv('OPENSHIFT_MYSQL_DB_USERNAME')) ? getenv('OPENSHIFT_MYSQL_DB_USERNAME') : putenv('OPENSHIFT_MYSQL_DB_USERNAME=root') ;
$pass = (getenv('OPENSHIFT_MYSQL_DB_PASSWORD')) ? getenv('OPENSHIFT_MYSQL_DB_PASSWORD') : putenv('OPENSHIFT_MYSQL_DB_PASSWORD=Ph1lly123') ;


define('SS_DATABASE_SERVER', getenv('OPENSHIFT_MYSQL_DB_HOST'));
define('SS_DATABASE_PORT', getenv('OPENSHIFT_MYSQL_DB_PORT'));
define("SS_DATABASE_USERNAME", getenv('OPENSHIFT_MYSQL_DB_USERNAME'));
define('SS_DATABASE_PASSWORD', getenv('OPENSHIFT_MYSQL_DB_PASSWORD'));*/

define('SS_DEFAULT_ADMIN_USERNAME', '');
define('SS_DEFAULT_ADMIN_PASSWORD', '');

$host = "cycle.c0pz9rduf4ic.us-east-1.rds.amazonaws.com";//173.194.251.23" ;
$port = "3306";
$user = "cycleUser" ;
$pass = "";

define('SS_DATABASE_SERVER', $host);
define('SS_DATABASE_PORT', $port);
define("SS_DATABASE_USERNAME", $user);
define('SS_DATABASE_PASSWORD', $pass);

global $_FILE_TO_URL_MAPPING;
$_FILE_TO_URL_MAPPING[getenv('OPENSHIFT_REPO_DIR').'php'] = 'http://www.cyclephilly.org/';
//$_FILE_TO_URL_MAPPING['/home/lloyd/glass/parcels/php'] = 'http://mytracks.phillyopen.org';
// $_FILE_TO_URL_MAPPING['/var/www/html/trips/php'] = 'localhost';
//$_FILE_TO_URL_MAPPING['/Users/toby/melle/cycle_/philly/php'] = 'http://dev.cyclephilly.org/';
//$_FILE_TO_URL_MAPPING['/home/toby/melle/us/cycle/php'] = 'http://cycle-philly.us.melle.io/';

