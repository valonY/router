function Router(config, err) {
	if(config.split("#")[0]) {
		config = "#" + config;
	}
	if(err.split("#")[0]) {
		err = "#" + err;
	}
	this.config = config;
	this.err = err;
	this.tmpl = {};
	this.routes = {},
	this.currenUrl = "";
	this.getTmpl = function() {
		return this.tmpl;
	}
	var _this = this;
	$(window).on('load', function() {
		_this.route('', function() {
			location.hash = config;
		});
		_this.refresh();
	});
	$(window).on('hashchange', function() {
		_this.refresh();
	});
}
Router.prototype.route = function(path, callback) {
	this.routes[path] = (callback && Object.prototype.toString.call(callback) === '[object Function]') ? callback : function() {};
}
Router.prototype.refresh = function() {
	this.currenUrl = location.hash.slice(1) || "";
	if(!this.routes[this.currenUrl] || (typeof this.routes[this.currenUrl] !== 'function')) {
		location.hash = this.err || this.config;
		//		throw '没有匹配到该路由， 请检查代码！'
	} else {
		this.routes[this.currenUrl]();
	}
}

Router.prototype.action = function(id, target, src, data) {
	var index = id.slice(1);
	var _this = this;
	$(target).empty();
	if(!document.getElementById(index)) {
		var scriptel = $('<script id=' + index + ' type="text/html" name="boom"></script>');
		$('body').prepend(scriptel);
		scriptel.load(src, function() {
			_this.tmpl[index] = scriptel.tmpl(data);
			_this.tmpl[index].appendTo(target);
		});
	} else {
		_this.tmpl[index].appendTo(target);
	}
}