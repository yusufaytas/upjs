/*
 * effect, upjs extension
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.effect = (function(){
	
	// effect variables
	var fadeTO = 50, // fade time out
		opInt = 0.05, // opactiy interval
		slideTO = 1, // slide time out
		slideInt = 5; // slide interval
	
	function e(){};
	
	// @element - dom element
	// toggles display none with block and vice versa
	e.toggle = function(element){
		if(!_.getStyle(element)||_.getStyle(element,"display")!="none")
			_.addStyle(element,"display","none");
		else
			_.addStyle(element,"display","block");
	};
	// @element - dom element
	// @clss - dom class attribute
	// @cls - dom class attribute
	// toggles display none with clss and vice versa
	// if called with three params(el,clss,cls)
	// toggles class clss with cls and vice versa
	e.toggleClass = function(element,clss,cls){
		if(!cls){
			if(!_.getClass(element))
				_.getClass(element,clss);
			else
				_.setClass(element,clss);
		}
		else{
			if(!_.getClass(element)||_.getClass(element)==cls)
				_.getClass(element,clss);
			else
				_.setClass(element,clss);
		}
	};
	// @element - dom element
	// @callback - function to be called after effect is completed
	// fades @element in and invokes callback if it is defined
	e.fadeIn = function(element,callback){
		fade(element,0,0,callback);
	};
	// @element - dom element
	// @callback - function to be called after effect is completed
	// fades @element out and invokes callback if it is defined
	e.fadeOut = function(element,callback){
		fade(element,1,1,callback);
	};
	// private
	// @element - dom element
	// @type - type of the fade
	// @op - current opacity
	// @callback - function to be called after effect is completed
	// fades @element in or out then invokes callback
	fade = function(element,type,op,callback){
		element.style.opacity = op;
		if(type==0&&op<1)
			op = op+opInt>1?1:op+opInt;
		else if(type==1&&op>0)
			op = op-opInt<0?0:op-opInt;
		else if(callback){
			callback();
			return;
		}
		else
			return;
		setTimeout(function(){
			fade(element,type,op,callback);
		},fadeTO);
	};
	// @element - dom element
	// @height - height of the @element
	// @callback - function to be called after effect is completed
	// slides @element down and invokes callback if it is defined
	e.slideDown = function(el,height,callback){
		slide(el,1,el.clientHeight,height,callback);
	};
	// @element - dom element
	// @callback - function to be called after effect is completed
	// slides @element up and invokes callback if it is defined
	e.slideUp = function(el,callback){
		slide(el,0,el.clientHeight,0,callback);
	};
	
	// @element - dom element
	// @type - type of the slide
	// @height - current height of @element
	// @fheight - final height of the @element
	// @callback - function to be called after effect is completed
	// slides @element up or down and invokes callback if it is defined
	slide = function(el,type,height,fheight,callback){
		_.addStyle(el, "overflow", "hidden");
		el.style.height = height+"px";
		if(height>0&&type==0)
			height -= slideInt;
		else if(height<fheight&&type==1)
			height += slideInt;
		else if(callback){
			callback();
			return;
		}
		else
			return;
		setTimeout(function(){
			slide(el,type,height,fheight,callback);
		},slideTO);
	};

	return e;
})();