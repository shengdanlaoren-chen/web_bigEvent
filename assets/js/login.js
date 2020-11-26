$(function() {
    // 点击'去注册账号'的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击'去登录'的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 从 layui中获取form对象
    var form = layui.form;
    // 通过form.verify() 函数自定义校验规则
    form.verify({
            // 自定义了一个叫做pwd的校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // value是确认密码框中的密码值
                // 通过形参拿到的是密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败 则reture一个提示消息即可

                // 获取密码框密码
                var pwd = $('.reg-box [name=password]').val();
                if (pwd != value) {
                    return '两次密码不一致!'
                }

            }
        })
        // 根路径
        // let baseUrl = 'http://ajax.frontend.itheima.net'


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault(); // 阻断表单提交的默认行为
        // 获取表单数据
        let dataStr = $(this).serialize();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: dataStr,
            success: function(res) {
                // 不管成功失败 都 显示消息
                layui.layer.msg(res.message);
                console.log(res);
                if (res.status != 0) {
                    // 注册失败
                    return
                }
                // 注册成功


                // 将用户名 密码自动 填充到 登录表单中
                let uname = $('.reg-box [name=username]').val();
                $('.login-box [name=username]').val(uname);
                let upwd = $('.reg-box [name=password]').val();
                $('.login-box [name=password]').val(upwd);
                // 清空注册表单
                $('#form_reg')[0].reset();
                // 切换到登录页面
                $('#link_login').click();
            }
        })
    })
    $('#form_login').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 异步提交到 登录接口
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    // 登录失败
                    return layui.layer.msg(res.message)
                }
                // 登陆成功
                // a. 保存 token 值到localStorage
                localStorage.setItem('token', res.token);
                layui.layer.msg(res.message, {
                    icon: 4,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    location.href = 'index.html'
                });

            }
        })
    })
})