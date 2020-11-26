// 为页面上所有基于 jq的ajax请求发送之前 对参数对象做处理
$.ajaxPrefilter(function(ajaxOpt) {
    // console.log(ajaxOpt);
    // 拼接基地址
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;
    // 统一为有权限的接口设置headers请求头
    if (ajaxOpt.url.indexOf('/my/') > -1) {
        ajaxOpt.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    // 全局统一挂载 complete 回调函数
    ajaxOpt.complete = function(res) {
        console.log(res);
        console.log(res.responseJSON);
        // 判断返回的数据是否在提醒我们 没有登录
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 没有登录 则
            layer.msg(res.responseJSON.message, {
                icon: 1,
                time: 1500
            }, function() {

                // 清空token
                localStorage.removeItem('token');
                // 跳转到login.html页面
                location.href = "/login.html";
            });


        }
    }
})

// 使用 ajaxPrefilter 的目的就是统一在 发送 ajsx请求之前，来执行一些准备工作
// 比如：为url添加基地址
// 对请求报文做处理