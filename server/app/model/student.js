// 学生model类
const query=require('../service/mysql');

const StuModel={
    // 查询所有学生

    findAllStudents: async () => {
		let _sql = `select a.student_id, a.student_name, a.update_date, a.adress, b.id as type_id, b.name as course_type, c.id as course_id, c.name as course_name from student as a, student_type as b, course as c where a.course_id = c.id and a.student_type = b.id order by update_date desc`;
		return await query(_sql);
	},
	findAllCourseType:async ()=>{
		let _sql=`select * from student_type`;
		return await query(_sql);
	},
	 // 通过id查询学生信息
	 getStudentById:async(Id)=>{
		let inserts = [Id];
		let _sql =`select a.student_id, a.student_name, a.update_date, a.adress, b.id as type_id, b.name as course_type, c.id as course_id, c.name as course_name from student as a, student_type as b, course as c where a.course_id = c.id and a.student_type = b.id and a.student_id=?`;
		return await query(_sql,inserts);
	},
	
	// 新增学生
	addStudent : async (name,type,course,adress) => {
		let inserts =[name,type,course,adress];
		console.log(inserts)
		let _sql = `insert into student (student_name, student_type, course_id, update_date, adress) values (?, ?, ?, now() ,?)`;
		return await query(_sql,inserts);
	},

	// 验证name是否存在
	repeatStu:async (name) =>{
		let inserts = [name]
		let _sql = `select * from student where student_name =?`;
		return await query(_sql,inserts);
	},

	// 更新学生信息
	updateStu:async (name,type,course,adress,id)=>{
		let inserts =[name,type,course,adress,id];
		console.log("inserts"+inserts)
		// let _sql=`update student set student_name="glad12",student_type = 1,course_id=1,update_date=now(),adress="新西兰" where student_id=27`;
		let _sql =`update student set student_name = ?, student_type = ?, course_id = ?, update_date = now() , adress= ? where student_id = ?`
		return await query(_sql,inserts);
	},

	// 根据student_id删除学生
	deleteStu:async (id)=>{
		let inserts=[id]
		let _sql = `delete from student where student_id = ?`;
		return await query(_sql,inserts);
	},

	// 根据student_id查询学生
	queryStuById:async(id)=>{
		let inserts=[id];
		let _sql=`select * from student where student_id = ?`;
		return await query(_sql,inserts);
	},
	// 学生密码更新
	updateSPass:async(newPassword,name)=>{
		let inserts = [newPassword,name];
		let _sql =`update student set password = ? where student_name = ?`
		return await query(_sql,inserts);
	},

	// 查询最近活跃人数
	getActiveStu:async()=>{
		let _sql = `select a.student_id, a.student_name, a.update_date, b.id as type_id, b.name as course_type, c.id as course_id, c.name as course_name from student as a, student_type as b, course as c where a.course_id = c.id and a.student_type = b.id and TO_DAYS(NOW()) - TO_DAYS(update_date) <= 7 order by update_date desc`;
		return await query(_sql);
	},
	
	
}

module.exports=StuModel;