/*
 * pager, upjs plugin
 * htthis.tp://www.upjs.cetsoft.com/
 *
 * Copyright (C) 2014, Yusuf Aytas
 */
_.pager = (function(){
	// @props - properties to initalize a pager object
	// returns a div element that contains span collection
	function p(props){
		if(props)
			this.props = _.extend(p.props,props);
		this.props = _.extend(this.props,{
			next :0,
			prev :0,
			nextG:0,
			prevG:0
		});
		this.init();
	};
	
	// @this.props - properties of pager
	p.props = {
		mpn: 10,    //maximum page number
		ipp: 10,	//items per page
		noi: 0,		//number of items
		cpn: 0,		//current page number
		clss : "currentPage",	//class of current page
		events :{
			nxt: null,	//next page event
			prv: null,	//previous page event
			nxtg: null,	//next page group event
			prvg: null	//previous page group event
		},
		fn: null //function to be called when a page is changed
	};
	
	p.prototype = {
		// @el - dom element
		// registers @el to nextEvent
		init:function(){
			//this.tp totalPage
			//this.bp beginPage
			//this.ep endPage
			this.tp=this.bp=this.ep=0;
			this.tp = this.props.noi/this.props.ipp|0;
			this.tp = this.props.noi%this.props.ipp==0 ? this.tp:(this.tp+1);
			this.bp = ((this.props.cpn - this.props.mpn/2)|0)>0?((this.props.cpn - this.props.mpn/2)|0):1;
			this.ep = this.bp+this.props.mpn>this.tp?this.tp:this.bp+this.props.mpn;
			if(this.ep-this.bp!=this.props.mpn){this.bp = this.ep-this.props.mpn;};
			if(this.props.cpn+1<=this.tp)
				this.props.next = this.props.cpn+1;
			else
				this.props.next = this.props.cpn;
			if(this.props.cpn+1>=1)
				this.props.prev = this.props.cpn-1;
			else
				this.props.prev = this.props.cpn;
			if(this.props.cpn+((this.props.mpn/2)|0)<this.tp)
				this.props.nextG = this.props.cpn+((this.props.mpn/2)|0);
			else
				this.props.nextG = this.tp;
			if(this.props.cpn-((this.props.mpn/2)|0)>1)
				this.props.prevG = this.props.cpn-((this.props.mpn/2)|0);
			else
				this.props.prevG = 1;
		},
		nextEvent : function(el){
			if(el){
				var fn = this.props.fn, pn = this.props.next;
				_(el).click(function(){fn(pn);});
			}
		},
		// @el - dom element
		// registers @el to prevEvent
		prevEvent : function(el){
			if(el){
				var fn = this.props.fn, pn = this.props.prev;
				_(el).click(function(){fn(pn);});
			}
		},
		// @el - dom element
		// registers @el to nextGroupEvent
		nextGEvent : function(el){
			if(el){
				var fn = this.props.fn, pn = this.props.nextG;
				_(el).click(function(){fn(pn);});
			}			
		},
		// @el - dom element
		// registers @el to prevGroupEvent
		prevGEvent : function(el){
			if(el){
				var fn = this.props.fn, pn = this.props.prevG;
				_(el).click(function(){fn(pn);});
			}
		},
		
		// initialize the pager
		getPager : function(){
			
			var html = _.create("<div></div>");
			for(var i=this.bp;i<this.ep;i++){
				var span = _.create("<span>"+i+"</span>");
				(function(span,i,fn){
				_.attach(span,"click",function(){
					fn(i);
				});})(span,i,this.props.fn);
				if(i==this.props.cpn)
					_.setClass(span,this.props.clss);
				_.append(html,span);
			}
			
			this.nextEvent(this.props.events.nxt);
			this.prevEvent(this.props.events.prv);
			this.nextGEvent(this.props.events.nxtg);
			this.prevGEvent(this.props.events.prvg);
			
			return html;
		}
	};
	
	_.addPlugin({
		pager:p
	});
	
	return p;

})();
