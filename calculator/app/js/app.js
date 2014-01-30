var calcApp = angular.module('calcApp', [
	'ngRoute',
	'calcControllers',
	'calcServices'
]);

calcApp.filter('encodeURIComponent', function() {
	return function (expression){	
		if (typeof expression != 'undefined'){
			var replacedDivision = expression.replace(/\//g,'div');
			return window.encodeURIComponent(replacedDivision);
		}
		return window.encodeURIComponent;
	}
});

calcApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/calc', {
			templateUrl: 'templates/calc.html'
		}).when('/calc/:expression', {
			templateUrl: 'templates/calc-result.html',
			controller: 'CalcController'
		}).otherwise({
			redirectTo: '/calc'
		});
	}]);
