/*
 * pager, upjs extension
 * http://www.upjs.org/
 * 
 * Copyright (C) 2011, Yusuf Aytas
 */
_.pager = (function(){
	//global pager variables
	//tp totalPage
	//bp beginPage
	//ep endPage
	var tp,bp,ep;
	// @props - properties to initalize a pager object
	// returns a div element that contains span collection
	function p(props){
		if(props)
			p.props = _.extend(p.props,props);
		return p.init();
	};
	// @p.props - properties of pager
	p.props = {
		mpn: 10,    //maximum page number
		ipp: 10,	//items per page
		noi: 0,		//number of items
		cpn: 0,		//current page number
		style : "font-weight:bold",	//style of current page
		events :{
			nxt: null,	//next page event
			prv: null,	//previous page event
			nxtg: null,	//next page group event
			prvg: null	//previous page group event
		},
		fn: null //function to be called when a page is changed
	};
	// @el - dom element
	// registers @el to nextEvent
	p.nextEvent = function(el){
		_.attach(el,"click",p.next);
	};
	// @el - dom element
	// registers @el to prevEvent
	p.prevEvent = function(el){
		_.attach(el,"click",p.prev);
	};
	// @el - dom element
	// registers @el to nextGroupEvent
	p.nextGEvent = function(el){
		_.attach(el,"click",p.nextG);
	};
	// @el - dom element
	// registers @el to prevGroupEvent
	p.prevGEvent = function(el){
		_.attach(el,"click",p.prevG);
	};
	// creates nextEvent
	p.next = function(){
		if(p.props.cpn+1<=tp)
			p.props.fn(p.props.cpn+1);	
	};
	// creates prevEvent
	p.prev = function(){
		if(p.props.cpn+1>=0)
			p.props.fn(p.props.cpn-1);
	};
	// creates nextGroupEvent
	p.nextG = function(){
		if(p.props.cpn+((p.props.mpn/2)|0)<tp)
			p.props.fn(p.props.cpn+((p.props.mpn/2)|0));
	};
	// creates prevGroupEvent
	p.prevG = function(){
		if(p.props.cpn-((p.props.mpn/2)|0)>tp)
			p.props.fn(p.props.cpn-((p.props.mpn/2)|0));
	};
	// initialize the pager
	p.init = function(){
		tp = p.props.noi/p.props.ipp|0;
		tp = p.props.noi%p.props.ipp==0 ? tp:(tp+1);
		bp = ((p.props.cpn - p.props.mpn/2)|0)>0?((p.props.cpn - p.props.mpn/2)|0):0;
		ep = bp+p.props.mpn>tp?tp:bp+p.props.mpn;
		if(ep-bp!=p.props.mpn){bp = ep-p.props.mpn;};
		var html = _.create("<div></div>");
		for(var i=bp;i<ep;i++){
			var span = _.create("<span>"+i+"</span>");
			(function(span,i){
			_.attach(span,"click",function(){
				p.props.fn(i);
			});})(span,i);
			if(i==p.props.cpn)
				_.setStyle(span,p.props.style);
			_.append(html,span);
		}
		if(p.props.events.nxt)
			p.nextEvent(p.props.events.nxt);
		if(p.props.events.prv)
			p.prevEvent(p.props.events.prv);
		if(p.props.events.nxtg)
			p.nextGEvent(p.props.events.nxtg);
		if(p.props.events.prvg)
			p.prevGEvent(p.props.events.prvg);
		return html;
	};
	return p;
})();