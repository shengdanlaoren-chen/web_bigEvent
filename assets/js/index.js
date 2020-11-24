$(function() {
    getUserInfo();
    // 调用 getUserInfo获取用户基本信息
    $('#btnLogout').on('click', function() {
        layui.layer.confirm('您确定要退出登录吗?', { icon: 3, title: '提示' }, function(index) {
            // 删除localStorage 中的 token 值
            localStorage.removeItem('token');
            //跳转到login.html
            location.href = 'login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data);

        }
    })
}

function renderAvatar(user) {
    // 获取用户名（昵称/用户名）
    var name = user.nickname || user.username;
    // 设置给 welcome span标签
    $('#welcome').html('欢迎&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic != null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 隐藏文字头像
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        // console.log(first);
        $('.text-avater').text(first).show();
    }
}