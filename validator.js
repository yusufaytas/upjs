/*
 * validator, upjs extension
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.validator = (function(){
	function v(){};
	// @value
	// checks the given value is integer or not
	v.isInt = function(value){
		return v.patterns.intt.test(value);
	};
	// @value
	// checks the given value is string or not
	v.isString = function(value){
		return v.patterns.string.test(value);
	};
	// @value
	// checks the given value is email or not
	v.isEmail = function(value){
		return v.patterns.email.test(value);
	};
	// @value
	// checks the given value is date or not
	v.isDate = function(value){
		return v.patterns.date.test(value);
	};
	// @value
	// checks the given value is image or not
	v.isImage = function(value){
		return v.patterns.image.test(value);
	};
	// patterns that are used for type checking
	v.patterns = {
		intt : /-{0,1}[0-9]+/,
		string : /[A-Za-z]+/,
		email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
		date : /\d{1,2}\/\d{1,2}\/\d{4}/,
		image: /(.)*\.(jpg|png|gif|bmp)$/
	}
	return v;
})();