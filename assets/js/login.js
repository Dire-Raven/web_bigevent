$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    // 从layui获取form地对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义一个pwd的检验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位,且不能出现空格'],

        repwd: function (value) {
            // value 获得的是确认密码的值
            var pwd = $('#password').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }

    })


    // 监听注册提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username:$('#regusername').val(),password:$('#form-reg [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',data,function(res) {
            
            if(res.status !=0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功!');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })


    // 监听登录
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功!')
                // console.log(res.token);
                
                
                //酱res获得的token权限字符保存到localstorage中
                localStorage.setItem('token',res.token)
                
                
                //跳转到主页
                location.href = './index.html'
            }
        })
    })
})


