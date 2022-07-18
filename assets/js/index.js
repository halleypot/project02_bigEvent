$(function () {

    //get layer object from lay ui
    let layer = layui.layer

    // get user's info
    getUserInfo()

    // log out
    $('#btnLogout').click(function () {

        // 提示用户是否退出
        layer.confirm('Confirm to Exit?', { icon: 3, title: 'Tip' }, function (index) {
            //do something
            // remove token and relocate
            localStorage.removeItem('token')

            return location.href = '/login.html'

            // close tip box
            layer.close(index);
        });

    })
})

//渲染头像
function renderAvatar(data) {

    // get nickname or username
    let name = data.nickname || data.username

    // set welcome to @param name
    $('#welcome').html('welcome &nbsp;&nbsp;' + name)
    //如果用户上传过头像
    if (data.user_pic) {
        //配置用户头像，并显示
        $('.layui-nav-img').attr('src', data.user_pic).show()

        //隐藏文字头像
        $('.text-avatar').hide()
    } else {
        //如果没有，就采用用户名第一个字符
        $('.text-avatar').html(name[0].toUpperCase()).show()

        $('.layui-nav-img').hide()
    }


}

// get user's info
function getUserInfo() {

    //get user information
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message || '获取用户失败')
                // remove token and relocate
                // localStorage.removeItem('token')

                // return location.href = '15_大事件案例/home/login.html'
            }

            //渲染用户头像
            renderAvatar(res.data)
        },
        // 无论登录成功或失败，都要进入complete函数
        complete: function(res) {
            console.log(res);
        }
    })
}
