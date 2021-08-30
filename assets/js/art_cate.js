$(function () {

    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {

        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)


            }
        })

    }

    //为添加类别绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {

        indexAdd = layer.open({

            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })


    })


    //通过代理的形式 为 form-add 表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {

        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('类别添加失败！')
                }


                initArtCateList()
                layer.msg('类别添加成功！')
                layer.close(indexAdd)


            }
        })

    })

    //代理方式绑定btn edit 按钮绑定点击事件

    var indexEdit = null

    $('tbody').on('click', '.btn-edit', function () {

        //弹出修改文章分类信息的层



        indexEdit = layer.open({

            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        console.log(id)

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {

                form.val('form-edit', res.data)

            }
        })


    })


    //代理方式绑定btn edit 按钮绑定submit事件

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类数据失败')
                }

                layer.msg('分类数据修改成功！')
                layer.close(indexEdit)
                initArtCateList()

            }
        })
    })

    //通过代理 为删除 按钮绑定点击事件

    $('tbody').on('click', '.btn-delete', function () {

        var id = $(this).attr('data-id')
        //提示用户确认删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }

                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })


        })
    })

})
