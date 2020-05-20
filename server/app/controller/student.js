// 学生操作相关controller类
const StuSer = require('../service/student')
const R=require('../service/response')
const Tools = require('../controller/tools')

const StuController={
    // 查找所有学生
    getAllstudents:async(ctx)=>{
        let result= await StuSer.getAllStudent();
        if(result){
            R.success(result,ctx)
        }else{
           R.error(99,'系统错误',ctx)
        }
    },
    // 查询所有学生类型
    findAllCourseType:async (ctx) => {
        let result  = await StuSer.findAllCourseType();
        if(result){
            R.success(result,ctx)
        }else{
            R.error(99,'系统错误',ctx)
        }
    },

    // 通过学生id查询学生信息
    getStudentById:async(ctx)=>{
        let Id = ctx.query.id;
         let result = await StuSer.getStudentById(Id);
         if(result){
             R.success(result,ctx)
         }else{
            R.error(99,'系统错误',ctx)
         }

    },

    // 新增学生
    addStudent:async(ctx)=>{
        let name=ctx.request.body.student_name;
        let type = ctx.request.body.student_type; 
        let course  = ctx.request.body.course_id;
        let adress = ctx.request.body.adress;
        if(!name){
            return R.error(1,"name",ctx)
        }if(!type){
            return R.error(1,"type",ctx)
        }if(!course){
            return R.error(1,"type",ctx)
        }if(!adress){
            return R.error(1,"type",ctx)
        }
        // 查看是否已经存在用户名
        let repeatStu =await StuSer.repeatStu(name);
        if(repeatStu&&repeatStu.length>0){
           R.error(2,repeatStu[0].student_name,ctx);
            return
        }     
        let result = await StuSer.addStudent(name,type,course,adress);
        console.log(result);
        if(result){
           return R.success("新增成功",ctx);
        }else{
          return  R.error("系统错误",ctx);
        }
    },

    // 更新学生信息
    updateStu : async(ctx)=>{
        let name = ctx.request.body.student_name;
        let type = ctx.request.body.student_type;
        let course = ctx.request.body.course_id;
        let adress = ctx.request.body.adress;
        let id = ctx.request.body.student_id;
        
        if(!name){return R.error(1,"name",ctx)}
        if(!type){return R.error(1,"type",ctx)}
        if(!course){return R.error(1,"course",ctx)}
        if(!adress){return R.error(1,"adress",ctx)}
        if(!id){return R.error(1,"id",ctx)}

        // 验证要更新的name是否已经存在
        let repeatStu =await StuSer.repeatStu(name);
        if(repeatStu && repeatStu[0].student_id != id){
           R.error(2,repeatStu[0].student_name,ctx);
            return
        }
        let result = await StuSer.updateStu(name,type,course,adress,id);
        if(result){
            return R.success("数据更新成功",ctx);
        }else{
            return R.error("系统错误",ctx);
        }

    },

    // 根据student_id删除学生
    deleteStu:async(ctx)=>{
        let id = ctx.query.student_id;
        console.log("id :"+id);
        if(!id){
           return R.error(1,"id",ctx);
        }
        // 查询student_id是否存在
        let isId = await StuSer.queryStuById(id);
        if(!isId || isId.length==0){
            return R.error(4,id,ctx)
        }
        let result = await StuSer.deleteStu(id);
        if(result){
            return R.success("删除成功",ctx)
        }else{
            return R.error("删除失败",ctx);
        }
    },

    // 修改学生密码
    updateSPass:async(ctx)=>{
        let password = ctx.request.body.password;
        let newPassword = ctx.request.body.newPassword;
        if(!password){
            return R.error(1,"password",ctx);
        }if(!newPassword){
            return R.error(1,"newPassword",ctx);
        }
        if(password!==ctx.session.password){
           return  R.error(6,"",ctx)
        }
        let result = await StuSer.updateSPass(newPassword,ctx.session.user)
        if(result){
            ctx.session.password = newPassword;
            R.success("修改成功",ctx);
        }else{
            R.error("修改失败",ctx);
        }
    },
        
    // 获取最近活跃人数
    getActiveStu:async(ctx) =>{
       let result = await StuSer.getActiveStu();
       R.success(result,ctx)
    },

    


}

module.exports=StuController