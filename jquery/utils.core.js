if (!$.utils) $.utils = {};
// utils.core 仅依赖jquery，如果引用此jquery之前未引用jquery，本js将自动引用最新版jquery
// utils.core 是其他utils的核心库，引用其他utils将会自动引用utils.core
// Date
// .format
// Array
// .hasRepeat
// Number
// .toPercent
(function () {
    //判断数组是否有重复值
    Array.prototype.hasRepeat = function () {
        var has = {};
        for (var i in this) {
            if (has[this[i]])
                return true;
            has[this[i]] = true;
        }
        return false;
    };
    // 对Date的扩展，将 Date 转化为指定格式的String   
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
    // 例子：   
    // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份   
            "d+": this.getDate(), //日   
            "h+": this.getHours(), //小时   
            "m+": this.getMinutes(), //分   
            "s+": this.getSeconds(), //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Date.formatSeconds = function (value) {
        var theTime = parseInt(value); // 秒 
        var theTime1 = 0; // 分 
        var theTime2 = 0; // 小时 
        // alert(theTime); 
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60); //m
            theTime = parseInt(theTime % 60); //s
            // alert(theTime1+"-"+theTime); 
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60); //h
                theTime1 = parseInt(theTime1 % 60); //m
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    };
    //将数字转为百分数
    Number.prototype.toPercent = function (fractionDigits) {
        return (this * 100.0).toFixed(fractionDigits) + '%';
    };
})();

// 表示全局唯一标识符 (GUID)
// $.utils
// .Guid
(function ($) {
    var _Guid = (function () {
        function Guid(guidString) {
            var arr = []; //存放32位数值的数组
            if (typeof (guidString) == "string") { //如果构造函数的参数为字符串
                initByString(arr, guidString);
            } else if (guidString == null || guidString == undefined) {
                guidString = "";
                var i = 32;
                while (i--) {
                    guidString += Math.floor(Math.random() * 16.0).toString(16);
                }
                initByString(arr, guidString);
            } else {
                throw '传入的参数必须为STRING、NULL、UNDEFINED';
            }
            // 返回 Guid 类的此实例值的 String 表示形式。
            this.toString = function (format) {
                if (typeof (format) == "string") {
                    if (format == "N" || format == "D" || format == "B" || format == "P") {
                        return toStringWithFormat(arr, format);
                    } else {
                        return toStringWithFormat(arr, "D");
                    }
                } else {
                    return toStringWithFormat(arr, "D");
                }
            };
        }
        //由字符串加载
        function initByString(arr, g) {
            g = g.replace(/\{|\(|\)|\}|-/g, "");
            g = g.toLowerCase();
            if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
                throw '传入的Guid字符串不是合法的';
            } else {
                for (var i = 0; i < g.length; i++) {
                    arr.push(g[i]);
                }
            }
        }
        /*
        根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
        N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
        P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
        */
        function toStringWithFormat(arr, format) {
            var str;
            switch (format) {
                case "N":
                    return arr.toString().replace(/,/g, "");
                case "D":
                    str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                    str = str.replace(/,/g, "");
                    return str;
                case "B":
                    str = toStringWithFormat(arr, "D");
                    str = "{" + str + "}";
                    return str;
                case "P":
                    str = toStringWithFormat(arr, "D");
                    str = "(" + str + ")";
                    return str;
                default:
                    return new Guid();
            }
        }
        // 返回一个bool值，该值指示 Guid 的两个实例是否表示同一个值。
        Guid.prototype.equals = function (o) {
            if (o && Guid.is(o)) {
                return this.toString() == o.toString();
            } else {
                return false;
            }
        };

        //创建一个新的Guid
        Guid.new = function () {
            return new Guid();
        };
        //将Guid字符串转为Guid
        Guid.parse = function (guidString) {
            return new Guid(guidString);
        };
        //判断一个对象是不是Guid对象
        Guid.is = function (obj) {
            if (typeof obj == 'object' && obj instanceof Guid) {
                return true;
            } else {
                return false;
            }
        };
        //判断一个对象是不是Guid字符串
        Guid.isGString = function (obj) {
            if (typeof obj == 'string') {
                try {
                    var _g = new Guid(obj);
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return false;
        };
        return Guid;
    })();
    $.extend($.utils, {
        Guid: _Guid
    });
})(jQuery);

// Path
(function($){
    function Path(){}
    Path.getFileName = function(path){
        if(typeof path == typeof ""){
            var _index = path.lastIndexOf("/");
            if(_index == -1){
                return "";
            }
            else{
                var _name = path.substr(_index + 1);
                _index = _name.indexOf("?");
                if(_index > -1){
                    return _name.substr(0, _index);
                }
                else{
                    return _name;
                }
            }
        }else{
            return "";
        }
    };
    Path.getDirectoryName =function(path){
        if(typeof path == typeof ""){
            path = path.trim();
            var _index = path.lastIndexOf("/");
            if(_index< 0)
            {return path;}
            else{
                return path.substr(0, _index);
            }
        }
        else{
            return "";
        }
    };
    Path.getRoot = function(path){
        if(typeof path == typeof ""){
            path = path.trim();
            var _index = path.indexOf("/");
            if(_index < 0){
                return path;
            }else{
                return path.substr(0, _index);
            }
        }else{
            return "";
        }
    };
    Path.getFileNameWithoutExtension = function (path) {
        var _name = Path.getFileName(path);
        var _dot = _name.lastIndexOf(".");
        if (_dot < 0) {
            return path;
        } else {
            return _name.substr(0, _dot);
        }
    };
    $.extend($.utils, {Path : Path});
})(jQuery);

// Environment
(function ($) {
    var _e = function () {};
    var _regVer = ".*?([\d.]+)";
    function _Script(fullName) {
        this.fullName = fullName;
        this.directory = $.utils.Path.getDirectoryName(fullName);
        this.name = $.utils.Path.getFileName(fullName);
    };
    _Script.prototype.loadCss = function () {
        var _this = this;
        var _css = document.createElement("link");
        var _cssPath = `${$.utils.Path.getDirectoryName(_this.directory)}/css/${$.utils.Path.getFileNameWithoutExtension(_this.fullName)}.css`;
        _css.setAttribute("type", "text/css");
        _css.setAttribute("rel", "stylesheet");
        _css.setAttribute("href", _cssPath);
        document.getElementsByTagName("head")[0].appendChild(_css);
    };
    _e.isDesktop = function () {
        return !_e.isMobile();
    };
    _e.isMobile = function () {
        return _e.isAndroid() || _e.isIos();
    };
    _e.isWindows = function () {
        return (navigator.platform == "Win32") || (navigator.platform == "Windows");
    };
    _e.isMac = function(){
       return (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    };
    _e.isLinux = function(){
        return  (String(navigator.platform).indexOf("Linux") > -1);
    };
    _e.isAndroid = function () {
        return window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1;
    };
    _e.isIos = function () {
        return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    _e.isWebkit = function(){
        return u.indexOf('AppleWebKit') > -1;
    };
    _e.isIphone = function(){
        return window.navigator.userAgent.indexOf('iPhone') > -1;
    };
    _e.isIpad = function(){
        return window.navigator.userAgent.indexOf('iPad') > -1;
    };
    _e.isEdge=function(){
        return window.navigator.userAgent.indexOf('Edge') > -1;
    };
    _e.isChrome = function () {
        return window.navigator.userAgent.indexOf("Chrome") !== -1 && !_e.isEdge() && !_e.isOpera();
    };
    _e.isFireFox = function () {
        return window.navigator.userAgent.indexOf("Firefox") !== -1;
    };
    _e.isIe = function () {
        return window.navigator.userAgent.indexOf("MSIE") > -1 || !!window.ActiveXObject || "ActiveXObject" in window;
    };
    _e.isSafari = function () {
        return window.navigator.userAgent.indexOf("Safari") !== -1 && !_e.isChrome() && !_e.isEdge();
    };
    _e.isOpera = function () {
        return window.navigator.userAgent.indexOf("Opera") !== -1 || window.navigator.userAgent.indexOf("OPR") !== -1;
    };
    _e.isWechat = function () {
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
    };
    _e.getBrowserVersion = function () {
        if(_e.isEdge()){
            return window.navigator.userAgent.match(/edge\/([\d.]+)/i)[1];
        }
        else if(_e.isChrome()){
            return window.navigator.userAgent.match(/chrome\/([\d.]+)/i)[1];
        }
        else if (_e.isFireFox()){
            return window.navigator.userAgent.match(/firefox\/([\d.]+)/i)[1];
        }
        else if(_e.isIe()){
            if(window.navigator.userAgent.indexOf("MSIE") > -1){
                return window.navigator.userAgent.match(/msie([\d.]+)/i)[1];
            }
            else{
                return window.navigator.userAgent.match(/rv\:([\d.]+)/i)[1];
            }
        }
        else if(_e.isOpera()){
            if(window.navigator.userAgent.indexOf("opera") > -1){
                return window.navigator.userAgent.match(/opera\/([\d.]+)/i)[1];
            }
            else{
                return window.navigator.userAgent.match(/opr\/([\d.]+)/i)[1];
            }
        }
        else if(_e.isSafari()){
            return window.navigator.userAgent.match(/safari\/([\d.]+)/i)[1];
        }
        else{
            return window.navigator.appVersion;
        }
    };
    _e.getCallingScript = function () {
        var _p = "",
            _dir = "";
        if (_e.isChrome() || _e.isFireFox()) {
            _p = document.currentScript.src;
        } else if ((_e.isIe() && !_e.isLt(10)) ||
            t.isSafari() ||
            (t.isOpera() && !_e.isLt(10))) {
            var a = {},
                stack;
            try {
                a.b();
            } catch (e) {
                stack = e.stack || e.sourceURL || e.stacktrace;
            }
            var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
                absPath = rExtractUri.exec(stack);
            _p = absPath[0] || '';
        } else if(_e.isIe() && _e.isLt(10)){
            var _scripts = document.scripts;
            var _isLt8 = ('' + document.querySelector).indexOf('[native code]') === -1;
            for (var i = _scripts.length - 1, script; (script = _scripts[i--]); ) {
                if (script.readyState === 'interative') {
                    _p = _isLt8 ? script.getAttribute('src', 4) : script.src;
                    break;
                }
            }
        }
        if (!_p) {
            //如果是在文件中调用则会返回src
            //若果在<script>标签中调用src一般为空
            _p = document.getElementsByTagName('script')[document.getElementsByTagName('script').length -1].src;
        }
        return new _Script( _p );
    };
    //判断浏览器版本是否小于指定的版本，
    //ver：1.0、2、59.1、11等，number类型
    _e.isLt = function(ver){
        if(typeof ver !== typeof 0)
        {
            throw "参数类型错误，ver必须为Number类型的正数";
        }
        else{
            var _verb = _e.getBrowserVersion();
            if(_verb){
                return parseFloat(_verb) < ver;
            }
            else{
                return false;
            }
        }
    };
    //options{css:false,}
    _e.initMe = function (options) {
        options = options || {};
        if (typeof options.css == typeof false && options.css) {
            var _script = _e.getCallingScript();
            _script.loadCss();
        }
    }
    $.extend($.utils, {
        Environment: _e,
        Env: _e
    });
})(jQuery);