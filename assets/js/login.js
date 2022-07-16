$(function () {
    // swtich login and register box
    $('#signUp').on('click', function () {
        // console.log(111);
        $('.log-box').hide()
        $('.reg-box').show()
    })

    $('#signIn').on('click', function () {
        $('.reg-box').hide()
        $('.log-box').show()
    })


// form validation
let form = layui.form

form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repass: function (value) {
        let pass = $('.reg-box [name=password]').val()
        if (value !== pass) {
            return "two password must be the same"
        }
    }
    })


    // create layer object
    let layer = layui.layer

    //注册会员 submit a form
    $('#form-register').on('submit', function (e) {
        e.preventDefault()

        let data = $(this).serialize()

        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // if registration passed, tip user and swtich to login page
                layer.msg(res.message)
                //go to login page
                $('#signIn').click()
            })

    })


    // 登录页面
    $('#form-login').submit( function(e) {
        e.preventDefault()
        
        let data = $(this).serialize()

        $.post('/api/login', data, function(res) {
            // if failed to log in
            if(res.status !== 0) {
               return layer.msg(res.message)
            }

            // if log in succesfully
            layer.msg(res.message)
            //store token
            console.log(res.token);
            localStorage.setItem('token', res.token)
            // goto index page
            location.href = '/15_大事件案例/home/index.html'
        })

})


// 登录验证
$('#form-login').on('submit', function(e) {
    e.preventDefault()

    let data = $(this).serialize()

    $.post('/api/login',data, function(res) {
        //if wrong username or password
        if (res.status !== 0) {

            return layer.msg(res.message)
        }

        //if log in successfully
        layer.msg(res.message)
        //store token in localStorage
        localStorage.setItem('token', res.token)

        location.href ='/15_大事件案例/home/index.html'
    })
})

})