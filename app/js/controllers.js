'use strict';

/* Controllers */
	var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'ngResource']);
	
	phonecatApp.config(['$routeProvider', function($routeProvide){
		$routeProvide
			.when('/', {
				templateUrl: 'template/home.html',
				controller: 'PhoneListCtrl'
			})
			.when('/about', {
				templateUrl: 'template/about.html',
				controller: 'AboutCtrl'
			})
			.when('/contact', {
				templateUrl: 'template/contact.html',
				controller: 'ContactCtrl'
			})
			.when('/phones/:phoneId', {
				templateUrl: 'template/phone-detail.html',
				controller: 'PhoneDetailCtrl'
			})				
			.otherwise({
				redirectTo: 'template/home.html'
			});
	}]);
	
	//Factory
	phonecatApp.factory('Phone', ['$resource', function($resource){
		return $resource('phones/:phoneId.:format', {
			phoneId: 'phones',
			format: 'json',
			apiKey: 'someKeyThis'
		});
	}]);
	
	phonecatApp.filter('checkmark', function(){
		return function(input){
			 return input ? '\u2713' : '\u2718';
		}
	});
	
	phonecatApp.controller('PhoneListCtrl',['$scope', '$http', '$location', 'Phone', function($scope, $http, $location, Phone){
		
		/* $http.get('phones/phones.json').success(function(data, status,headers, config){
			$scope.phones = data;
		}); */	

			$scope.phones = Phone.query();
			$scope.setActive = function (evt) {
				angular.element(evt.target).addClass('active');
			}
		}
	]);

//About Controller
	phonecatApp.controller('AboutCtrl',['$scope', '$http', '$location', function($scope, $http, $location){

	}]);
	
//Contact Controller
	phonecatApp.controller('ContactCtrl',['$scope', '$http', '$location', function($scope, $http, $location){

	}]);	
//Phone Detail Controller
	phonecatApp.controller('PhoneDetailCtrl',['$scope', '$http', '$location', '$routeParams', 'Phone', function($scope, $http, $location, $routeParams, Phone){
		$scope.phoneId = $routeParams.phoneId;
	/* 	var url = 'phones/'+$routeParams.phoneId+'.json'; */
		
		Phone.get({phoneId: $routeParams.phoneId}, function(data){
			$scope.phone = data;
			$scope.mainImageUrl = data.images[0];
			
			$scope.setImage = function(imageUrl) {
				$scope.mainImageUrl = imageUrl;
			}
		});
		
/* 		$http.get(url).success(function(data){
			$scope.phone = data;
			$scope.mainImageUrl = data.images[0];
			

		}); */
	}]);






		/* 	$http.get(url,[config]);
			$http.post(url, data, [config]);
			$http.put(url, data, [config]);
			$http.patch(url, data, [config]);
			$http.delete(url, [config]);
			$http.head(url, [config]);
			$http.jsonp(url, [config]); 
		
		//filters
		var date = new Date();	
		$scope.today = date;
		$scope.doneAndFilter = function(phoneItem){
			return phoneItem.name && phoneItem.priority> 1 && phoneItem.status === true;
		}  
		
		$scope.sortField = 'undefined';	
		$scope.reverse = false;
		
		$scope.sort = function(filedName){
			if($scope.sortField === filedName){
				$scope.reverse = !$scope.revers;
			}else{
				$scope.sortField = filedName;
				$scope.revers = false;
			}
		};
		
		$scope.isSortUp = function(filedName){
			return $scope.sortField === filedName && !$scope.revers;
		};
		
		$scope.isSortDown = function(filedName){
			return $scope.sortField === filedName && $scope.revers;
		};*/	
	
	