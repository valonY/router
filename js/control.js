/*
*   路由控制器(初始化，改，删)
* */

//初始化
function Control(def, err, rules) {
    this.guide = new Router(def, err);
    this.tmpls = this.guide.getTmpl();
    this.rules = rules;
    for (var i = 0, _this = this, len = rules.length; i < len; i++) {
        (function (i) {
            _this.guide.route(rules[i].href.slice(1), function () {
                _this.guide.action(rules[i].href, rules[i].ctn, rules[i].url, rules[i].data);
            });
        })(i);
    }
}
//改
Control.prototype.reTmpl = function (h, reload, cb) { //h 对象 包含容器id，scriptID， 模板ID， 数据data 是否重注册当前模板reload
    if (!reload) {
        if ($(h.scriptID).tmpl(h.data) == this.tmpls[h.scriptID.slice(1)]) {
            return;
        } else {
            var _this = this;
            setTimeout(function () {
                if (!document.getElementById(h.scriptID.slice(1) || !document.getElementsByClassName(h.ctn.slice(1)))) {
                    throw "请确认目标容器以及所操作模板容器其存在！"
                }
                $(h.ctn + ">" + h.tmplID).css({
                    "opacity": "0",
                    "display": "none"
                });
                $(h.ctn + ">" + h.tmplID).remove(); //清除容器下模板
                $(h.ctn).empty();
                $(h.scriptID + ">" + h.tmplID).remove(); //清除jq_tmpl下模板
                $(h.scriptID).empty(); //清除jq_tmpl下全部
                $(h.scriptID).tmpl(h.data).appendTo(h.ctn); //重加载
                _this.tmpls[h.scriptID.slice(1)] = $(h.scriptID).tmpl(h.data);
                cb && cb(); //回调
            }, 0);
        }
    } else if (arguments[1] === reload) {
        var _this =this;
        var url = null;
        setTimeout(function () {
            $(h.ctn + ">" + h.tmplID).css({
                "opacity": "0",
                "display": "none"
            });
            $(h.ctn + ">" + h.tmplID).remove(); //清除容器下模板
            $(h.ctn).empty();
            $(h.scriptID + ">" + h.tmplID).empty(); //清除jq_tmpl下模板
            $(h.scriptID).remove(); //清除jq_tmpl下全部
            for(var i = 0, tab = _this.rules; i<tab.length; i++) {
                if(h.scriptID === tab[i].href) {
                    url = tab[i].url;
                    break;
                }
            }
            _this.guide.action(h.scriptID, h.ctn, url, h.data);
            cb && cb(); //回调
        }, 0);
    }
};
//删 TODO
Control.prototype.dele = function () {
    
}
window.controler = null;