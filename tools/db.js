//连接数据库
//引入mongoose
var mongoose = require('mongoose')
//连接mongoDB数据库
mongoose.connect('mongodb://localhost:27017/todolist')
//绑定open事件监听
mongoose.connection.on('open', function () {
  console.log('数据库连接成功了')
})