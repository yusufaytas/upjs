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
	v.isNumeric = function(value){
		return v.patterns.numeric.test(value);
	};
	// @value
	// checks the given value is alpha or not
	v.isAlpha = function(value){
		return v.patterns.alpha.test(value);
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
	// @value
	// checks the given value is url or not
	v.isUrl = function(value){
		return v.patterns.url.test(value);
	};
	
	// @value
	// checks the given value is phone number or not
	v.isPhone = function(value){
		return v.patterns.phone.test(value);
	};
	
	// @value
	// checks the given value is null or not
	v.isNull = function(value){
		return value==null;
	};
	
	// @value
	// checks the given value is undefined or not
	v.isUndefined = function(value){
		return value==undefined;
	};
	
	// @value
	// checks the given value is empty or not
	v.isEmpty = function(value){
		return value==""&&!value;
	};
	
	// @value
	// checks the given value is object or not
	v.isObject = function(value){
		return typeof(value) == "object";
	};
	
	// @value
	// checks the given value is function or not
	v.isFunction = function(value){
		return typeof(value) == "function";
	};
	
	// @value
	// checks the given value is HTML Element or not
	v.isHTMLElement = function(value){
		return !(!(value.tagName));
	};
	// patterns that are used for type checking
	v.patterns = {
		numeric : /^[-+]?\d*[\.\,]?\d*$/,
		alpha : /^[A-Za-z]+$/,
		email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
		date : /^(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{4})|(\d{4}[\/.-]\d{1,2}[\/.-]\d{1,2})^$/,
		image: /(.)*\.(jpg|png|gif|bmp)$/,
		url : /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
		phone : /^\+?((\d *)|(\d-)){7,15}$/
	};
	
	_.addExtension({
		isNumeric:v.isNumeric,
		isAlpha : v.isAlpha,
		isEmail : v.isEmail,
		isDate:v.isDate,
		isImage:v.isImage,
		isUrl:v.isUrl,
		isPhone:v.isPhone,
		isNull:v.isNull,
		isUndefined:v.isUndefined,
		isEmpty:v.isEmpty,
		isObject:v.isObject,
		isFunction:v.isFunction,
		isHTMLElement:v.isHTMLElement
	},true);
	
	return v;
})();