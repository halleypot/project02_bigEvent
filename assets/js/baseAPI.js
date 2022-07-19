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

        // 无论登录成功或失败，都要进入complete函数
        option.complete = function (res) {
                // console.log(res);
                if (res.responseJSON.status === 1 || res.responseJSON.message === "身份验证失败")

                    localStorage.removeItem('token')

                location.href = '/login.html'
            }
        
    })
})