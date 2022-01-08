$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname:function(value) {
            if(value.length > 6){
               return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                console.log(res);
                // $('#username').val(res.data.username)
                // $('#nickname').val(res.data.nickname)
                // $('#email').val(res.data.email)

                // 另一个方法↓↓↓↓↓↓↓↓↓↓↓↓↓↓

                // 调用form.val() 快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置按钮
    $('#btnReset').on('click',function(e) {
        // 组织表单的默认重置行为
        e.preventDefault();
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        
        // console.log($(this).serialize());
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')


                // 调用父页面的重新修改用户信息,渲染用户信息用到window.parent也以调用父页面的方法
                
                window.parent.getUserInfo()
            }
        })
    })
})