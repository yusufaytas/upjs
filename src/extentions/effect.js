/*
 * effect, upjs extension
 * http://www.upjs.cetsoft.com/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.effect = (function(){
	
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
				_.setClass(element,clss);
			else
				_.removeClass(element);
		}
		else{
			if(_.getClass(element)==clss)
				_.setClass(element,cls);
			else
				_.setClass(element,clss);
		}
	};
	
	_.addExtension({
		toggle:function(options){
			if(this.content.length)
				_.foreach(this.content,function(){
					e.toggle(this,options);
				});
			else
				e.toggle(this.content,options);
		},
		toggleClass:function(clss,cls,options){
			if(this.content.length)
				_.foreach(this.content,function(){
					e.toggleClass(this,clss,cls,options);
				});
			else
				e.toggleClass(this.content,clss,cls,options);
		}
	});
	
	return e;
})();
