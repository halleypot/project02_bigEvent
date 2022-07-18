//拼接完整的url路径

$(function () {

    $.ajaxPrefilter(function (option) {
        option.url = 'http://www.liulongbin.top:3007' + option.url
        // console.log(option.url);

        // set authorization for url starting at /my/
        if (option.url.indexOf('/my/') !== -1) {
            option.header = {
                Authorization: localStorage.getItem('token')
            }
        }
    })
})