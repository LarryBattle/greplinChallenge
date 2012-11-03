/*
* Level 1 - http://challenge.greplin.com/
* The password is the longest substring that is the same in reverse.
* Found from http://tech.blog.cueup.com/regular-expressions-will-stab-you-in-the-back
*
* @author Larry Battle <http://bateru.com/news>
* @date 10-28-2012
* @example As an example, if the input was "I like racecars that go fast" the password would be "racecar".
*/

/**
* Source - Main Functions
*/
var sameFrontAndBack = function (str) {
	return str && (str === str.split("").reverse().join(""));
};
var getSubString = function (str, i) {
	var result = str.substring(i, str.lastIndexOf(str.charAt(i)) + 1);
	return (result && 1 < result.length) ? result : "";
};
var getMatches = function (str, i) {
	var match = "";
	var currStr = getSubString(str, i);
	while (currStr) {
		if (sameFrontAndBack(currStr)) {
			match = currStr;
			break;
		}
		currStr = getSubString(currStr.substring(0,currStr.length-1), i);
	}
	return match;
};
var findAllStringsMatchBackAndForward = function(str){
	var result, results = [];
	for(var i = 0, len = str.length; i < len; i++){
		result = getMatches(str, i);
		if(result){
			results.push(result);
			i += result.length -1;
		}
	}
	if(results.length){
		results = results.sort(function(a,b){
			return a.length - b.length;
		});
	}
	return results;
};
