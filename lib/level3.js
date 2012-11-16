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
SubsetFinder.prototype.go = function (i, val) {
    var c, key = "i=" + i + " : val=" + val;
    if (typeof this.hash[key] === "undefined") {
        if (i < 1) {
            this.hash[key] = (val === this.arr[0]) ? 1 : 0;
        } else {
            c = (this.arr[i] === val) ? 1 : 
                    (this.arr[i] < val) ? this.go(i - 1, val - this.arr[i]) : 0;
            c += this.go( i - 1, val);
            this.hash[key] = c;
        }
    }
    return this.hash[key];
};
SubsetFinder.prototype.getCount = function() {
    var ans = 0, i, len = this.arr.length;
    for (i = 1; i < len; i++) {
        ans += this.go(i - 1, this.arr[i]);
    }
    return ans;
};