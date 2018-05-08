var express = require("express");
require("./tools/db");
var  user = require("./models/users");
var sha1 = require("sha1");
user.create({
    username:"admin",
    password:sha1("123456"),
    email:"admin@admin"
},function (err) {
    if(!err){
        console.log("默认插入成功")
    }
});

var app = express();
var userFaceRouter = require("./router/userFaceRouter");
var registRouter = require("./router/registRouter");
app.set("view engine","ejs");
//设置静态资源目录
app.set("views","./views");

//设置静态资源
app.use(express.static("public"));
//必须写在public后面
app.use(userFaceRouter);
app.use(registRouter);



//注意 必须在app上 不能在路由器上  会截停  输入错误就返回404
app.use(function (req, res) {
    res.render("404")
});

app.listen(8000,function () {
    console.log("服务器连接成功")
})