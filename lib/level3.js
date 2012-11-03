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
var getObjectFromArray = function (arr) {
	var obj = {};
	for (var i = 0, len = arr.length; i < len; i++) {
		obj[arr[i]] = i;
	}
	return obj;
};
var getCummulativeSumArray = function (nums) {
	if (typeof nums !== "object") {
		return [];
	}
	var sumArr = [+nums[0]];
	for (var i = 1, len = nums.length; i < len; i++) {
		sumArr[i] = sumArr[i - 1] + nums[i];
	}
	return sumArr;
};
var getSumArrThatFormValue = function (val, nums, cSumObj) {
	if (typeof nums !== "object" || isNaN(val) || !cSumObj) {
		return [];
	}
	var sums = [],
	i = nums.length,
	j,
	x,
	arr;
	while (i-- && val <= cSumObj[i]) {
		x = val - nums[i];
		arr = [+nums[i]];
		j = i;
		while (-1 < j-- && x <= cSumObj[j]) {
			if (nums[j] <= x) {
				x -= +nums[j];
				arr.push(+nums[j]);
			}
		}
		if (x === 0 && 1 < arr.length) {
			sums.push(arr);
		}
	}
	return sums;
};
var getAllSumArrThatFormValues = function (nums) {
	if (typeof nums !== "object" || nums.length < 2) {
		return [];
	}
	var values = nums.concat().sort(function (a, b) {
			return +a - +b;
		});
	var obj = {
		length : 0
	},
	i = values.length,
	val,
	cSumObj = getCummulativeSumArray(values);
	while (i--) {
		val = +values.pop();
		obj[val] = getSumArrThatFormValue(val, values, cSumObj);
		if( obj[val].length ){
			obj.length += obj[val].length;
		}else{
			delete obj[val];
		}
	}
	return obj;
};
