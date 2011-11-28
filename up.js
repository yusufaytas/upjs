/*
 * upjs JavaScript Library
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
 //Creating upjs and _ variable
 var _= up =  (function(){
	// @selector - arguments for selecting dom elements 
	// @context - context that @selector is applied
	// if called with one param, it selects via @selector from document context
	// else it selects via @selector from @context
	// returns html element collection
	function _(){
		if(arguments.length==1)
			return _.select(document.body,arguments[0]);
		if(arguments.length==2)
			return _.select(arguments[0],arguments[1]);
	};
	// @id - dom id attribute value
	// returns the element with given id
	_.id = function(id){
        return document.getElementById(id);
    };
	// @tag - dom tag value
	// returns html element collection with given tag
    _.tag = function(tag){
        return document.getElementsByTagName(tag);
    };
	// @name - dom name attribute value
	// returns html element collection with given name
    _.name = function(name){
        return document.getElementsByName(name);
    };
	// @name - dom class attribute value
	// returns html element collection with given class
    _.clss = function(cname){
        return attrbt(document.body,"*","class",cname);
    };
	// @attribute - dom element attribute
	// @value - dom name attribute value
	// returns html element collection with given attribute and value
	_.attr = function(attribute,value){
		return attrbt(document.body,"*",attribute,value);
	};
	// private
	// @element - dom element
	// @tag - dom element tag value
	// @at - dom element attribute
	// @value - dom element attribute value
	// returns html element collection with given element,tag,at and value
    attrbt = function(element,tag,at,value){
		var elements = element.getElementsByTagName(tag);
		var array = new Array();
		for(var i=0;i<elements.length;i++)
		{
			if ( value ) {
				if ( elements[i].hasAttribute(at) && elements[i].getAttribute(at) == value )
					array.push(elements[i]);
			} else {
				if ( elements[i].hasAttribute(at) )
					array.push(elements[i]);
			}
		}
		if(array.length==1)
			return array[0];
		return array;
    };
	// @element - dom element
	// @selector - arguments for selecting dom elements
	// returns html element collection by applying selector to element
	_.select = function(element,selector){
		var result = new Array(),sel = selector.split(" ")[0];
		if(sel.charAt(0)=='.')
			result = attrbt(element,"*","class",sel.substring(1));
		else if(sel.charAt(0)=='#')
			result = attrbt(element,"*","id",sel.substring(1));
		else if(sel.indexOf("@")>=0){
			result = attrbt(element,sel.substring(sel.indexOf("@")+1),
			sel.substring(0,sel.indexOf(":")),sel.substring(sel.indexOf(":")+1,sel.indexOf("@")));
		}
		else if(sel.indexOf(":")>=0)
			result = attrbt(element,"*",sel.substring(0,sel.indexOf(":")),sel.substring(sel.indexOf(":")+1));
		else{
			elements = element.getElementsByTagName(sel);
			for(var i=0;i<elements.length;i++)
				result.push(elements[i]);
		}
		if(!result&&result.length == 0)
			return;
		if(selector.split(" ").length<2){
			if(result.length==1)result=result[0];
			return result;
		}
		else{
			var col = new Array();
			if(!(result.length))result = [result];
			while(result.length!=0)
			{
				selector = selector.substring(selector.indexOf(" ")+1);
				var temp = _.select(result.pop(),selector);
				if(temp&&temp.length==0)
					col.push(temp);
				while(temp&&temp.length>0)
					col.push(temp.pop());
			}
			if(col.length==1)col=col[0];
			return col;
		}
	};
	// @source - html string
	// returns html element constructing from source
	_.create = function(source){
		var el =  document.createElement('div');
		el.innerHTML = source;
		return _.first(el);
	};
	// @element - dom element
	// returns parent of a dom element
	_.parent = function(element){
		return element.parentNode;
	};
	// @element - dom element
	// returns children of a dom element
	_.children = function (element){
		var list = element.childNodes, oList = new Array();
		for(var i=0;i<list.length;i++)
			if(list[i].tagName)
				oList.push(list[i]);
		return oList;
	};
	// @element - dom element
	// returns next dom element
	_.next = function(element){
		var list = _.children(_.parent(element));
		for(var i=0;i<list.length;i++)
			if(list[i]==element)
				return list[i+1];
	};
	// @element - dom element
	// returns previous dom element
	_.prev = function(element){
		var list = _.children(_.parent(element));
		for(var i=0;i<list.length;i++)
			if(list[i]==element)
				return list[i-1];
	};
	// @element - dom element
	// returns first child
	_.first = function(element){
		return _.children(element)[0];
	};
	// @element - dom element
	// returns last child
	_.last = function(element){
		var list = _.children(element);
		return list[list.length-1];
	};
	// @element - dom element
	// @newNode - html element node
	// @oldNode - html element node
	// replaces old node with new node of element
	_.replace=function(element,newNode,oldNode){
		element.replaceChild(newNode,oldNode);
	};
	// @element - dom element
	// @value - html element node
	// removes value from element
	_.remove=function(element,value){
		element.removeChild(value);
	};
	// @element - dom element
	// @value - html element node
	// appends value to element
	_.append=function(element,value){
		if(typeof(value)=="object")
			element.appendChild(value);
		else
			element.innerHTML += value;
	};
	// @element - dom element
	// @value - html element node
	// inserts value before the element
	_.insertBefore=function(element,value){
		_.parent(element).insertBefore(_.create(value),element);
	};
	// @element - dom element
	// @value - html element node
	// inserts value after the element
	_.insertAfter=function(element,value){
		if(_.next(element))
			_.insertBefore(_.next(element),value);
		else
			_.append(element,value);
	};
	// @element - dom element
	// returns clone of html element
	_.clone=function(element){
		return element.cloneNode(true);
	};
	// @element - dom element
	// focus to element
	_.focus =function(element){
		element.focus();
	};
	// @list - list of elements
	// @func - function to be applied
	// @args - function arguments
	// for each list elements applies func
	_.foreach = function(list,func,args){
		if(args){
			for(var i=0;i<list.length;i++){
				list[i].func = func;
				list[i].func(args);
			}
		}
		else{
			for(var i=0;i<list.length;i++){
				list[i].func = func;
				list[i].func();
			}
		}	
	};
	// @element - dom element
	// @name - dom name attribute
	// @value - dom name attribute value
	// sets element's name to value  
	_.setAttr= function(element,name,value){
		element.setAttribute(name,value);
	};
	// @element - dom element
	// @name - dom name attribute
	// returns element's name value  
	_.getAttr= function(element,name){
		return element.getAttribute(name);
	};
	// @element - dom element
	// @name - class name
	// sets element's class name to value  
	_.setClass= function(element,name){
		_.setAttr(element,"class",name);
	};
	// @element - dom element
	// returns class name of an element
	_.getClass= function(element){
		_.getAttr(element,"class",name);
	};
	// @element - dom element
	// removes class of an element
	_.removeClass= function(element){
		_.getAttr(element,"class","");
	};
	// @element - dom element
	// @name - styler name
	// @value - styler value
	// sets element's style name to value  
	_.setStyle= function(element,value){
		_.setAttr(element,"style",value);
	};
	// @element - dom element
	// @name - name of the style property
	// returns style of an element
	// if called two params returns style property
	_.getStyle= function(element,name){
		if(name){
			if (element.style.getPropertyValue)
                return element.style.getPropertyValue(name);
            else 
                return element.style.getAttribute(name);
		}
		return _.getAttr(element,"style");
	};
	// @element - dom element
	// @name - styler name
	// @value - styler value
	// if name is specified replaces with value
	// else adds to style
	_.addStyle= function(element,name,value){
		var temp = _.getAttr(element,"style");
		var regex = new RegExp(name+_.regex.css);
		var resultStr = name+":"+value;
		if(!temp||temp=="")
			temp = resultStr;
		else if(temp.indexOf(name)==-1)
			temp+= ";"+resultStr;
		else
			temp = temp.replace(regex,resultStr);
		_.setAttr(element,"style",temp);
	};
	// @element - dom element
	// @name - styler name
	// removes the name
	_.removeStyle= function(element,name){
		var temp = _.getAttr(element,"style");
		var regex = new RegExp(name+_.regex.css);
		temp = temp.replace(regex,"");
		_.setAttr(element,"style",temp);
	};
	// @element - dom element
	// @html - html value
	// if called with one param returns html string of an element
	// else replaces html of the element
	_.html = function(){
		if(arguments.length==1)
			return arguments[0].innerHTML;
		if(arguments[0].length>1){				
			_.foreach(arguments[0],function(arg){_.html(this,arg);},arguments[1]);}
		else
			arguments[0].innerHTML = arguments[1];
	};
	// @el - json, javascript object
	// @ex - json, javascript object extension
	// extends el with ex
	_.extend = function(el,ex){
		for(var p in ex){
			if (ex[p] && ex[p].constructor && ex[p].constructor === Object){
				el[p] = el[p] || {};
				_.extend(el[p], ex[p]);
			}
			else
				el[p] = ex[p];
		}
		return el;
	};
	// @url
	// includes upjs library extension
	_.include = function(url){
		url = url.replace("upjs.","/");
		url =  url.replace(/\./g,"/");
		url = url.substring(1)+".js";
		_.get(url,"script");
	};
	// private
	// creates a XMLHTTPRequest object
	createXHR = function (){
		try { return new XMLHttpRequest(); } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
		try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	};
	// private
	// @xhr - XMLHTTPRequest object
	// @type - type of returned string
	// @callback - function to be called with returned data
	// @success - function to be called if get/post is successfull
	// @error - function to be called if get/post is error
	// handles XMLHTTPRequest response
	handleResponse = function(xhr,type,callback,success,error){
		if (xhr.readyState == 4){
			if(xhr.status == 200){
				if(callback){
					if(success)
						success();
					if(type=="xml")
						callback(xhr.responseXML);
					else if(type=="json"&&xhr.responseText)
						callback(eval("("+xhr.responseText+")"));
					else
						callback(xhr.responseText);
				}
				else if(type=="script")
					eval(xhr.responseText);
			}
			else if(error)
				error();
		}
	};
	// private
	// @url - url that request will be send
	// @type - type of returned string
	// @callback - function to be called with returned data
	// makes a http get request
	get = function(url,type,callback){
		var xhr = createXHR();
		xhr.onreadystatechange = function(){handleResponse(xhr,type,callback);};
		xhr.open("GET",url,true);
		xhr.send(null);
	};
	// private
	// @url - url that request will be send
	// @data - data to be sent to server
	// @type - type of returned string
	// @callback - function to be called with returned data
	// makes a http post request
	post = function(url,data,type,callback){
		var xhr = createXHR();
		xhr.onreadystatechange = function(){handleResponse(xhr,type,callback);};
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
		xhr.send(data);
	};
	// @url - url that request will be send
	// @type - type of returned string
	// @callback - function to be called with returned data
	// if called with two params(url,callback) 
	// else (url,type,callback)
	// makes a http get request
	_.get = function(){
		if(typeof arguments[1] == "function")
			get(arguments[0],null,arguments[1]);
		else
			get(arguments[0],arguments[1],arguments[2]);
	};
	// @url - url that request will be send
	// @data - data to be sent to server
	// @type - type of returned string
	// @callback - function to be called with returned data
	// if called with two params(url,callback) 
	// else if(url,type,callback) or (url,data,callback)
	// else (url,data,type,callback)
	// makes a http post request
	_.post = function(){
		if(typeof arguments[3] == "function")
			post(arguments[0],arguments[1],arguments[2],arguments[3]);
		else if(typeof arguments[2] == "function"){
			if(arguments[1]=="json"||arguments[1]=="xml")
				post(arguments[0],null,arguments[1],arguments[2]);
			else
				post(arguments[0],arguments[1],null,arguments[2]);
		}
		else if(typeof arguments[1] == "function")
			post(arguments[0],null,null,arguments[1]);
		else
			post(arguments[0],arguments[1],null,null);
	};
	// @url - url that request will be send
	// @options - ajax request options
	// makes a ajax request with options
	_.ajax = function(url,options){
		var xhr = createXHR();
		options = _.extend(_.regex.options,options);
		xhr.onreadystatechange = function(){handleResponse(xhr,options.type,options.callback,options.success,options.error);};
		xhr.open(options.method,url,options.asyn);
		if(options.before)options.before();
		xhr.send(options.params);
	};
	// @element - dom element
	// @events - one or more dom element events
	// @fn - function to be called when event occurs
	// attaches function to events for element
	_.attach = function(element,events,fn){
		var es = events.split(" ");
		for(var i=0;i<es.length;i++)
			if(element.attachEvent)
				element.attachEvent("on"+es[i],fn);
			else
				element.addEventListener(es[i],fn,null);
	};
	// @element - dom element
	// @events - one or more dom element events
	// @fn - function to be called when event occurs
	// detaches functions from events for element
	_.detach = function(element,events,fn){
		var es = events.split(" ");
		for(var i=0;i<es.length;i++)
			if(element.attachEvent)
				element.detachEvent("on"+es[i],fn);
			else
				element.removeEventListener(es[i],fn,null);
	};
	// @url - url that page will be redirected
	// redirects the page to given url
	_.redirect = function(url){
		window.location = url;
	};
	// @fn - function to be called when document is loaded
	// calls fn when document is loaded
	_.loaded = function(fn){
		_.attach(window,"load",fn);
	};
	// regular expressions that are used 
	_.regex={
		css: "(\\s)*:(\\s)*(#)*?([0-9A-Za-z])+(\\s)*",
		url: "http(s){0,1}:",
		options : {method:'GET',type:'',error:null,success:null,params:null,before:null,asyn:true,callback:null}
	};
	return _;
})();