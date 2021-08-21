//每次调用$.get psot ajax 的时候会先调用 ajaxPrefilter 这个函数

$.ajaxPrefilter(function (options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //为有权限的借口 设置headers 请求头

    if (options.url.indexOf('/my/') !== -1) {

        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    //全局同意挂载 comple 回调函数

    options.complete = function (res) {

        // console.log('执行complete回调')
        // console.log(res)

        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {

            localStorage.removeItem('token')

            //重新跳转到登录页面

            location.href = '/login.html'
        }



    }

})