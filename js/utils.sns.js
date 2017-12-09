// 分享
// $.utils.sns
// .Sharing
(function ($) {
    var _Sharing = (function () {
        //2.分享到新浪微博
        //appkey为必填参数。
        //详情请参考：http://open.weibo.com/wiki/ShareCode
        //代码如下：
        function toWeibo(options) {
            options = $.extend({}, this.options, toWeibo.defaults, options || {});
            var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136';     //真实的appkey ，必选参数
            _shareUrl += '&url=' + encodeURIComponent(options.url);     //参数url设置分享的内容链接|默认当前页location，可选参数
            _shareUrl += '&title=' + encodeURIComponent(options.title);    //参数title设置分享的标题|默认当前页标题，可选参数
            _shareUrl += '&source=' + encodeURIComponent(options.src);
            _shareUrl += '&sourceUrl=' + encodeURIComponent(options.srcUrl);
            _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
            _shareUrl += '&pic=' + encodeURIComponent(options.pic);  //参数pic设置图片链接|默认为空，可选参数
            window.open(_shareUrl, '_blank', 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0,' + 'width=' + options.width + ',height=' + options.height + ',top=' + (screen.height - options.height) / 2 + ',left=' + (screen.width - options.width) / 2);
        }
        //3.分享到QQ空间
        //详情请参考：http://connect.qq.com/intro/share/
        //代码如下：
        function toQzone(options) {
            options = $.extend({}, this.options, toQzone.defaults, options || {});
            var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
            _shareUrl += 'url=' + encodeURIComponent(options.url);   //参数url设置分享的内容链接|默认当前页location
            _shareUrl += '&showcount=' + options.showcount;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
            _shareUrl += '&desc=' + encodeURIComponent(options.desc);    //参数desc设置分享的描述，可选参数
            _shareUrl += '&summary=' + encodeURIComponent(options.summary);    //参数summary设置分享摘要，可选参数
            _shareUrl += '&title=' + encodeURIComponent(options.title);    //参数title设置分享标题，可选参数
            _shareUrl += '&site=' + encodeURIComponent(options.srcUrl);   //参数site设置分享来源，可选参数
            _shareUrl += '&pics=' + encodeURIComponent(options.pic);   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
            window.open(_shareUrl, '_blank', 'width=' + options.width + ',height=' + options.height + ',top=' + (screen.height - options.height) / 2 + ',left=' + (screen.width - options.width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
        }
        //4.分享到百度贴吧
        //详情请参考：http://share.baidu.com/code/advance
        //代码如下：
        function toTieba(options) {
            options = $.extend({}, this.options, toTieba.defaults, options || {});
            var _shareUrl = 'http://tieba.baidu.com/f/commit/share/openShareApi?';
            _shareUrl += 'title=' + options.title;  //分享的标题
            _shareUrl += '&url=' + options.url;  //分享的链接
            _shareUrl += '&pic=' + options.pic;    //分享的图片
            window.open(_shareUrl, '_blank', 'width=' + options.width + ',height=' + options.height + ',left=' + (screen.width - options.width) / 2 + ',top=' + (screen.height - options.height) / 2 + ',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
        }
        //5.分享到豆瓣
        //代码如下：
        function toDouban(options) {
            options = $.extend({}, this.options, toTieba.defaults, options || {});
            var _shareUrl = 'http://shuo.douban.com/!service/share?';
            _shareUrl += 'href=' + options.url;    //分享的链接
            _shareUrl += '&name=' + options.title;    //分享的标题
            _shareUrl += '&image=' + options.pic;    //分享的图片
            window.open(_shareUrl, '_blank', 'width=' + options.width + ',height=' + options.height + ',left=' + (screen.width - options.width) / 2 + ',top=' + (screen.height - options.height) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
        }

        toWeibo.defaults = {
            src: '',
            srcUrl: '',
        };
        toQzone.defaults = {
            showcount: 0,
            desc: '分享描述',
            summary: '分享摘要',
            srcUrl: '',
        };
        toTieba.defaults = {

        };
        toDouban.defaults = {

        };

        function Sharing(options) {
            options = $.extend({}, Sharing.defaults, options || {});

            this.options = options;
            this.toWeibo = toWeibo;
            this.toQzone = toQzone;
            this.toTieba = toTieba;
            this.toDouban = toDouban;
        }
        Sharing.defaults = {
            url: window.location,
            title: document.title,
            pic: '',
            width: screen.width / 5 * 3,
            height: screen.height / 5 * 3
        };
        return Sharing;
    })();
    if (!$.utils.sns) $.utils.sns = {};
    $.extend($.utils.sns, {
        Sharing: _Sharing,
    });
})(jQuery);