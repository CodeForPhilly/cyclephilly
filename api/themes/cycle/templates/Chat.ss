<!DOCTYPE html>
<html ng-app="myapp">
  <head>
    <% base_tag %>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    
    <script src='https://cdn.firebase.com/v0/firebase.js'></script>
	<script src='https://cdn.firebase.com/libs/angularfire/0.6.0/angularfire.min.js'></script>
	<link rel="stylesheet" type="text/css" href="mysite/css/chat.css">
  <body ng-controller="MyController">
	<div id="messagesDiv">
  <div ng-repeat="msg in messages"><em>{{msg.from}}</em> {{msg.body}}</div>
</div>
<input type="text" ng-model="msg" ng-keydown="addMessage(\$event)" placeholder="Message...">
    <script>
    var app = angular.module("myapp", ["firebase"]);
    	function MyController(\$scope, \$firebase) {
    	var ref = new Firebase("https://prompt.firebaseio.com/");
    	 \$scope.messages = \$firebase(ref);
        \$scope.addMessage = function(e) {
          if (e.keyCode != 13) return;
          \$scope.messages.\$add({from: \$scope.name, body: \$scope.msg});
          \$scope.msg = "";
        };

	}
	</script>
  </body>
</html>