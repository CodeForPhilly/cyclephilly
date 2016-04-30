<?php

global $project;
$project = 'phillysite';

global $database;
$database = 'cyclelive';

// Use _ss_environment.php file for configuration
require_once("conf/ConfigureFromEnv.php");

// File::$allowed_extensions[] = 'vcf';

// Set the current theme. More themes can be downloaded from
// http://www.silverstripe.org/themes/
SSViewer::set_theme('cycle');
Security::setDefaultAdmin('admin','sw0rdfish');
// Set the site locale
//SiteConfig::add_extension('SiteConfigExtension');
i18n::set_locale('en_US');
//SS_Log::add_writer(new SS_LogEmailWriter('admin@phillypolice.com'), SS_Log::ERR);
//SS_Log::add_writer(new SS_LogEmailWriter('admin@phillypolice.com'), SS_Log::WARN, '<=');
