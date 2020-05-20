// 教师管理model 
const query = require('../service/mysql')
const teaModel = {
    // 教师登录
    checkLogin: async (name,password) => {
        let inserts = [name,password];
        let _sql = `select * from teacher where name = ? and password = ?`;
        return await query(_sql,inserts);
    },
    
    // 获取教师列表
    getAllTeacher:async () => {
        let _sql = `select id,name,type from teacher`;
        return await query(_sql);
    },

    // 添加老师账号
    addTeacher: async (name,type)=>{
        let inserts = [name,type];
        let _sql = `insert into teacher (name,type) values (?,?)`;
        return await query(_sql,inserts);
    },

    // 修改密码
    editPassword: async (name,newPass) => {
        let inserts = [newPass,name];
        let _sql = `update teacher set password = ? where name = ?`
        return await query(_sql,inserts);
    },

    // 根据id删除老师
    deleteTeaById: async (id) => {
        let inserts = [id];
        let _sql = `delete from teacher where id = ?`;
        return await query(_sql,inserts);
    },

    // 根据教师name查询教师
    queryTeacher:async (name) => {
        let inserts = [name];
        let _sql = `select * from teacher where name = ?`;
        return await query(_sql,inserts);
    },

    // 通过id更新教师name
    updateTeacher:async (id,newName) => {
        let inserts = [newName,id];
        let _sql = `update teacher set name = ? where id = ?`;
        return await query(_sql,inserts)
    }


}
module.exports = teaModel;