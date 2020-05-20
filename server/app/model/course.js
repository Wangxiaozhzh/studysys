// 课程Model
const query = require('../service/mysql')
const CourseModel={

	/**
	 * 查询所有课程列表	
	 */
	findAllCourseList: async () => {
		let _sql = `select a.id,a.name,a.uid,a.homework,a.typeId,b.name as course_name from course as a,course_type as b where a.typeId = b.id order by id desc`;
		// let _sql = `select * from course order by name asc`
		return await query(_sql)
	},

	/**
	 * 查询所有课程类型
	 */
	findAllCourseType: async () => {
		let _sql = `select * from course_type`;
		return await query(_sql)
	},

	/**
	 * 新增所有课程类型
	 */
	addCourseType: async (name) => {
		let inserts = [name];
		let _sql = `insert into course_type (name) values (?)`;
		return await query(_sql,inserts);
	},

	/**
	 * 更改所有课程类型
	 */
	updateCourseType:async (name,id) => {
		let inserts = [name,id];
		let _sql = `update course_type set name = ? where id =?`;
		return await query(_sql,inserts);
	},

	/**
	 * 根据id删除课程类型
	 */
	deleteCourseTypeById: async (id) =>{
		let inserts = [id];
		let _sql = `delete from course_type where id = ?`;
		return await query(_sql,inserts);
	},

	/**
	 * 根据id删除课程
	 */
	deleteCourseById: async (id) =>{
		let inserts = [id];
		let _sql =`delete from course where id = ?`;
		return await query(_sql,inserts);
	},

	 /*
	 * 新增一节课程
	 */
    addCourse: async (name,vid,type,homework)=>{
		let inserts=[name,vid,type,homework];
		let _sql = `insert into course (name,uid,typeId,homework) values (?, ?, ?, ?)`;
		return await query(_sql,inserts);
	},
	
	 /*
	 * 更新一节课程
	 */
	updateCourse: async (name,vid,homework,type,id)=>{
		let inserts = [name,vid,homework,type,id]
		let _sql = `update course set name = ?,uid = ?,homework = ?,typeId = ? where id = ?`;
		return await query(_sql,inserts);
	},

	 /*
	 * 根据id查询当前课程
	 */
	queryCourseById: async (id)=>{
		let inserts = [id];
		let _sql = `select * from course where id =?`;
		return await query(_sql,inserts);
	},
	/*
	 * 根据课程名称查询课程类型
	 */
	queryCourseType: async (name) => {
		let inserts = [name]
		let _sql = `select * from course_type where name = ?`;
		return await query(_sql, inserts)
	},

}

module.exports = CourseModel;