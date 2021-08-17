//每次调用$.get psot ajax 的时候会先调用 ajaxPrefilter 这个函数

$.ajaxPrefilter(function (options) {

    console.log(options.url)

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    console.log(options.url)

    //http://api-breakingnews-web.itheima.net


})