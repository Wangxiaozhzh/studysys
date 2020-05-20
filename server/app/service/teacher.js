// 教师管理service
const teaModel = require('../model/teacher')
const TeaService = {
    // 教师登录
    checkLogin:async (name,password) => {
        let data =  await teaModel.checkLogin(name,password);
        return data && data.length? data[0] : false
    },

    // 获取教师列表
    getAllTeacher: async () => {
        let data = await teaModel.getAllTeacher()
        return data && data.length ? data : false
    },

    // 添加教师账号
    addTeacher:async (name,type) =>{
        let result  = await teaModel.addTeacher(name,type);
        if(result.insertId){return result}
        return false
    },

    // 修改密码
    editPassword:async (name,newPass)=>{
        let result = await teaModel.editPassword(name,newPass);
        if(result.changedRows){
            return result
        }
        return false
    },

    //根据id删除老师
    deleteTeaById:async (id) => {
        let result = await teaModel.deleteTeaById(id);
        if(result){return result}
        return false
    },
    
    // 根据教师name查询教师
    queryTeacher:async (name) => {
        let result = await teaModel.queryTeacher(name);
        if(result && result.length){return result}
        return false;
    },
    // 通过id更新教师name
    updateTeacher:async (id,newName) =>{
        let result  = await teaModel.updateTeacher(id,newName);
        if (result.changedRows) {
            return result
        }
        return false
    }



}
module.exports = TeaService;