/*
* Level 2 - http://challenge.greplin.com/
* Found from http://tech.blog.cueup.com/regular-expressions-will-stab-you-in-the-back
*
* @author Larry Battle <http://bateru.com/news>
* @date 10-28-2012
* @example 
*/
/**
* Test cases
*/
test("test isPrime()", function(){
	var fn = isPrime;
	equal(fn(2), true);
	equal(fn(3), true);
	equal(fn(17), true);
	equal(fn(41), true);
	equal(fn(412), false);
	equal(fn(14), false);
});
test("test getFibonacciNum()", function(){
	var fn = getFibonacciNum;
	equal( fn(1), 1 );
	equal( fn(2), 1 );
	equal( fn(10), 55 );
	equal( fn(13), 233 );
});
test("test findNextSmallestPrimeFib()", function(){
	var fn = findNextSmallestPrimeFib;
	equal( fn(2), 3);
	equal( fn(8), 13);
	equal( fn(80), 89);
});
test("test getSumOfNums()", function(){
	var fn = getSumOfNums;
	equal(fn([1,2,3]), 6);
	equal(fn([1,2,-3]), 0);
});
test("test getPrimeFactors()", function(){
	var fn = getPrimeFactors;
	deepEqual(fn(6),[2,3]);
	deepEqual(fn(24),[2,2,2,3]);
});

/**
* GUI Event Functions
*/
var inputEl = document.getElementById("input");
inputEl.onkeyup = function(){
	var num = document.getElementById("input").value.match(/\d+/),
		part1 = findNextSmallestPrimeFib(num),
		part2 = getUniqueArr(getPrimeFactors(part1+1)),
		result = getSumOfNums(part2),
		output = "part1 = " +  JSON.stringify( part1, null, 2 );
		
	output += "\r\n part2 = " +  JSON.stringify( part2, null, 2 );
	
	document.getElementById("answer").value = result;
	document.getElementById("output").innerHTML = output;
};
inputEl.onkeyup();