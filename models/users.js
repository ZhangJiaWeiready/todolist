//用来创建模型对象
//引入mongoose
var mongoose = require('mongoose')
//创建Schema
var Schema = mongoose.Schema
//创建约束对象
/*
约束条件：
  约束属性的数据类型
  再存入数据库时会做类型转化
 */
var usersSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: String
}, {
  versionKey: false
})
//创建模型
var User = mongoose.model('users', usersSchema)
//暴露User出去
module.exports = User;