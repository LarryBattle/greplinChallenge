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
* Test cases
*/
test("test sameFrontAndBack() valid match", function () {
	var fn = sameFrontAndBack;
	equal(fn("x"), true);
	equal(fn("xx"), true);
	equal(fn("xxx"), true);
	equal(fn("axa"), true);
	equal(fn("aaaxaaa"), true);
	equal(fn("abcxcba"), true);
});

test("test sameFrontAndBack() invalid match", function () {
	var fn = sameFrontAndBack;
	equal(fn(""), false);
	equal(fn("xxe"), false);
	equal(fn("xx x"), false);
	equal(fn("axxsxa"), false);
	equal(fn("ax"), false);
	equal(fn("aaxaaa"), false);
	equal(fn("bcxcba"), false);
});
test("test getSubString()", function () {
	var fn = getSubString;
	equal(fn("abcbc", 0), "");
	equal(fn("abcabc", 1), "bcab");
	equal(fn("abcabc", 0), "abca");
});
test( "test compare", function(){
	var fn = getMatches;
	equal(fn("abcd", 0), "");
	equal(fn("aba", 0), "aba");
	equal(fn("abaa", 0), "aba");
	equal(fn("abaasdfsdflksjdflskfjslfkjflsasdflksjaafadsa", 0), "aba");
});
test( "test findAllStringsMatchBackAndForward()", function(){
	var fn = findAllStringsMatchBackAndForward;
	deepEqual(fn("abbcccdddd"), ["bb","ccc","dddd"]);
	deepEqual(fn("I like racecars that go fast"), ["racecar"]);
});

/**
* GUI Event - Functions
*/
var inputEl = document.getElementById("input");
inputEl.onkeyup = function(){
	var str = document.getElementById("input").value.trim(),
		result = findAllStringsMatchBackAndForward(str),
		output = "Level 1 password = '" + result[result.length - 1] +"'";
		
	output += "\r\n" +  JSON.stringify( result, null, 2 );
	
	document.getElementById("output").innerHTML = output;
};
inputEl.onkeyup();