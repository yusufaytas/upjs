/*
 * treeview, upjs plugin
 * http://www.upjs.cetsoft.com/
 *
 * Copyright (C) 2014, Yusuf Aytas
 */
_.treeview = (function(){

	// @props - properties to initalize a treeview object
	// @element - dom ul element
	// converts given @element into treeview

	function t(element,props){
		t.element = element;
		if(props)
			t.props = _.extend(t.props,props);
		t.init();
	};

	// @t.props - properties of treeview
	t.props = {
		on : true,
		onClass : "trOn",
		offClass : "trOff",
		leafClass : "leaf",
		iconEl: "<span>&nbsp;&nbsp;&nbsp;</span>",
		func : function(el){
			el.toggle();
			var p = el.parent();
			var s = p.query("span").first();
			s.toggleClass(t.props.onClass,t.props.offClass);
		}
	};

	t.init = function(){
		t.tree(t.element);
	};

	// @element - dom ul element
	// converts ul element into treeview
	t.tree = function(element){
		_.foreach(_("li",element).getContent().reverse(),function(){
			var icon = _.create("<div>"+t.props.iconEl+"</div>");
			if(_.tag("ul",this).length>0){
				if(t.props.on)
					_("span",icon).setClass(t.props.onClass);
				else
					_("span",icon).setClass(t.props.offClass);
			}
			else
				_("span",icon).setClass(t.props.leafClass);
			_.html(this,_.html(icon)+_.html(this));
		});
		_.foreach(_("li",element).getContent().reverse(),function(){
			if(_.tag("ul",this).length>0){
				var s = _("span",this);
				var ul = _("ul",this);
				s = s.length>0?s.first():s;
				ul = ul.length>0?ul.first():ul;
				s.click(function(){
					t.props.func(ul);
				});
				if(!t.props.on)
					ul.toggle();
			}
		});
	};

	_.addPlugin({
		treeview:t
	});

	return t;
})();
