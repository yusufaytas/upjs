/*
 * serializer, upjs extension
 * http://www.upjs.cetsoft.com/
 * 
 * Copyright (C) 2014, Yusuf Aytas
 */
_.serializer = (function(){
	function s(){};
	// @obj - object to be serialized
	// serialazes given object
	s.serialize = function(obj){
		if(obj.tagName&&obj.tagName.toUpperCase() == "FORM")
			return s.serializeForm(obj);
		else
			return s.serializeJSON(obj);
	};
	// @form - form to be serialized
	// serialazes given form
	s.serializeForm = function(form){
		var i, j, q = [];
		for (i = form.elements.length - 1; i >= 0; i = i - 1) {
			if(form.elements[i].hasAttribute("name")){
				switch (form.elements[i].nodeName.toUpperCase()){
					case 'INPUT':
						switch (form.elements[i].type) {
							case 'checkbox':
							case 'radio':
								if (form.elements[i].checked) 
									q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));		
								break;
							default: q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
								break;
						}
						break;			 
					case 'TEXTAREA':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'SELECT':
						switch (form.elements[i].type) {
							case 'select-one':
								q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
								break;
							case 'select-multiple':
								for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) 
									if (form.elements[i].options[j].selected) 
										q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
								break;
						}
						break;
				}
			}
		}
		return q.join("&");
	};
	// @json - json to be serialized
	// serialazes given json
	// warning : this method is generally called json.stringify
	s.serializeJSON = function(json){
		if (typeof (json) != "object" || json === null)
			return '"'+String(json)+'"';  
		else{  
			var n=v="", jsonArr = [], arr = (json && json.constructor == Array);  
			for (n in json) {  
				v = json[n];   
				if (typeof(v) == "object" && v !== null)
					v = s.serializeJSON(v);
				else
					v = '"'+String(v)+'"';
				jsonArr.push((arr ? "" : '"' + n + '":') + v);  
			}  
			return (arr ? "[" : "{") + String(jsonArr) + (arr ? "]" : "}");  
		}
	};
	// @url - url that request will be send
	// @json - json to be sent to server
	// @type - type of returned string
	// @callback - function to be called with returned data
	// if called with two params(url,json,callback)
	// serializes json and do a post request
	s.postJSON = function(url,json,arg1,arg2){
		if(arg2)
			_.post(url,"json="+encodeURIComponent(s.serialize(json)),arg1,arg2);
		else
			_.post(url,"json="+encodeURIComponent(s.serialize(json)),arg1);
	};
	// @url - url that request will be send
	// @json - json to be sent to server
	// @type - type of returned string
	// @callback - function to be called with returned data
	// if called with two params(url,form,callback)
	// serialize form and do a post request
	s.postForm = function(url,form,arg1,arg2){
		if(arg2)
			_.post(url,s.serialize(form),arg1,arg2);
		else
			_.post(url,s.serialize(form),arg1);
	};
	
	_.addExtension({
		serialize:function(){
			return s.serialize(this.content);
		},
		serializeForm : function(){
			return s.serializeForm(this.content);
		},
		serializeJSON : function(){
			return s.serializeJSON(this.content);
		},
		postJSON:function (url,arg1,arg2){
			s.postJSON(url,this.content,arg1,arg2);
		},
		postForm:function (url,arg1,arg2){
			s.postForm(url,this.content,arg1,arg2);
		}
	});
	
	return s;
})();
