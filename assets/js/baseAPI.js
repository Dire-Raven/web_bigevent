// 每次调用 ajax post get 时都会调用这个函数
//在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})