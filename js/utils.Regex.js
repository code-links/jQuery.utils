
(function($){
    var _URLARRAY = [
        '^((https|http|ftp|rtsp|mms)?://)', 
        '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?', //ftp的user@ 
        '(([0-9]{1,3}.){3}[0-9]{1,3}', // IP形式的URL- 199.194.52.184 
        '|', // 允许IP和DOMAIN（域名） 
        '([0-9a-z_!~*\'()-]+.)*', // 域名- www. 
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].', // 二级域名 
        '[a-z]{2,6})', // first level domain- .com or .museum 
        '(:[0-9]{1,4})?', // 端口- :80 
        '((/?)|' ,// a slash isn't required if there is no file name 
        '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
    ];
    var _URLCORE = ("\://(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,4}(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&%\$#\=~_\-]+))*$");
    var _URL = new RegExp(_URLARRAY.join(''));
    var _HTTP = new RegExp("^http" + _URLCORE);
    var _HTTPS = new RegExp("^https" + _URLCORE);
    var _FTP = new RegExp("^ftp" + _URLCORE);
    var _DOMAIN = new RegExp("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?");
    var _EMAIL= new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
    var _IPV4 = /^[0-9.]{1,20}$/; 
    var _MOBILE = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/;
    var _TEL = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
    function Regex(){
        return true;
    }
    Regex.isUrl = function(url){
        return !!_URL.exec(url);
    };
    Regex.isEmail = function(email){
        return !!_EMAIL.exec(email);
    };
    Regex.isHttp = function(url){
        return !!_HTTP.exec(url);
    };
    Regex.isHttps = function(url){
        return !!_HTTPS.exec(url);
    };
    Regex.isFtp = function(url){
        return !!_FTP.exec(url);
    }
    Regex.isDomain = function(domain){
        return !!_DOMAIN.exec(domain);
    }
    Regex.isTel = function(tel){
        return !!_TEL.exec(tel);
    };
    Regex.isMobile = function(mobile){
        return !!_MOBILE.exec(mobile);
    };
    Regex.isIpv4 = function(ip){
        return !!_IPV4.exec(ip);
    };
    Regex.isIpv6 = function(){
        return true;
    };
    $.extend($.utils, {Regex : Regex});
})(jQuery);
