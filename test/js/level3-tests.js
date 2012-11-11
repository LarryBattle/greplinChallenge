/*
* Level 3 for http://challenge.greplin.com/
* For the final task, you must find all subsets of an array
	where the largest number is the sum of the remaining numbers.
	For example, for an input of:

	(1, 2, 3, 4, 6)

	the subsets would be

	1 + 2 = 3
	1 + 3 = 4
	2 + 4 = 6
	1 + 2 + 3 = 6
	
	Here is the list of numbers you should run your code on.
	The password is the number of subsets.  In the above case the
	answer would be 4.

*
* @author Larry Battle <bateru.com/news>
* @date 10-28-2012
*/
var getSubSetCount = function(arr){
	var a = new SubsetFinder(arr);
	return a.getCount();
};
test("test count", function(){
	var fn = getSubSetCount;
	equal(fn([1,2]), 0);
	equal(fn([1,2,3]), 1);
	equal(fn([1,3,4,5]), 2);
	equal(fn([3, 4, 9, 14, 15, 19, 28, 37, 47, 50, 54, 56, 59, 61, 70, 73, 78, 81, 92, 95, 97, 99]), 179);
});
/**
* GUI Controls
*/
var inputEl = document.getElementById("input");
inputEl.onkeyup = function(){
	var nums = document.getElementById("input").value.match(/\d+/g).map(function(a){return +a;}),
		a = new SubsetFinder(nums),
		result = a.getCount(),
		output = JSON.stringify(a, null, 2);

	document.getElementById("answer").value = result;
	document.getElementById("output").value = output;
};
inputEl.onkeyup();


