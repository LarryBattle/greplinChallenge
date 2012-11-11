var SubsetFinder = function(arr){
	this.arr = arr;
	this.hash = {};
};
SubsetFinder.prototype.go = function ( p, target) {
    var str = p + ":" + target;
    if (typeof this.hash[str] === "undefined") {
        if (p < 1) {
			return (target === this.arr[0]) ? 1 : 0;
            //this.hash[str] = (target === this.arr[0]) ? 1 : 0;
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