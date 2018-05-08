var express = require("express");
var router = express.Router();
var User = require('../models/users');
var sha1 = require("sha1");
//注册路由必须是post请求
//post请求引入需要body-parser
var bodyParser = require("body-parser");
//通过中间件 应用body-parser  然后在发送请求的时候才可以获取到信息
router.use(bodyParser.urlencoded({extended:true}));
router.post("/regist",function (req, res, next) {
    //post 通过req.body来获取信息
    console.log(req.body.username);
    var username = req.body.username;
    var pwd = req.body.password;
    var pwdConfirm = req.body.passwordConfirm;
    var email = req.body.email;

    //设置正则验证
    /*
    * 用户名  长度小写大写数字 _ 5-12位
    *
    *
    *
    * */

    var userReg = /^[a-zA-Z0-9_]{5,12}$/
    var pwdReg = /^[a-zA-Z0-9_*&]{5,16}$/
    // var emailReg = /^[a-zA-Z0-9_]{3,6}@[a-z]{3,6}\.com$/
    var emailReg = /^[a-z0-9_-]{3,12}@[a-z]{0,6}\.com$/i

    //创建一个错误对象  并提供默认信息 在输入错误之后还存在
    var errMsg = {
        username:username,
        email:email

    };
    if(!userReg.test(username)){
        errMsg.userErr="用户名格式不正确，请输入长度为5~12，包含大写/小写/_"
    }
    if(!pwdReg.test(pwd)){
        errMsg.pwdErr="密码格式不正确，请输入长度为5~16，包含大写/小写/_"
    }
    if( pwd !== pwdConfirm){
        errMsg.repwdErr="两次密码输入不一致"
    }
    if(!emailReg.test(email)){
        errMsg.emailErr="邮箱格式不正确，请包含@/.com"
    }
    //哪个存在报哪个的错误
    if(errMsg.userErr||errMsg.pwdErr||errMsg.repwdErr||errMsg.emailErr){
        //当用户信息填写错误 进入此判断
        //errmsg 后面传入那个对象
        res.render("regist",{errMsg:errMsg});
        //出现错误就不会继续向下找
        return;
    }
   User.create({
       username:username,
       password:sha1(pwd),
       email:email
    //因为在设置约束条件的时候就已经规定了不能重名所以不需要加入判断
   },function (err) {
       if(!err){
           //重定向之后去了login路由
           res.redirect("/login")
       }else{
           errMsg.userErr="用户名已存在";
           res.render("regist",{errMsg:errMsg})
       }
   })


});

//登录 post路由
router.post("/login",function (req, res) {
    //确保html页面中的与之对应
    var username = req.body.username;
    var pwd = req.body.password;
    var errMsg={
        username:username
        //当输入错误的时候username里面还是刚才输入的数据

    };

    User.find({username:username},function (err, data) {
        if(!err){
            if(data[0]){

                if(data[0].password === sha1(pwd)){
                    //登录成功
                    //设置cookie 下次登录的时候会自动保存这个东西
                    //最多保存这么久
                    //每次浏览器就会知道是谁访问的因为重定向
                    res.cookie("username",username,{maxAge:10000000})
                    console.log(req.headers);
                    res.redirect("/itemlist")
                }else{
                    //没找到密码
                    errMsg.pwdErr="密码输入错误";
                    res.render("login",{errMsg:errMsg})
                }

            }else {
                //没找到用户名
                errMsg.userErr="用户名不存在";
                res.render("login",{errMsg:errMsg})
            }
        }
    })
})


module.exports=router;
