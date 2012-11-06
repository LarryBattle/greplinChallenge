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
/*
* Global helpers
*/
Array.prototype.indexOf = Array.prototype.indexOf || function (elt) {
    var len = this.length >>> 0,
		from = Number(arguments[1]) || 0;
		
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0)
        from += len;
    
    for (; from < len; from++) {
        if (from in this && this[from] === elt){
            return from;
		}
    }
    return -1;
};
var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};
var insertionSort = function (arr) {
    arr = arr.concat();
    var len = arr.length,
    i = -1,
    j,
    tmp;
    while (len--) {
        tmp = arr[++i];
        j = i;
        while (j-- && +arr[j] > +tmp) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = tmp;
    }
    return arr;
};
/*
* Class NumModule
*/
var NumModule = function (value, subsets, max) {
    this.value = +value;
    this.subsets = subsets || [];
    this.compareLimit = Math.max(0, max - this.value);
};
NumModule.prototype = {
    constructor : NumModule,
    addSubset : function (subset) {
        if (!subset) {
            return this;
        }
        subset = insertionSort(subset.concat());
        if (!this.hasSubset(subset)) {
            this.subsets.push(subset);
        }
        return this;
    },
    hasSubset : function (subset, doSort) {
        if (!subset) {
            return false;
        }
        subset = doSort ? insertionSort(subset) : subset;
        var found = false,
        subsetStr = subset.join(","),
        len = this.subsets.length,
        i;
        for (i = 0; i < len && !found; i++) {
            found = this.subsets[i].join(",") === subsetStr;
        }
        return found;
    },
    toString : function () {
        var str = "NumModule(value=" + this.value;
        if (this.subsets.length) {
            str += ", subset((" + this.subsets[0].join(",") + ")";
            for (var i = 1, len = this.subsets.length; i < len; i++) {
                str += ",(" + this.subsets[i].join(",") + ")";
            }
            str += ")";
        }
        str += ")";
        return str;
    }
};
/*
* Class Collection
*/
var Collection = function (maxValue, nums) {
    this.nums = [];
    this.maxValue = +maxValue;
    this.hash = {};
    if (nums) {
        this.addRawNumbers(nums);
    }
};
Collection.prototype = {
    constructor : Collection,
    addNumber : function (val, subset) {
        if (typeof val !== "undefined" && typeof this.hash[val] === "undefined") {
            var i = this.nums.length;
            this.hash[val] = i;
            this.nums.push(new NumModule(val, subset, this.maxValue));
        }
        return this;
    },
    addRawNumbers : function (arr) {
        if (isArray(arr)) {
            for (var i = 0, len = arr.length; i < len; i++) {
                this.addNumber(+arr[i]);
            }
        }
        return this;
    },
    getTotalSubsetCount : function () {
        var count = 0;
        for (var i = 0, len = this.nums.length; i < len; i++) {
            count += this.nums[i].subsets.length;
        }
        return count;
    },
    getTotalSubsetCountFromNumSet : function (nums) {
        var count = 0;
        for (var i = 0, len = nums.length; i < len; i++) {
            count += this.getNumber(nums[i]).subsets.length;
        }
        return count;
    },
	getNumbers : function (nums) {
        var arr = [];
        for (var i = 0, len = nums.length; i < len; i++) {
            arr.push( this.getNumber(nums[i]) );
        }
        return arr;
    },
    getNumber : function (val) {
        return this.nums[this.hash[val]];
    },
    size : function () {
        return this.nums.length;
    },
    toString : function () {
        var str = "Collection(maxValue: " + this.maxValue + ", length:" + this.nums.length;
        if (this.nums.length) {
            str += ", nums: [" + this.nums.join("; ") + "]";
        }
        str += ")";
        return str;
    }
};
/*
* Class SubsetFinder
*/
var SubsetFinder = function (nums) {
    if (!isArray(nums)) {
        throw new Error("Must pass an array of numbers to SubsetFinder");
    }
    nums = insertionSort(nums);
    this.numSet = nums.concat();
    this.queue = [];
    this.collection = new Collection(nums[nums.length - 1], nums.concat());
};
SubsetFinder.prototype = {
    constructor : SubsetFinder,
    solve : function () {
        var obj;
        this.queue = this.numSet.concat();
        this.addSelfAsSubsetForNumSet();
        for (var i = 0; i < this.queue.length; i++) {
            obj = this.collection.getNumber(this.queue[i]);
            for (var j = 0, lenj = obj.subsets.length; j < lenj; j++) {
                this.addNumberToEachNumSet(obj.value, obj.compareLimit, obj.subsets[j]);
            }
        }
        return this;
    },
    addSelfAsSubsetForNumSet : function () {
        for (var i = 0, len = this.queue.length; i < len; i++) {
            this.addSubsetToValue(this.numSet[i], [this.numSet[i]]);
        }
    },
    getCollectionSubsetCount : function () {
        return this.collection.getTotalSubsetCountFromNumSet(this.numSet) - this.numSet.length;
    },
    addNewNumber : function (val, subset) {
        this.collection.addNumber(val, subset);
        return this;
    },
    addNumberToEachNumSet : function (val, maxCompare, subset) {
        var sum,
        iNum;
        
        for (var i = 0, len = this.numSet.length; i < len; i++) {
            iNum = Number(this.numSet[i]);
            if (maxCompare < iNum) {
                break;
            }
            if (val === iNum || -1 < subset.indexOf(iNum)) {
                continue;
            }
            sum = val + iNum;
            this.addNumberIfUndefined(sum).addSubsetToValue(sum, subset.concat(iNum));
        }
        return this;
    },
    addNumberIfUndefined : function (val) {
        if (!this.collection.getNumber(val)) {
            this.collection.addNumber(val);
            this.queue.push(val);
        }
        return this;
    },
    addSubsetToValue : function (val, subset) {
        this.collection.getNumber(val).addSubset(subset);
        return this;
    },
	getNumSetNumbers : function(){
		return this.collection.getNumbers( this.numSet );
	},
    toString : function () {
        var str = "SubsetFinder(";
        str += "numSet: [" + this.numSet.join(",") + "]";
        str += ", queue: [" + this.queue.join(",") + "]";
        str += ", collection: [length=" + this.collection.size() + "]";
        str += ")";
        return str;
    }
};
