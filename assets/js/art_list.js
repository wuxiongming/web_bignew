$(function () {
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage;

    //定义美化事件的过滤器
    template.defaults.imports.dataFormat = function (date) {

        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }

    //定义 补零的函数

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }




    //定义一个查询的参数对象，将来请求数据的是 
    //需要将请求参数对象提交到服务器

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()
    initCate()


    //获取文章列表数据的函数
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // 调用渲染分页的方法
                renderPage(res.total)

            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染到html中
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //为form-search绑定submit事件
    $('#form-search').on('submit', function (e) {

        e.preventDefault()
        //获取表单中选中的项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        //为查询参数对象q 中对于属性赋值

        q.cate_id = cate_id
        q.state = state

        //根据最新的筛选条件 重新渲染表格

        initTable()



    })

    //定义渲染分页方法
    function renderPage(total) {

        laypage.render({
            elem: 'pageBox',//分页的容器ID
            count: total,//总数条数
            limit: q.pagesize,//每页几条数据
            curr: q.pagenum,//设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //分页发生是的回调函数
            jump: function (obj, frist) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //跟进最新的q 获取数据 渲染列表数据
                if (!frist) {
                    initTable()
                }
            }
        })


    }

})