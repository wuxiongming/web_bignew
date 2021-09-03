$(function () {

  var layer = layui.layer
  var form = layui.form
  // 初始化文章分类下拉
  initCate()
  // 初始化编辑器
  initEditor()

  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')

        }

        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }

    })
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 绑定选择封面按钮事件
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })

  // 监听cowerFile的change事件，获取用户选择的文件列表
  $('#coverFile').on('change', function (e) {
    // 获取文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了数据
    if (files.length === 0) {
      return
    }
    // 
    var newImgURL = URL.createObjectURL(files[0])

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })

  // 定义文章的发布状态
  var art_state = '已发布'

  // 为存为草稿按钮，绑定点击事件处理函数
  $('#btnSeve2').on('click', function () {
    art_state = '草稿'
  })


  // 为表单绑定 submit 提交事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    // 基于form表单 快速创建一个FormData对象
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)
    // 裁剪后的图片输出为图片文件
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        fd.append('cover_img', blob)

        publishArticle(fd)
      })


  })

  // 定义一个发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')

        location.href = '/article/art_list.html'

      }


    })
  }

})