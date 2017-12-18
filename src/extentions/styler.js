/*
 * styler, upjs extension
 * http://www.yusufaytas.com/
 * 
 * Copyright (C) 2014, Yusuf Aytas
 */
_.styler = (function(){
	function s(){};
	
	// @title - style sheet title attribute value
	// returns style sheet with given title
	s.getStyleSheet = function(title) {
		for(var i=0; i<document.styleSheets.length; i++){
			var sheet = document.styleSheets[i];
			if(sheet.title == title)
				return sheet;
		}
	};
	
	// @ss - style sheet
	// adds @ss to the head of document
	s.addStyleSheet = function(ss){
		_.tag("head").append(ss);
	};
	
	// @title - style sheet title attribute value
	// removes style sheet with given title
	s.removeStyleSheet = function(title) {
		var el = _("title:"+title+"@link",document.head);
		el.parent().remove(el);
	};
	
	// @content - style sheet content
	// @title - style sheet title attribute value
	// creates style sheet with given content and if 
	// title is specified with a title
	s.createStyleSheet = function(content,title){
		var ss = document.createElement('style');
		_.setAttr(ss,"type", "text/css");
		if(ss.styleSheet)
			ss.styleSheet.cssText = content;
		else
			ss = _.create("<style>"+content+"</style>");
		_.setAttr(ss,"title",title);
		return ss;
	};
	
	// @title - style sheet title attribute value
	// activates style sheet with given title
	// and deactivates others
	s.setActiveStyleSheet = function(title){
		for(var i=0; i<document.styleSheets.length; i++){
			var sheet = document.styleSheets[i];
			if(sheet.title == title)
				sheet.disabled = false;
			else
				sheet.disabled = true;
		}
	};
	
	// returns active stylesheet
	s.getActiveStyleSheet = function(){
		for(var i=0; i<document.styleSheets.length; i++){
			var sheet = document.styleSheets[i];
			if(!sheet.disabled)
				return sheet;
		}
	};
	
	// @ss - style sheet
	// @rule style sheet rule element (div{color:pink})
	// adds @rule to @ss 
	s.addRule = function(ss,rule){
		if(ss.rules){
			selector = rule.substring(0,rule.indexOf("{"));
			decleration = rule.substring(rule.indexOf("{")+1,rule.indexOf("}"));
			ss.addRule(selector,decleration);
		}else
			ss.insertRule(rule,0);
	};
	
	_.addExtension({
		getStyleSheet : function(title){
			return s.getStyleSheet(title);
		},
		addStyleSheet : function(ss){
			s.addStyleSheet(ss);
		},
		removeStyleSheet : function(title){
			s.removeStyleSheet(title);
		},
		createStyleSheet:function (content,title){
			return s.createStyleSheet(content,title);
		},
		setActiveStyleSheet:function (title){
			s.setActiveStyleSheet(title);
		},
		getActiveStyleSheet :function (title){
			return s.getActiveStyleSheet(title);
		},
		addRule : function(ss,rule){
			s.addRule(ss,rule);
		}
	},true);
	
	return s;
})();
