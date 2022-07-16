//拼接完整的url路径

$(function() {

    $.ajaxPrefilter( function(option) {
        option.url = 'http://www.liulongbin.top:3007' + option.url
        
    })
})