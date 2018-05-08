
//入口服务器

var express = require("express");
var router = express.Router();
//中间件用来复用代码
router.use(function (req, res,next) {
    res.locals.username="";
    var cookie = req.headers.cookie.split(";");
    res.locals.username = cookie[cookie.length-1].split("=")[1];
    //必须调用next
    next();
})

//配置路由器
router.get("/login",function (req, res, next) {
    //为了防止首次进入的时候报错所以直接写一个空对象
    //每次登录的时候清除cookie
    //如果有 name值重定向到itemlist
    //没有值 重新渲染login
    if(res.locals.username){
        res.redirect("/itemlist")
    }else{
        res.render("login",{errMsg:{}})
    }

});
router.get("/itemList",function (req, res, next) {
    //通过split将 username= admin 拆分成两边 成为一个数组
    if(res.locals.username){
        res.render("item_list",{username:res.locals.username})
    }else{
        res.redirect("/login")
    }

});
router.get("/regist",function (req, res, next) {
    res.render("regist",{errMsg:{}});
});
router.get("/logout",function (req, res) {
    res.clearCookie("username");
    //重新渲染的只是文件名称不带路径
    res.redirect('/login')
})
module.exports=router;