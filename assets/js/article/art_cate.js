$(function () {
    var layer = layui.layer
    var form = layui.form
    // 1获取文章分类列表
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            mathod: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 点击出弹出层

    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            title: '添加文章分类',
            area: ['400px', '250px'],
            content: $('#dialog-add').html(),
            type: 1
        })
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // console.log($(this).serialize());
        // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增分类失败!')
                }
                initArtCateList()
                layer.msg('新增分类成功!')
                layer.close(indexAdd)
            }
        })
    })
    // 通过代理形式绑定时间
    var indexEdit = null
    $('tbody').on('click','.btn-edit',function() {
        indexEdit = layer.open({
            title: '修改文章分类',
            area: ['400px', '250px'],
            content: $('#dialog-edit').html(),
            type: 1
        })


        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res){
                console.log(res);
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success : function(res){
                console.log(res);
                if(res.status == 1) {
                    return layer.msg('更新失败')
                }else{
                    layer.msg('更新成功')
                    layer.close(indexEdit)
                    initArtCateList()
                }
               
            }
        })
    })
})