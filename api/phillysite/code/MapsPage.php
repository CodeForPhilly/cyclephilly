<?php
class MapsPage extends Page {

	private static $db = array(
	);

	/*function canCreate($Member = null){
	    if(!Permission::check("EDIT_SITE")) Security::permissionFailure();
	}*/

	private static $has_many = array(
    );

    public function getCMSFields() {
		$fields = parent::getCMSFields();
		/*$fields->removeFieldFromTab("Root.Main","Content");

		$config = new GridFieldConfig_RelationEditor();
		$config->addComponents(new GridFieldExportButton('before'));
		$callouts = GridField::create('Callouts',false, $this->Callouts(), $config);
		if(Permission::check("ADMIN")){
			$fields->addFieldToTab('Root.Callouts', $callouts);
		}

		$config2 = new GridFieldConfig_RelationEditor();
		$config2->addComponents(new GridFieldExportButton('before'));
		$config2->addComponent(new GridFieldSortableRows('SortOrder'));
		$toolbox = GridField::create('ToolboxLinks',false, $this->ToolboxLinks()->sort('SortOrder'), $config2);
		if(Permission::check("ADMIN")){
			$fields->addFieldToTab('Root.Toolbox', $toolbox);
		}*/
		
		return $fields;
    }

}
class MapsPage_Controller extends Page_Controller {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
		'live','torque','timelapse','all'
	);

	public function live($request){
		//var_dump($request->param('ID'));
		// return $this->renderWith('Live');
		
	}

	public function init() {
		parent::init();

		// Security Check. Comment to disable
		// if(!Permission::check("VIEW_SITE")) Security::permissionFailure();
		//Requirements::set_write_js_to_body(false);

		
	}

	public function index($arguments){
		Requirements::combine_files(
	    'maps.js',
	    array(
	        'themes/cycle/js/underscore.js',
	        'themes/cycle/js/v/bootstrap.min.js',
	        'themes/cycle/js/L.Control.Sidebar.js',
	        'themes/cycle/js/weather_widget.js',
	        'themes/cycle/js/maps_init.js',
	        'themes/cycle/js/analytics.js'
	    )
		);
		$this->redirect("/#imap");
	}

	public function all($arguments){
		Requirements::combine_files(
	    'allmaps.js',
	    array(
	        'themes/cycle/js/underscore.js',
	        'themes/cycle/js/v/bootstrap.min.js',
	        'themes/cycle/js/L.Control.Sidebar.js',
	        'themes/cycle/js/weather_widget.js',
	        'themes/cycle/js/maps_init.js',
	        'themes/cycle/js/analytics.js'
	    )
		);
		return $this->renderWith('AllMapsPage');
	}

	public function timelapse($arguments){
		Requirements::combine_files(
	    'torque2.js',
	    array(
	        // 'themes/cycle/js/leaflet.js',
	        // 'themes/cycle/js/leaflet.carto.js',
	        // 'themes/cycle/js/v/underscore.js',
	        // 'themes/cycle/js/carto.js',
	        // 'themes/cycle/js/weather_widget.js',
	        // 'themes/cycle/js/torque.js',
	        // 'themes/cycle/js/timelapse.js',
	        'themes/cycle/js/analytics.js'
	    )
		);
		return $this->renderWith('TorquePage');	
	}

	


}
