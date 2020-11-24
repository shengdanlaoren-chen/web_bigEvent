// 为页面上所有基于 jq的ajax请求发送之前 对参数对象做处理
$.ajaxPrefilter(function(ajaxOpt) {
    // console.log(ajaxOpt);
    // 拼接基地址
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;
})

// 使用 ajaxPrefilter 的目的就是统一在 发送 ajsx请求之前，来执行一些准备工作
// 比如：为url添加基地址
// 对请求报文做处理