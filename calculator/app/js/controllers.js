var calcControllers = angular.module('calcControllers', []);

calcControllers.controller('CalcController', ['$scope', '$routeParams', 'Calc', 
	function($scope, $routeParams, Calc) {
		var expression = decodeURIComponent($routeParams.expression);
		expression = expression.replace(/div/g,'/');
		$scope.expression = expression;

		while (expression.indexOf("{")!=-1){
			var subExp = expression.substring(expression.indexOf("{"), expression.indexOf("}")+1);
			var subExpOriginal = subExp;
			while (subExp.indexOf("[")!=-1){
				var subSubExp = subExp.substring(subExp.indexOf("["), subExp.indexOf("]")+1);
				var subSubExpOriginal = subSubExp;
				while (subSubExp.indexOf("(")!=-1){
					var subSubSubExp = subSubExp.substring(subSubExp.indexOf("("), subSubExp.indexOf(")")+1);
					subSubExp = subSubExp.replace(subSubSubExp, Calc(subSubSubExp));
				}
				subExp = subExp.replace(subSubExpOriginal, Calc(subSubExp));
			}
			while (subExp.indexOf("(")!=-1){
				var subSubExp = subExp.substring(subExp.indexOf("("), subExp.indexOf(")")+1);
				subExp = subExp.replace(subSubExp, Calc(subSubExp));
			}
			expression = expression.replace(subExpOriginal, Calc(subExp));
		}

		while (expression.indexOf("[")!=-1){
			var subExp = expression.substring(expression.indexOf("["), expression.indexOf("]")+1);
			var subExpOriginal = subExp;
			while (subExp.indexOf("(")!=-1){
				var subSubExp = subExp.substring(subExp.indexOf("("), subExp.indexOf(")")+1);
				subExp = subExp.replace(subSubExp, Calc(subSubExp));
			}
			expression = expression.replace(subExpOriginal, Calc(subExp));
		}

		while (expression.indexOf("(")!=-1){
			var subExp = expression.substring(expression.indexOf("("), expression.indexOf(")")+1);
			expression = expression.replace(subExp, Calc(subExp));
		}

		$scope.result = Calc(expression);
	}]);
