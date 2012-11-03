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

test("test getCummulativeSumArray()", function () {
	var fn = getCummulativeSumArray;
	deepEqual(fn([]), [NaN]);
	deepEqual(fn([1, 2, 3]), [1, 3, 6]);
});
test("test getObjectFromArray()", function () {
	var fn = getObjectFromArray;
	deepEqual(fn([1, 2, 3]), {
		1 : 0,
		2 : 1,
		3 : 2
	});
});
test("test getSumArrThatFormValue()", function () {
	var fn = function (val, nums) {
		var cSums = getCummulativeSumArray(nums);
		return getSumArrThatFormValue(val, nums, cSums);
	};
	deepEqual(fn(40, [1, 2, 3]), []);
	deepEqual(fn(4, [1, 2, 3]), [[3, 1]]);
	deepEqual(fn(6, [1, 2, 3, 4, 5]), [[5, 1], [4, 2], [3, 2, 1]]);
});
test("test getAllSumArrThatFormValues()", function () {
	var fn = getAllSumArrThatFormValues;
	deepEqual(fn([1, 2, 3, 40]), {
		3 : [[2, 1]],
		"length": 1
	});
	deepEqual(fn([1, 2, 3, 4]), {
		4 : [[3, 1]],
		3 : [[2, 1]],
		"length":2
	});
	deepEqual(fn([1, 2, 3, 4, 5, 6]), {
		6 : [
			[5, 1],
			[4, 2],
			[3, 2, 1]
		],
		5 : [
			[4, 1],
			[3, 2]
		],
		4 : [
			[3, 1]
		],
		3 : [
			[2, 1]
		],
		"length":7
	});
});
var inputEl = document.getElementById("input");
inputEl.onkeyup = function(){
	var nums = document.getElementById("input").value.match(/\d+/g),
		result = getAllSumArrThatFormValues(nums),
		output = "Level 3 password = '" + result.length + "'";
	output += "\r\n" +  JSON.stringify( result, null, 2 );
	
	document.getElementById("output").innerHTML = output;
};
inputEl.onkeyup();