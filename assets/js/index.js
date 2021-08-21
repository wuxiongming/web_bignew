$(function () {

    //调用函数获取信息

    getUserInfo()

    var laye = layui.layer

    $('#btnLogout').on('click', function () {

        layer.confirm('是否退出系统?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //退出时清空本地存储的token
            localStorage.removeItem('token')

            //重新跳转到登录页面

            location.href = '/login.html'


            //关闭询问框
            layer.close(index);
        });
    })




})

//获取用户基本信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        //请求头匹配对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''

        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败！')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)

        },

        // complete: function (res) {

        //     // console.log('执行complete回调')
        //     // console.log(res)

        //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {

        //         localStorage.removeItem('token')

        //         //重新跳转到登录页面

        //         location.href = '/login.html'
        //     }



        // }
    })

}

function renderAvatar(user) {
    var name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //渲染图片头像
    if (user.user_pic !== null) {

        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avattar').hide()

    } else {
        $('.layui-nav-img').hide()

        var first = name[0].toUpperCase()

        $('.text-avatar').html(first).show()

    }
}