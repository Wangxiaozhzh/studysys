// 学生管理

const stuCon = require('../app/controller/student')
const StuRouter = {
    name:'/stu',//命名空间
    routes:[
        {methods:'get', path:"/allStudent", realize:stuCon.getAllstudents},    //查询所有学生信息
        {methods:'get',path:"/getStudentById",realize:stuCon.getStudentById}, //通过id获取学生信息
        {methods:'get',path:"/findAllCourseType",realize:stuCon.findAllCourseType}, //查询所有学生类型
        {methods:'post',path:'/addStudent', realize:stuCon.addStudent},        //新增学生
        {methods:'post',path:'/updateStu',  realize:stuCon.updateStu},         //更新学生信息
        {methods:'get', path:'/deleteStu',  realize:stuCon.deleteStu},         //删除学生信息
        {methods:'post',path:'/updateSPass',realize:stuCon.updateSPass},       //更新学生密码
        {methods:'get', path:'/getActiveStu',realize:stuCon.getActiveStu},     //获取最近活跃学生
        
    ]
}

module.exports=StuRouter;