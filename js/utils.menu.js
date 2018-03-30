'esversion:6';
$.utils.Environment.initMe({ css: true });
// 菜单
// $.utils.menu
// .ContextMenu
(function ($) {
    var _MenuItem = (function(){
        function MenuItem(){
            var _this = this;
            var _$item = $("<li>", {});
            
            this.appendChild = function(menuItem){
                return _this;
            };
            this.prepend = function(menuItem){
                return _this;
            };
            this.children = function(){
                return null;
            };
            this.title =function(){
                if(arguments.length == 0){
                    
                }
            };
            this.menuid=function(){
                if(arguments.length == 0){

                }
            };
            this.get =function(){
                return _$item.get(0);
            };
            this.attr = function(){
                var _attrName;
                if(arguments.length == 1){
                    _attrName = arguments[0];
                }
                else if(arguments.length == 2){
                    _attrName = arguments[0];
                    var _attrValue = arguments[1];
                }
            };
            this.enable = function(){
                if(arguments.length == 0){

                }
                else{

                }
            };
            return MenuItem;
        }
    })();
    var _ContextMenu = (function () {
        function ContextMenu() {
            var _this = this;
            var _cmid = $.utils.Guid.new().toString("N");
            var _html = "<div class='contextmenu' id='" + _cmid + "'><ul class='menu'></ul></div>";
            var _$container = $("body").append(_html).find("#" + _cmid);
            var _$menu = _$container.find(".menu");
            var _srcElement;
            var _defMenuItem = { title: "菜单1", desc: "", callback: null, menuid: "" };
            _$container.children().on("contextmenu", function () { return false; });

            $(document).on("click", function () { _this.hide(); });

            function oncontextmenu(e) {
                e = e || window.event;
                if (e.preventDefault){  
                    e.preventDefault();  
                }  
                else{  
                    e.returnValue=false;  
                }
                var _cancel = false;
                if(typeof e.data.before == typeof $.noop){
                    if(e.data.before(_this) !== true){
                        _cancel =true;
                    }
                }
                if(!_cancel){
                    _this.popup(e.clientX, e.clientY, e.target || e.srcElement);
                    if(typeof e.data.after == typeof $.noop){
                        e.data.after(_this);
                    }
                }
                
            }

            function createItem(option){
                options = $.extend({ title: '菜单' }, _defMenuItem, options);
                return $("<li>", {
                        text: options.title,
                        class: "item",
                        title: options.desc,
                        "data-menu-id": options.menuid,
                        click: function () {
                            if (options.callback) {
                                options.callback(_srcElement);
                            }
                        }
                    });
            }

            function addCore(target, item){

            }

            this.count = function () { return _$menu.find("li").length; };
            //添加菜单
            //{title,desc,menuid,callback,data:{}}
            this.add = function (items) {
                var _this = this;
                if(items instanceof Array){
                    for(var i = 0; i< item.length; i++){
                        _this.add(items[i]);
                    }
                }else if(items instanceof _MenuItem){
                    
                }else if(items){

                }
                else{
                    return null;
                }
            };

            this.remove = function (menuid) {
                _$menu.find("[data-menu-id='" + menuid + "']").remove();
                return _this;
            };

            this.addSeparator = function (separatorid) {
                $("<li>", { "data-menu-id": separatorid }).append($("<hr>", { class: "separator" })).appendTo(_$menu);
                return _this;
            };
            //遍历菜单项
            this.each = function(fn){
                if(typeof fn == typeof $.noop){
                    _$menu.children("li").each(function(){

                    });
                }
            }

            this.popup = function popmenu(x, y, srcElement) {
                _srcElement = srcElement;
                _$container.css("left", x).css("top", y).fadeIn();
                return _this;
            };

            this.hide = function () {
                if (_$container.is(":visible")) {
                    _$container.fadeOut(100);
                }
                return _this;
            };

            this.bind = function (el, fn_before, fn_after) {
                //$(el).off("contextmenu", null, oncontextmenu);
                $(el).on("contextmenu", null, { before : fn_before, after : fn_after }, oncontextmenu);
                return _this;
            };
        }
        return ContextMenu;
    })();
    
    if (!$.utils.menu) $.utils.menu = {};
    $.extend($.utils.menu, { MenuItem:_MenuItem, ContextMenu: _ContextMenu });
})(jQuery);