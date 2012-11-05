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

test("test getObjectFromArray()", function () {
	var fn = getObjectFromArray;
	deepEqual(fn([1, 2, 3]), {
		1 : 0,
		2 : 1,
		3 : 2
	});
});
test("test NumModule constructor", function(){
	var fn = function(a,b){
		return new NumModule(a,b).toString();
	};
	equal( fn(3), "NumModule(value=3)" );
	equal( fn(3, [[1,2]]), "NumModule(value=3, subset((1,2)))" );
	equal( fn(5, [[1,4],[2,3]]), "NumModule(value=5, subset((1,4),(2,3)))" );
});
test("test NumModule.prototype.addSubset()", function(){
	var fn = function(a,b,c){
		return new NumModule(a,b).addSubset(c).toString();
	};
	equal( fn(5, [[1,4],[2,3]]), "NumModule(value=5, subset((1,4),(2,3)))" );
	equal( fn(5, [[1,4],[2,3]], [2,3]), "NumModule(value=5, subset((1,4),(2,3)))" );
	equal( fn(7, [[3,4],[1,6]], [2,5]), "NumModule(value=7, subset((3,4),(1,6),(2,5)))" );
});
test("test Collection constructor", function(){
	var fn = function(a,b){
		return new Collection(a).addNumber(b).toString();
	};
	equal(fn(0), "Collection(maxValue: 0, length:0)");
	equal(fn(3), "Collection(maxValue: 3, length:0)");
});
test("test Collection.prototype.getTotalSubsetCount()", function(){
	var a = new Collection(3, [1,2,3]);
	equal( a.getTotalSubsetCount(), 0);
	a.getNumber(3).addSubset([1,2]);
	equal( a.getTotalSubsetCount(), 1);
});
test("test Collection.prototype.getNumber()", function(){
	var fn = function(a,b,c){
		return new Collection(a).addNumber(b).getNumber(c);
	};
	equal(fn(3,2,2).toString(), "NumModule(value=2)");
	equal(fn(3,2,10), undefined);
});
test("test SubsetFinder constructor", function(){
	var a = new SubsetFinder([1,2,3]);
	
	equal( a.toString(), "SubsetFinder(numSet: [1,2,3], queue: [1,2,3], collection: [length=3])" );
	
	equal( a.collection.toString(), 
		"Collection(maxValue: 3, length:3, nums: [NumModule(value=1); NumModule(value=2); NumModule(value=3)])");
});

test("test SubsetFinder.prototype.addValueToNumSet()", function(){
	var a = new SubsetFinder([1,2,3]);
	a.addValueToNumSet(2,[2]);
	equal(a.toString(), "SubsetFinder(numSet: [1,2,3], queue: [1,2,3], collection: [length=3])");
	
	a = new SubsetFinder([1,2,3]);
	a.addValueToNumSet(1,[1]);
	equal(a.toString(), "SubsetFinder(numSet: [1,2,3], queue: [1,2,3], collection: [length=3])");
});
/**
* GUI Controls
*/
var inputEl = document.getElementById("input");
inputEl.onkeyup = function(){
	var nums = document.getElementById("input").value.match(/\d+/g),
		a = new SubsetFinder(nums),
		result = a.solve().getCollectionSubsetCount(),
		output = a.toString();
		
	output += "\r\n############\r\n a.collection.toString() = \r\n" +  a.collection.toString();
	
	document.getElementById("answer").value = result;
	document.getElementById("output").innerHTML = output;
};
inputEl.onkeyup();