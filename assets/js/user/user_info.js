$(function() {
    layui.form.verify({
        // 为layui添加校验规则
        nickname: [/^\S{6,12}$/, '昵称必须是在6-12个字符之间!']
    });

    // 加载用户基本信息
    initUserInfo()
})

// 初始化用户的基本信息
function initUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                return layui.msg('获取用户信息失败')
            }
            // 调用 form.val() 快速为表单赋值
            layui.form.val('formUserInfo', res.data)
        }
    })

}

// 重置表单的数据
$('#btnReaet').on('click', function(e) {
    // 阻止默认行为
    e.preventDefault();
    initUserInfo();
})

// 监听表单的提交事件
$('.layui-form').on('submit', function(e) {
    // 阻断表单提交
    e.preventDefault()
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }

            // 如果没有出错，则通过 window.top 或 window.parent 来调用
            // 父页面的方法
            layui.layer.msg(res.message);
            window.top.getUserInfo()
        }
    })
})