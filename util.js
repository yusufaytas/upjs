/*
 * util, upjs extension
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.util = (function(){
	function u(){};
	
	// @begin - start point of array	
	// @end - stop point of array
	// returns an array by putting ints between @begin and @end
	u.range = function(begin,end){
		var nums = [];
		for (var num = begin; num < end; num++)
			nums.push(num);
		return nums;
	};
	
	// @arr - javascript array
	// returns a new array that has all elements unique
	u.uniquify = function(arr){
		var r = new Array();
	    loop:for(var i = 0, n = arr.length; i < n; i++){
	        for(var x = 0, y = r.length; x < y; x++)
	            if(r[x]==arr[i])
	                continue loop;
	        r[r.length] = arr[i];
	    }
	    return r;
	};
	
	// @obj - javascript object
	// returns a copy of the @obj
	u.copy = function(obj){
		if (null == obj || "object" != typeof obj)return obj;
	    var c = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) c[attr] = obj[attr];
	    }
	    return c;
	};
	
	// @arr - javascript array
	// @item - item in @arr
	// returns the index of @item in @arr
	u.indexOf = function(arr,item){
		for(var i=0;i<arr.length;i++)
			if(arr[i]==item)
				return i;
		return -1;
	};
	
	// @arr - javascript array
	// @item - item in @arr
	// pushes @item into @arr by cheking uniqueness
	u.pushIfNotExist = function(arr,item){
		if(u.indexOf(arr,item)==-1)
			arr.push(item);
	};
	
	// @arr - JavaScript array
	// Returns a shuffled copy of the @array
	u.shuffle = function(arr){
		for(var i=0;i<arr.length;i++){
			var i = (Math.random()*arr.length)|0;
			var j = (Math.random()*arr.length)|0;
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	};
	// @arr1,@arr2,...@arrn - Javascript Array
	// Returns an union of the given arrays
	u.union = function(){
		var arr = [];
		for(var i=0;i<arguments.length;i++)
			arr = arr.concat(arguments[i]);
		return u.uniquify(arr);
	};
	// @arr1,@arr2,...@arrn - Javascript Array
	// Returns intersection of the given arrays
	u.intersect = function(){
		var arr = inter = [];
		for(var i=0;i<arguments.length;i++)
			arr = arr.concat(arguments[i]);
		arr = u.uniquify(arr);
		var count = [];
		for(var i=0;i<arr.length;i++)
			count.push(0);
		for(var i=0;i<arr.length;i++){
			for(var j=0;j<arguments.length;j++)
				if(u.indexOf(arguments[j],arr[i])!=-1)
					count[i]++;
		}
		for(var i=0;i<arr.length;i++)
			if(count[i]==arguments.length)
				inter.push(arr[i]);
		return inter;
	};
	// @arr - JavaScript Array that is the reference point.
	// @arr1,@arr2,...@arrn - Javascript Array
	// Returns difference of @arr from @arr1 to @arrn
	u.differ = function(){
		var dif = arguments[0];
		for(var i=1;i<arguments.length;i++){
			var temp = [];
			for(var j=0;j<dif.length;j++)
				if(u.indexOf(arguments[i],dif[j])==-1)
					temp.push(dif[j]);
			dif = temp;
		}
		return dif;
	};	
	// @str - string to be searched
	// @s - string to be found
	// returns true or false if @str ends with @s
	u.endsWith = function(str,s){
		return new RegExp("(.)*"+s).test(str);
	};
	
	// @str - string to be searched
	// @s - string to be found
	// returns true or false if @str starts with @s
	u.startsWith = function(str,s){
		return new new RegExp(s+".").test(str);
	};
	
	// @str - string to be searched
	// deletes spaces at starts and ends
	u.trim = function(str){
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};

	_.addExtension({
		range:u.range,
		uniquify : u.uniquify,
		copy : u.copy,
		indexOf:u.indexOf,
		pushIfNotExist:u.pushIfNotExist,
		shuffle:u.shuffle,
		union:u.union,
		intersect:u.intersect,
		differ:u.differ,
		endsWith:u.endsWith,
		startsWith:u.startsWith,
		trim : u.trim
	},true);
	
	return u;
})();