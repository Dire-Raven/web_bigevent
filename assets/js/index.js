$(function () {
    //调用 getUserInfo()获取用户的基本信息
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log(123);
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1，清空本地存储的token
            localStorage.removeItem('token');
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        
    })
}
//渲染头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染头像
    if (user.user_pic !== null) {
        // 图片渲染
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //文字渲染
        $('.layui-nav-img').hide()
        // toUpperCase()方法转换成大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}