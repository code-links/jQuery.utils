
(function($){
    function Regex(){
        return true;
    }
    Regex.isUrl = function(){
        return true;
    };
    Regex.isEmail = function(){
        return true;
    };
    Regex.isHttp = function(){
        return true;
    };
    Regex.isHttps = function(){
        return true;
    };
    $.extent($.utils, {Regex : Regex});
})(jQuery);