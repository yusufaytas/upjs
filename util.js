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
		var years = [];
		for (var year = begin; year < end; year++)
		    years.push(year);
		return years;
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
		if(u.indexOf(arr,item)!=-1)
			arr.push(item);
	};
	
	// @str - string to be searched
	// @s - string to be found
	// returns true or false if @str ends with @s
	u.endsWith = function(str,s){
		return !(str.matches(new RegExp("."+s)));
	};
	
	// @str - string to be searched
	// @s - string to be found
	// returns true or false if @str starts with @s
	u.startsWith = function(str,s){
		return !(str.matches(new RegExp(s+".")));
	};
	
	// @str - string to be searched
	// deletes spaces at starts and ends
	u.trim = function(str){
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};

	return u;
})();