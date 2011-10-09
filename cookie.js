/*
 * cookie, upjs extension
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.cookie = (function(){
	function c(){};
	// checks cookie is enabled or not
	c.cookieEnabled = function(){
		return navigator.cookieEnabled;
	};
	// @name - cookie name 
	// @value - cookie value
	// @days - expire day
	// sets the cookie
	c.setCookie = function(name,value,days){
		if (days){
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};
	// @name - cookie name 
	// returns the cookie with the name if it is available
	c.getCookie = function (name){
		var nname = name + "=";
		var ck = document.cookie.split(';');
		for(i=0;i < ck.length;i++){
			var c = ck[i];
			while (c.charAt(0)==' ') 
				c = c.substring(1,c.length);
			if(c.indexOf(nname) == 0) 
				return c.substring(nname.length,c.length);
		}
		return null;
	};
	// @name - cookie name 
	// deletes the cookie with the name
	c.deleteCookie = function (name){
		c.setCookie(name,"",-1);
	};
	return c;
})();