$(function () {

    var form = layui.form

    var layer = layui.layer

    form.verify({

        nickname: function (value) {
            if (value.length > 6) {

                return '昵称长度必须在1 ~ 6之间'

            }

        }
    })


    initUserInfo()

    function initUserInfo() {

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                console.log(res)

                //调用form.val() 快速赋值
                form.val('formUserInfo', res.data)

            }
        })

    }

    $('#btnReset').on('click', function (e) {

        e.preventDefault()
        initUserInfo()
    })

    //监听表单事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户数据失败！')

                }
                layer.msg('更新用户数据成功！')

                window.parent.getUserInfo()
            }
        })

    })

})