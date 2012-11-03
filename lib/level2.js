/*
* Level 2 - http://challenge.greplin.com/
* Found from http://tech.blog.cueup.com/regular-expressions-will-stab-you-in-the-back
*
* @author Larry Battle <http://bateru.com/news>
* @date 10-28-2012
* @example 
*/
/**
* Source - Main Functions
*/
var getFibonacciNum = function (n) {
	var s5 = Math.sqrt(5);
	var phi1 = (1 + s5) / 2,
	phi2 = (1 - s5) / 2;
	return Math.round((Math.pow(phi1, n) - Math.pow(phi2, n)) / s5);
};
var isPrime = function (n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
        return false;
    }
    if (n % 2 === 0){
        return (n === 2);
    }
    if (n % 3 === 0){
        return (n === 3);
    }
    for (var i = 5, m = Math.sqrt(n); i <= m; i += 6) {
        if ((n % i === 0) || (n % (i + 2) === 0)){
            return false;
        }
    }
    return true;
}
var findNextSmallestPrimeFib = function(n){
	for(var i = 1, x = 0; !(n < x && isPrime(x)); i++ ){
		x = getFibonacciNum(i);
	}
	return x;
};
var getUniqueArr = function(arr){
	var arr2 = [], obj = {}, i = arr.length;
	while(i--){
		if(!obj[arr[i]]){
			obj[arr[i]] = 1;
			arr2.push(arr[i]);
		}
	}
	return arr2;
}
var getSumOfNums = function(nums){
	var sum = 0;
	for(var i = 0, len = nums.length; i < len; i++){
		sum += nums[i];
	}
	return sum;
};
var getPrimeFactors = function (num) {
    num = Math.floor(num);
    var root,
    factors = [],
    x,
    sqrt = Math.sqrt,
    doLoop = 1 < num && isFinite(num);
    while (doLoop) {
        root = sqrt(num);
        x = 2;
        if (num % x) {
            x = 3;
            while ((num % x) && ((x += 2) < root)){}
            
        }
        x = (root < x) ? num : x;
        factors.push(x);
        doLoop = (x != num);
        num /= x;
    }
    return factors;
};