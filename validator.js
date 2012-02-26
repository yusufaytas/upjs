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
	// patterns that are used for type checking
	v.patterns = {
		intt : /[-+]?[0-9]+/,
		alpha : /[A-Za-z]+/,
		email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
		date : /(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{4})|(\d{4}[\/.-]\d{1,2}[\/.-]\d{1,2})/,
		image: /(.)*\.(jpg|png|gif|bmp)$/,
		url : /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	};
	
	_.addExtension({
		isInt:function(value){
			return v.isInt(value);
		},
		isAlpha : function(value){
			return v.isAlpha(value);
		},
		isEmail : function(value){
			return v.isEmail(value);
		},
		isDate:function (value){
			return v.isDate(value);
		},
		isImage:function (value){
			return v.isImage(value);
		},
		isUrl:function (value){
			return v.isUrl(value);
		}
	},true);
	
	return v;
})();