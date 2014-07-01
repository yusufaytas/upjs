/*
 * upjs JavaScript Library
 * http://www.upjs.cetsoft.com/
 *
 * Copyright (C) 2012, Yusuf Aytas
 */
 //Creating upjs and _ variable
 var _= up =  (function(){
	// @selector - arguments for selecting dom elements
	// @context - context that @selector is applied
	// if called with one param, it selects via @selector from document context
	// else it selects via @selector from @context
	// returns html element collection
	function _(){
		if(arguments.length==1){
			if(arguments[0].tagName|| typeof(arguments[0])=="object")
				return new _.up(arguments[0]);
			return new _.up(_.select(document.body,arguments[0]));
		}
		if(arguments.length==2)
			return new _.up(_.select(arguments[1],arguments[0]));
	};
	// @id - dom id attribute value
	// @context - context that is applied
	// returns the element with given id from @context if it is given
	_.id = function(id,context){
		if(context)
			return new _.up(context.getElementById(id));
		return new _.up(document.getElementById(id));
    };
	// @tag - dom tag value
    // @context - context that is applied
	// returns html element collection with given tag from @context if it is given
    _.tag = function(tag,context){
    	if(context)
    		return new _.up(context.getElementsByTagName(tag));
    	return new _.up(document.getElementsByTagName(tag));
    };
	// @name - dom name attribute value
    // @context - context that is applied
	// returns html element collection with given name from @context if it is given
    _.elName = function(name,context){
    	if(context)
    		return new _.up(context.getElementsByName(name));
    	return new _.up(document.getElementsByName(name));
    };
	// @name - dom class attribute value
	// returns html element collection with given class
    _.clss = function(cname,context){
    	if(context)
    		return new _.up(attrbt(context,"*","class",cname));
    	return new _.up(attrbt(document.body,"*","class",cname));
    };
	// @attribute - dom element attribute
	// @value - dom name attribute value
	// returns html element collection with given attribute and value
	_.attr = function(attribute,value,context){
		if(context)
    		return new _.up(attrbt(context,"*",attribute,value));
		return new _.up(attrbt(document.body,"*",attribute,value));
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
		var result = [],sel = selector.split(" ")[0];
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
			if(result&&result.length==1)result=result[0];
		}
		if(!result&&result.length == 0)
			return;
		if(selector.split(" ").length<2)
			return result;
		else{
			var col = [];
			if(!result.length)
				result = [result];
			while(result.length!=0)
			{
				selector = selector.substring(selector.indexOf(" ")+1);
				var temp = _.select(result.pop(),selector);
				if(temp&&!temp.length)
					col.push(temp);
				while(temp&&temp.length>0)
					col.push(temp.pop());
			}
			if(col.length==1)col = col[0];
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
		if(typeof(value)!="object")
			_.parent(element).insertBefore(_.create(value),element);
		else
			_.parent(element).insertBefore(value,element);
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
		return _.getAttr(element,"class");
	};
	// @element - dom element
	// removes class of an element
	_.removeClass= function(element){
		_.setAttr(element,"class","");
	};
	// @element - dom element
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
		else if(temp.indexOf(name)==-1){
			if(temp[temp.length-1]!=';')
				temp+= ";"+resultStr;
			else
				temp+= resultStr;
		}
		else
			temp = temp.replace(regex,resultStr);
		_.setAttr(element,"style",temp);
	};
	// @element - dom element
	// @name - styler name
	// removes the name
	_.removeStyle= function(element){
		_.setAttr(element,"style","");
	};
	// @element - dom element
	// @html - html value
	// if called with one param returns html string of an element
	// else replaces html of the element
	_.html = function(element,html){
		if(!html)
			return arguments[0].innerHTML;
		if(html.tagName)
			html = _.toString(html);
		if(element.length>1)
			_.foreach(element,function(){
				_.html(this,html);
			});
		else
			element.innerHTML = html;
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
					type = type.toLowerCase();
					if(type==_.ajaxDataType.XML)
						callback(xhr.responseXML);
					else if(type==_.ajaxDataType.JSON&&xhr.responseText)
						callback(eval("("+xhr.responseText+")"));
					else
						callback(xhr.responseText);
				}
				else if(type==_.ajaxDataType.SCRIPT)
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
	_.get = function(arg0,arg1,arg2){
		if(typeof arg1 == "function")
			get(arg0,null,arg1);
		else
			get(arg0,arg1,arg2);
	};
	// @url - url that request will be send
	// @data - data to be sent to server
	// @type - type of returned string
	// @callback - function to be called with returned data
	// if called with two params(url,callback)
	// else if(url,type,callback) or (url,data,callback)
	// else (url,data,type,callback)
	// makes a http post request
	_.post = function(arg0,arg1,arg2,arg3){
		if(arg3&&typeof(arg3) == "function")
			post(arg0,arg1,arg2,arg3);
		else if(arg2&&typeof(arg2) == "function"){
			if(_.ajaxDataType[arg1.toUpperCase()])
				post(arg0,null,arg1,arg2);
			else
				post(arg0,arg1,null,arg2);
		}
		else if(typeof arg1 == "function")
			post(arg0,null,null,arg1);
		else
			post(arg0,arg1,null,null);
	};
	// @url - url that request will be send
	// @options - ajax request options
	// makes a ajax request with options
	_.ajax = function(url,options){
		var xhr = createXHR();
		options = _.extend(_.ajaxOptions,options);
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
	_.ready = function(fn){
		_.attach(window,"load",fn);
	};
	// @statement - expression to be executed
	// executes given @statement
	_.exec = function(statement){
		try{eval(statement);}catch (e) {}
	};
	// @element - dom element
	// returns the string representation of @element.
	_.toString = function(element){
		if(element.tagName){
			var temp = "";
			temp += "<"+element.tagName+" ";
			for(var i=0;i<element.attributes.length;i++){
				var attribute = element.attributes[i];
				temp += attribute.name+"='"+attribute.value+"' ";
			}
			temp +=">"+element.innerHTML+"</"+element.tagName+">";
			return temp;
		}
		return element;
	};

	// private
	// @fn - javascript function
	// @args - array of arguments
	// returns a javascript object that is instance of @fn constructed
	// with the parameters @args
	construct = function(fn,args){
		function func() {
			fn.apply(this, args);
		}
		func.prototype = fn.prototype;
		return new func();
	};
	// regular expressions that are used
	_.regex={
		css: "(\\s)*:(\\s)*(#)*?([0-9A-Za-z])+(\\s)*",
		url: "http(s){0,1}:"
	};

	_.ajaxOptions = {method:'GET',type:'',error:null,success:null,params:null,before:null,asyn:true,callback:null};
	_.ajaxDataType = {XML:"xml",JSON:"json",SCRIPT:"script"};

	// @ext - extension for _.up
	// @noContent - boolean value that indicates function use UPJSObject content or not.
	// extends _.up with the @ext
	_.addExtension = function(ext,noContent){
		if(noContent){
			for(var key in ext)
				_[key] = ext[key];
		}
		_.extend(_.up.prototype,ext);
	};

	_.addPlugin = function(plugin){
		_.extend(_.up.plugins,plugin);
	};

	_.up = (function(){

		function up(content){
			if(content){
				if(content.UPJSObject){
					this.content = content.getContent();
					this.length = content.length?content.length:0;
					content = null;
					this.UPJSObject = true;
				}
				else{
					this.content = content;
					this.length = content.length?content.length:0;
					this.UPJSObject = true;
				}
			}
		};

		up.prototype = {
			query : function(selector){
				return new _.up(_.select(this.content,selector));
			},
			parent : function(){
				return new _.up(_.parent(this.content));
			},
			children : function(){
				return new _.up(_.children(this.content));
			},
			next : function(){
				return new _.up(_.next(this.content));
			},
			prev : function(){
				return new _.up(_.prev(this.content));
			},
			first : function(){
				if(this.length>0)
					return new _.up(this.content[0]);
				return new _.up(_.first(this.content));
			},
			last:function(){
				if(this.length>0)
					return new _.up(this.content[this.length-1]);
				return new _.up(_.last(this.content));
			},
			replace : function(newNode,oldNode){
				if(newNode.getContent)
					newNode = newNode.getContent();
				if(oldNode.getContent)
					oldNode = oldNode.getContent();
				_.replace(this.content,newNode,oldNode);
			},
			remove : function(){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.remove(_.parent(this),this);
					});
				_.remove(_.parent(this.content),this.content);
			},
			append : function(value){
				if(value.getContent)
					value = value.getContent();
				if(this.content.length)
					_.foreach(this.content,function(){
						_.append(this,value);
					});
				else
					_.append(this.content,value);
			},
			insertBefore :function(value){
				_.insertBefore(this.content,value);
			},
			insertAfter : function(value){
				_.insertAfter(this.content,value);
			},
			clone : function(value){
				return new _.up(_.clone(this.content));
			},
			focus : function(value){
				_.focus(value);
			},
			foreach : function(func,args){
				_.foreach(this.content,func,args);
			},
			setAttr : function(name,value){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.setAttr(this,name,value);
					});
				else
					_.setAttr(this.content,name,value);
			},
			getAttr : function(name){
				return _.getAttr(this.content,name);
			},
			setClass : function(name){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.setClass(this,name);
					});
				else
					_.setClass(this.content,name);
			},
			getClass : function(){
				return _.getClass(this.content);
			},
			removeClass : function(){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.removeClass(this);
					});
				else
					_.removeClass(this.content);
			},
			setStyle : function(value){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.setStyle(this,value);
					});
				else
					_.setStyle(this.content,value);
			},
			getStyle : function(value){
				return _.getStyle(this.content,value);
			},
			addStyle : function(name,value){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.addStyle(this,name,value);
					});
				else
					_.addStyle(this.content,name,value);
			},
			removeStyle : function(){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.removeStyle(this);
					});
				else
					_.removeStyle(this.content);
			},
			html : function(html){
				if(html){
					if(this.content.length)
						_.foreach(this.content,function(){
							_.html(this,html);
						});
					else
						_.html(this.content,html);
				}
				else
					return _.html(this.content);

			},
			extend : function(ex){
				_.extend(this.content,ex);
			},
			attach : function(events,fn){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.attach(this,events,fn);
					});
				else
					_.attach(this.content,events,fn);
			},
			detach : function(events){
				if(this.content.length)
					_.foreach(this.content,function(){
						_.detach(this,events,fn);
					});
				else
					_.detach(this.content,events,fn);
			},
			value : function(value){
				if(value!=undefined)
					this.content.value = value;
				return this.content.value;
			},
			color : function(color){
				this.addStyle("color",color);
			},
			getContent: function(){
				return this.content;
			},
			toString : function(){
				return _.toString(this.content);
			},
			click : function(fn){
				_.attach(this.content,"click",fn);
			},
			mouseOver : function(fn){
				_.attach(this.content,"mouseover",fn);
			},
			mouseOut : function(fn){
				_.attach(this.content,"mouseout",fn);
			},
			getPlugin : function(name){
				var plugin = _.up.plugins[name];
				var args = [];
				args.push(this.content);
				for(var i=1;i<arguments.length;i++)
					args.push(arguments[i]);
				return construct(plugin,args);
			}

		};

		return up;

	})();

	_.up.plugins = {};

	return _;
})();
