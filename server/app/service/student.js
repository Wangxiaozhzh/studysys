const StuModel = require('../model/student')

// 
const StuSer={
    // 查询所有学生
    getAllStudent:async()=>{
        return await StuModel.findAllStudents()
    },
    // 查询所有课程类型
    findAllCourseType:async ()=>{
        return await StuModel.findAllCourseType();
    },
    // 通过id查询学生信息
    getStudentById:async(Id)=>{
        return await StuModel.getStudentById(Id);
    },
    
    // 新增学生
    addStudent:async(name,type,course,adress)=>{
        return await StuModel.addStudent(name,type,course,adress);
    },

    // 验证name是否存在
    repeatStu:async(name) => { 
        let result =  await StuModel.repeatStu(name);
        if(result && result.length){
            return result
        }
        return false
    },

    // 更新学生信息
    updateStu:async(name,type,course,adress,id)=>{
        return await StuModel.updateStu(name,type,course,adress,id);
    },

    // 根据student_id删除学生
    deleteStu:async(id)=>{
        return await StuModel.deleteStu(id);
    },

    // 根据student_id查询是否存在
    queryStuById:async(id)=>{
        return await StuModel.queryStuById(id);
    },
    // 学生密码更新
    updateSPass:async (newPassword,name)=>{
        return await StuModel.updateSPass(newPassword,name);
    },

    // 获取最近活跃人数
    getActiveStu:async() =>{
        return await StuModel.getActiveStu();
    },



}
module.exports=StuSer