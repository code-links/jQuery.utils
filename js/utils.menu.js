
$.utils.Environment.initMe({ css: true });
// 菜单
// $.utils.menu
// .ContextMenu
(function ($) {
    var _ContextMenu = (function () {
        function ContextMenu() {
            var _this = this;
            var _cmid = $.utils.Guid.new().toString("N");
            var _html = "<div class='contextmenu' id='" + _cmid + "'><ul class='menu'></ul></div>";
            var _cmenuJq = $("body").append(_html).find("#" + _cmid);
            var _menuJq = _cmenuJq.find(".menu");
            var _srcElement;
            var _defMenuItem = { title: "菜单1", desc: "", callback: null, menuid: "" };
            _cmenuJq.children().on("contextmenu", function () { return false; });

            $(document).on("click", function () { _this.hide(); });

            function oncontextmenu(e) {
                e = e || window.event;
                return _this.popup(e.clientX, e.clientY, e.target || e.srcElement);

            }

            this.count = function () { return _menuJq.find("li").length; };

            this.add = function (options) {
                options = $.extend({ title: '菜单' + _this.count() }, _defMenuItem, options);
                $("<li>", {
                    text: options.title,
                    class: "item",
                    title: options.desc,
                    "menu-id": options.menuid,
                    click: function () {
                        if (options.callback) {
                            options.callback(_srcElement);
                        }
                    }
                }).appendTo(_menuJq);
                return _this;
            }

            this.remove = function (menuid) {
                _menuJq.find("[menu-id='" + menuid + "']").remove();
                return _this;
            }

            this.addSeparator = function (separatorid) {
                $("<li>", { "menu-id": separatorid }).append($("<hr>", { class: "separator" })).appendTo(_menuJq);
                return _this;
            }

            this.popup = function popmenu(x, y, srcElement) {
                _srcElement = srcElement;
                _cmenuJq.css("left", x).css("top", y).fadeIn();
                return _this;
            }

            this.hide = function () {
                if (_cmenuJq.is(":visible")) {
                    _cmenuJq.fadeOut(100);
                }
                return _this;
            }

            this.for = function (tagJq) {
                $(tagJq).each(function (i, el) {
                    $(el).on("contextmenu", oncontextmenu);
                });
                return _this;
            }
        }
        return ContextMenu;
    })();
    if (!$.utils.menu) $.utils.menu = {};
    $.extend($.utils.menu, { ContextMenu: _ContextMenu });
})(jQuery);