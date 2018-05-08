//配置post
var express = require("express");
var bodyParser = require("body-parser");
app.use(express.static("public"));

var app = express();
//通过中间件来应用body——parser，然后在发送请求时才可以收到信息
app.use(bodyParser,urlencoded({extended:true}));
app.post("/pos",function (req, res, next) {
    console.log(req.body)
})
app.get("/s",function (req, res, next) {
    res.send("ok")
})
app.listen(3000,function () {
    console.log("服务器连接成功")
})