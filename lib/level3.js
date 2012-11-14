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
 * @date 11-07-2012
 */

var SubsetFinder = function(arr){
	this.arr = arr;
	this.hash = {};
};
SubsetFinder.prototype.go = function ( p, target) {
    var str = p + ":" + target;
    if (typeof this.hash[str] === "undefined") {
        if (p < 1) {
			return (target === this.arr[0]) ? 1 : 0;
        } else {
            var c = (this.arr[p] === target) ? 1 : 0;
            if ( c === 0 && this.arr[p] < target) {
                c = this.go( p - 1, target - this.arr[p]);
            }
            c += this.go( p - 1, target);
            this.hash[str] = c;
        }
    }
    return this.hash[str];
};
SubsetFinder.prototype.getCount = function() {
    var ans = 0, p, len = this.arr.length;
    for (p = 1; p < len; p++) {
        ans += this.go(p - 1, this.arr[p]);
    }
    return ans;
};