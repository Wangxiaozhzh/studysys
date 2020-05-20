// 教师管理
const teaCon = require('../app/controller/teacher');
const teaRouter = {
    name:'/teacher', //命名空间
    routes:[
        {methods:'post',path:"/teaLogin",realize:teaCon.login}, //教师登录 
        {methods:'get',path:'/systemUserInfo',realize:teaCon.systemUserInfo},//获取当前用户的信息
        {methods:'get',path:'/getAllTeacher',realize:teaCon.getAllTeacher},//获取教师列表
        {methods:'get',path:'/logOut',realize:teaCon.logOut}, //教师退出登录
        {methods:'post',path:'/addTeacher',realize:teaCon.addTeacher}, //新增教师账号
        {methods:'get',path:'/deleteTeaById',realize:teaCon.deleteTeaById},//通过id删除教师账号       
        {methods:'post',path:'/updateTeacher',realize:teaCon.updateTeacher},//通过id更新教师name   
        {methods:'post',path:'/editPassword',realize:teaCon.editPassword},//修改老师密码   

    ]
}
module.exports = teaRouter;