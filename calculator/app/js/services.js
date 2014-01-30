var calcServices = angular.module('calcServices', []);

calcServices.factory('Calc', function() { 
	var getRidOfBrackets = function (expression) {
		var startingChar = expression.charAt(0);
		var endingChar = expression.charAt(expression.length-1);
		if (startingChar == '(' || startingChar == '[' || startingChar == '{') {
			expression = expression.substring(1);
		}
		if (endingChar == ')' || endingChar == ']' || endingChar == '}') {
			expression = expression.substring(0, expression.length - 1);
		}
		return expression;
	}

	var signIndex = function (expression, priority) {
		var indexM = expression.indexOf("*");
		var indexD = expression.indexOf("/");
		var indexA = expression.indexOf("+");
		var indexS = expression.indexOf("-");
		if (priority)
			return indexM != -1 ? indexM : indexD != -1 ? indexD : indexS != -1 ? indexS : indexA != -1 ? indexA : -1;
		var arr = [indexM, indexD, indexS, indexA];
		arr.sort();
		for (var i=0; i<arr.length; i++){
			if (arr[i]>-1)
				return arr[i]
		}		
		return -1;
	}

	var lastSignIndex = function (expression, priority) {
		var indexM = expression.lastIndexOf("*");
		var indexD = expression.lastIndexOf("/");
		var indexA = expression.lastIndexOf("+");
		var indexS = expression.lastIndexOf("-");
		if (priority)
			return indexM != -1 ? indexM : indexD != -1 ? indexD : indexS != -1 ? indexS : indexA != -1 ? indexA : -1;
		var arr = [indexM, indexD, indexS, indexA];
		arr.sort();		
		return arr[arr.length-1];
	}

	var calculateSimpleExp = function (a, b, o){
		if (o == "*"){
			return parseFloat(a) * parseFloat(b);
		}
		if (o == "/"){
			return parseFloat(a) / parseFloat(b);
		}
		if (o == "+"){
			return parseFloat(a) + parseFloat(b);
		}
		if (o == "-"){
			return parseFloat(a) - parseFloat(b);
		}
	}

	var calculate = function (expression) {
		while (signIndex(expression)!=-1 && signIndex(expression)!=0){
			expression = expression.replace('+-', '-');
			expression = expression.replace('++', '+');
			expression = expression.replace('--', '+');
			var addMinus = false;
			if (expression.indexOf('*-') != -1 || expression.indexOf('/-') != -1) {
				expression = expression.replace('*-', '*');
				expression = expression.replace('/-', '/');
				addMinus = true;
			}
			var currSignIndex = signIndex(expression, true);
			var nextSignIndex = signIndex(expression.substring(currSignIndex+1), false) != -1 ? signIndex(expression.substring(currSignIndex+1), false) + currSignIndex + 1 : expression.length;
			var prevSignIndex = lastSignIndex(expression.substring(0, currSignIndex-1), false) != -1 ? lastSignIndex(expression.substring(0, currSignIndex-1), false)+1 : 0;
			if (nextSignIndex == currSignIndex + 1){
				nextSignIndex = expression.length;
			}			
			var leftNum = expression.substring(prevSignIndex, currSignIndex);
			var rightNum = expression.substring(currSignIndex + 1, nextSignIndex);
			var sign = expression.substring(currSignIndex, currSignIndex+1);

			var startStr = "";
			var endStr = "";
			if (prevSignIndex != 0){
				startStr = expression.substring(0, prevSignIndex);
			}
			if (nextSignIndex != expression.length){
				endStr = expression.substring(nextSignIndex);
			}
			var resultCalc = calculateSimpleExp(leftNum, rightNum, sign);
			if (resultCalc < 0){
				expression = startStr + endStr + resultCalc.toString();
			} else {				
				if (addMinus){
					resultCalc = '-' + resultCalc;
					expression = startStr + endStr + resultCalc.toString();
				} else {
					expression = startStr + resultCalc.toString() + endStr;
				}
			}
			if (expression.charAt(0) == '+'){
				expression = expression.substring(1);
			}
		}
		return expression;
	}

	return function(expression) {
		expression = getRidOfBrackets(expression);
		return calculate(expression);
	}
})
