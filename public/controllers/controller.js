var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

	//1.gets data and then refreshes div	
var refresh = function() {
	$http.get('/contactlist').success(function(response){
		console.log("I got the data request");
		$scope.contactlist = response;	
		//clears the input boxes
		$scope.contact = "";
	})
};//end of refresh

	refresh();
	
	//2. adds data
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};//end of addContact function
	
	//3.removes data
	$scope.remove = function(id) {
		  console.log(id);
		  $http.delete('/contactlist/' + id).success(function(response) {
		  refresh();
	  });
	};//end of remove function
	
	//4.edit data
	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response){
			//this puts the edited line in the input box on the index.html page
			$scope.contact = response;
		});
	};//end of edit function
	
	//5.Update the edit info
	$scope.update = function() {
	  console.log($scope.contact._id);
	  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
	  	refresh();
  })
};

	//6. Clear the input screens
	$scope.deselect = function(){
		$scope.contact = "";
	};

}]);//end of myApp.controller