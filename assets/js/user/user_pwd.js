$(function() {
    // 添加表单验证规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位,且不能有空格!'],
        samePwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一样';
            }
        },
        confirmPwd: function(value) {
            if (value != $('[name=newPwd]').val()) {
                return '确认密码和新密码不一样!'
            }
        }
    })

    // 为表单添加提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // alert(11)
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                // 如果成功，则清空 token 并跳转到login.html
                layui.layer.msg(res.message, {
                    icon: 1,
                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                }, function() {
                    localStorage.removeItem('token');
                    window.top.location = '/login.html'
                });
            }
        })
    })
})