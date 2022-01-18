// 每次调用 ajax post get 时都会调用这个函数
//在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url



    // 同意为有权限的借口，设置headers请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    

    // 全局统一挂载 complete  回调函数
    options.complete = function (res) {
        // console.log('执行了complete');
        // console.log(res);
        // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        // console.log(res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
            // 1 强制清空token 
            localStorage.removeItem('token')
            // 2 强制跳转到登录页
            location.href = '/login.html'
        }
    }
})