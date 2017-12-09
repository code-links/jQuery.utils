// 对话框，消息提示框
// utils.dialogs 
// .MessageBox
// .NoticeBox
// .ProgressMessageBox
// .PicViewer
(function ($) {
    var _MessageBox = (function () {
        function MessageBox(options) {
            options = $.extend({}, MessageBox.defaults, options || {});
            var _this = this;
            var _boxid = $.utils.Guid.new().toString("N");
            var _html = "<div id='" + _boxid + "' class='msgbox'><div class='body'><div class='title'></div><div class='content'></div><div class='footer'></div></div></div>";
            var _jqBox = $("body").append(_html).find("#" + _boxid);
            var _jqTitle = _jqBox.find(".title");
            var _jqContent = _jqBox.find(".content");
            var _jqFooter = _jqBox.find(".footer");
            init();
            function init() {
                _jqTitle.css('color', MessageBox.defaults.titleColor)
                    .css('background-color', MessageBox.defaults.titleBackgroundColor);
                _jqContent.css('color', MessageBox.defaults.contentColor)
                    .css('background-color', MessageBox.defaults.contentBackgroundColor);
                _jqFooter.css('color', MessageBox.defaults.footerColor)
                    .css('background-color', MessageBox.defaults.footerBackgroundColor);
            }
            function initButtons() {
                var _btns = _jqFooter.find(".button");
                if (_btns.length > 0) {
                    var _w = (1.0 / _btns.length).toPercent(3);
                    $.each(_btns, function (i, t) {
                        $(t).css('width', _w);
                    });
                }
            }
            function newButton(text, callback, primary) {
                var _btn = $("<button>", { class: 'button' }).text(text).click(function () {
                    if (typeof callback == 'function') {
                        if (callback() === false) {

                        }
                        else {
                            _jqBox.hide();
                        }
                    }
                    else {
                        _jqBox.hide();
                    }
                });
                if (primary) {
                    _btn.css('color', MessageBox.defaults.primaryColor)
                        .css('background-color', MessageBox.defaults.primaryBackgroundColor);
                }
                else {
                    _btn.css('color', MessageBox.defaults.footerColor)
                        .css('background-color', MessageBox.defaults.footerBackgroundColor);
                }
                return _btn;
            }
            //设置按钮样式
            //button为MessageBox.buttons中的值
            //callback返回false不会关闭对话框，不返回或返回true或其它值则会关闭对话框
            this.setButton = function (button, arrayCallbacks) {
                _jqFooter.empty();
                if (!(arrayCallbacks instanceof Array)) {
                    arrayCallbacks = [, ,];
                }
                if (arrayCallbacks.length < 3) {
                    for (var i = 2; i >= arrayCallbacks.length; i--) {
                        arrayCallbacks[i] = null;
                    }
                }
                if (button === MessageBox.buttons.Ok) {
                    _jqFooter.append(newButton("确定", arrayCallbacks[0]));
                }
                else if (button === MessageBox.buttons.OkCancel) {
                    _jqFooter.append(newButton("确定", arrayCallbacks[0]));
                    _jqFooter.append(newButton("取消", arrayCallbacks[1]));
                }
                else if (button === MessageBox.buttons.YesNo) {
                    _jqFooter.append(newButton("是", arrayCallbacks[0]));
                    _jqFooter.append(newButton("否", arrayCallbacks[1]));
                }
                else if (button === MessageBox.buttons.YesNoCancel) {
                    _jqFooter.append(newButton("是", arrayCallbacks[0]));
                    _jqFooter.append(newButton("否", arrayCallbacks[1]));
                    _jqFooter.append(newButton("取消", arrayCallbacks[2]));
                }
                else if (button === MessageBox.buttons.RetryCancel) {
                    _jqFooter.append(newButton("重试", arrayCallbacks[0]));
                    _jqFooter.append(newButton("取消", arrayCallbacks[1]));
                }
                else if (button === MessageBox.buttons.AbortRetryCancel) {
                    _jqFooter.append(newButton("停止", arrayCallbacks[0]));
                    _jqFooter.append(newButton("重试", arrayCallbacks[1]));
                    _jqFooter.append(newButton("取消", arrayCallbacks[2]));
                }
                initButtons();
                return _this;
            };
            //options
            //{first:{text:"", primary:'true',callback:function(){}},second:{text:"",callback:function(){}}}
            //最多3个button，first,second,thrid,中间不允许间隔,text为空将忽略该button,指定多个primary后面的将无效
            this.diyButton = function (options) {
                options = options || {};
                _jqFooter.empty();
                var _primarySet = false;
                if (options.first) {
                    var _button = options.first;
                    if (_button.text) {
                        var _primary = _primarySet ? false : _button.primary;
                        var _jqBtn = newButton(_button.text, _button.callback, _primary);
                        _jqFooter.append(_jqBtn);
                        _primarySet = _button.primary === true;
                    }
                }
                if (options.second) {
                    var _button = options.second;
                    if (_button.text) {
                        var _primary = _primarySet ? false : _button.primary;
                        var _jqBtn = newButton(_button.text, _button.callback, _primary);
                        _jqFooter.append(_jqBtn);
                        _primarySet = _button.primary === true;
                    }
                }
                if (options.third) {
                    var _button = options.third;
                    if (_button.text) {
                        var _primary = _primarySet ? false : _button.primary;
                        var _jqBtn = newButton(_button.text, _button.callback, _primary);
                        _jqFooter.append(_jqBtn);
                        _primarySet = _button.primary === true;
                    }
                }
                initButtons();
                return _this;
            }
            //设置标题
            this.setTitle = function (title) {
                _jqTitle.text(title);
                return _this;
            };
            //设置消息
            this.setMessage = function (msg) {
                _jqContent.text(msg);
                return _this;
            }
            //html
            //html元素或jquery对象
            this.setHtml = function (html) {
                _jqContent.empty();
                _jqContent.append(_html);
            }
            //options
            //
            this.show = function (options) {
                _jqBox.fadeIn();
            }
            this.hide = function (options) {
                _jqBox.hide();
            }
            this.remove = function () {
                _jqBox.remove();
            }
        }

        MessageBox.buttons = {
            Ok: 1,
            OkCancel: 2,
            YesNo: 3,
            YesNoCancel: 4,
            RetryCancel: 5,
            AbortRetryCancel: 6
        };
        MessageBox.defaults = {
            title: document.title || "温馨提示",
            message: '',
            button: 1,
            titleColor: 'red',
            titleBackgroundColor: 'gray',
            contentColor: 'purple',
            contentBackgroundColor: 'whitesmoke',
            footerColor: 'white',
            footerBackgroundColor: 'green',
            primaryColor: 'whitesmoke',
            primaryBackgroundColor: 'pink',
        };
        MessageBox.show = function (options) {
            var _msgbox = new MessageBox(options);
            _msgbox.show();
            return _msgbox;
        };
        return MessageBox;
    })();
    var _NoticeBox = (function () {
        function NoticeBox(options) {
            options = $.extend({}, NoticeBox.defaults, options);
            var _this = this;
            var _boxid = $.utils.Guid.new().toString("N");
            var _html = "<div class='notice-box' id='" + _boxid + "'><div class='content'><div class='body'><p class='text'></p></div></div></div>";
            var _jqBox = $("body").append(_html).find("#" + _boxid);
            var _jqNotice = _jqBox.find(".content>.body>.text");
            _jqNotice.text(options.notice);

            this.fadeIn = function (duration, timeout) {
                duration = duration || options.duration || 500;
                timeout = timeout || options.timeout || 2000;
                _jqBox.fadeIn(duration, function () { setTimeout(function () { _this.fadeRemove(); }, timeout); });
            }

            this.fadeRemove = function () {
                _jqBox.fadeOut(500, function () { _jqBox.remove(); });
            }
        }
        NoticeBox.defaults = {
            notice: '',
            duration: 500,
            timeout: 2000
        };
        NoticeBox.show = function (options) {
            var _box = new NoticeBox(options);
            _box.fadeIn();
            return _box;
        };
        return NoticeBox;
    })();
    var _ProgressMessageBox = (function () {
        function ProgressMessageBox(options) {
            options = $.extend({}, ProgressMessageBox.defaults, options);
            var _this = this;
            var _boxid = $.utils.Guid.new().toString("N");
            var _html = "<div class='pmessagebox' id='" + _boxid + "'><div class='box-content' ><div class='box-body'><p class='box-message'></p></div></div ></div >";
            var _jqBox = $("body").append(_html).find("#" + _boxid);
            var _jqMsg = _jqBox.find(".box-message");
            var _timeout;
            _jqMsg.text(options.message);
            this.visible = function () {
                return _jqBox.is(":visible");
            }
            this.hide = function () {
                _jqBox.hide();
            }
            this.show = function (timeout) {
                _jqBox.show();
                timeout = parseInt(timeout) || options.timeout;
                if (timeout && timeout > 0) {
                    if (_timeout) {
                        clearTimeout(_timeout);
                        _timeout = null;
                    }
                    _timeout = setTimeout(function () { _jqBox.hide(); _timeout = null; }, timeout);
                }
            }
            this.fadeOut = function (doration) {
                _jqBox.fadeOut(doration);
            }
            this.fadeIn = function (doration) {
                _jqBox.fadeIn(duration);
            };
            this.setMessage = function (msg) {
                _jqMsg.text(msg);
            }
        }
        ProgressMessageBox.defaults = {
            timeout: 0,
            message: "正在处理，请稍后....",
        };
        ProgressMessageBox.show = function (options) {
            var _box = new ProgressMessageBox(options);
            _box.show();
            return _box;
        };
        return ProgressMessageBox;
    })();
    var _PicViewer = (function () {
        function PicViewer() {
            var _this = this;
            var _boxid = $.utils.Guid.new().toString("N");
            var _html = "<div class='picviewer' id='" + _boxid + "'><div class='picbody'><span class='glyphicon glyphicon-chevron-left'></span><span class='glyphicon glyphicon-chevron-right'></span><span class='glyphicon glyphicon-remove'></span></div></div>";
            var _jqBox = $("body").append(_html).find("#" + _boxid);
            var _jqPicbody = _jqBox.find(".picbody");
            var _jqPrep = _jqBox.find(".glyphicon-chevron-left");
            var _jqNext = _jqBox.find(".glyphicon-chevron-right");
            var _jqClose = _jqBox.find(".glyphicon-remove");
            var _pics;

            _jqPrep.click(function () { _this.prep(); });
            _jqNext.click(function () { _this.next(); });
            _jqClose.click(function () { _this.hide(); });

            // 重置或初始化查看器图片列表(路径集合，当前图片索引)
            this.init = function (arrayUrls, index) {
                if (!(arrayUrls instanceof Array)) {
                    arrayUrls = [];
                }
                _pics = arrayUrls;
                index = index || parseInt(index);
                index = index || 0;
                if (index > _pics.length - 1) {
                    index = _pics.length - 1;
                }
                else if (index < 0) {
                    index = 0;
                }
                _jqPicbody.find("img").remove();
                for (var i = 0; i < _pics.length; i++) {
                    var _x = $("<img>").addClass("pic").attr("src", _pics[i]).appendTo(_jqPicbody);
                    if (i == index) {
                        _x.css("display", "table");
                    }
                }
                setState(_pics.length, index);
                return _this;
            }

            this.next = function () {
                if (_pics && _pics.length > 1) {
                    var _src = _jqPicbody.find("img").filter(":visible");
                    var _index = _pics.indexOf(_src.attr("src"));
                    if (_index == -1 || _index == _pics.length - 1) {
                        return;
                    }
                    _index++;
                    var _target = _jqPicbody.find("img").filter("[src='" + _pics[_index] + "']");
                    _src.hide();
                    _target.show();
                    setState(_pics.length, _index);
                }
            }

            this.prep = function () {
                if (_pics && _pics.length > 1) {
                    var _src = _jqPicbody.find("img").filter(":visible");
                    var _index = _pics.indexOf(_src.attr("src"));
                    if (_index == -1 || _index == 0) {
                        return;
                    }
                    _index--;
                    var _target = _jqPicbody.find("img").filter("[src='" + _pics[_index] + "']");
                    _src.hide();
                    _target.show();
                    setState(_pics.length, _index);
                }
            }

            this.show = function () {
                _jqBox.fadeIn();
                return _this;
            }

            this.hide = function () {
                _jqBox.hide();
                return _this;
            }

            this.close = function () {
                _jqBox.remove();
                return _this;
            }

            function setState(count, index) {
                if (index < 1) {
                    _jqPrep.addClass("chevron-deactivated");
                }
                else {
                    _jqPrep.removeClass("chevron-deactivated");
                }
                if (index >= count - 1) {
                    _jqNext.addClass("chevron-deactivated");
                }
                else {
                    _jqNext.removeClass("chevron-deactivated");
                }

            }
        }
        return PicViewer;
    })();

    if (!$.utils.dialog) $.utils.dialogs = {};
    $.extend($.utils.dialogs,
        {
            MessageBox: _MessageBox,
            NoticeBox: _NoticeBox,
            ProgressMessageBox: _ProgressMessageBox,
            PicViewer: _PicViewer,
        });
})(jQuery);