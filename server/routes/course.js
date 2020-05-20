// 课程路由管理

const Course = require('../app/controller/course');

const CourseRouter = {
    name:'/course',//命名空间
    routes:[
        {methods: 'get', path: '/allCourseType', realize: Course.getAllCourseType}, // 查询所有课程类型
        {methods:'post',path:'/addCourseType',realize:Course.addCourseType}, //新增课程类型
        {methods:'post',path:'/updateCourseType',realize:Course.updateCourseType}, //更新课程类型
        {methods:'get',path:'/deleteCourseTypeById',realize:Course.deleteCourseTypeById}, //根据id删除课程类型
        {methods:'get',path:'/findAllCourseList',realize:Course.findAllCourseList}, //查询所有课程列表
        {methods:'get',path:'/queryCourseById',realize:Course.queryCourseById}, //根据id查询当前课程
        {methods:'get',path:'/deleteCourseById',realize:Course.deleteCourseById}, //根据id删除课程
        {methods:'post',path:'/addCourse',realize:Course.addCourse}, //新增一节课程
        {methods:'post',path:'/updateCourse',realize:Course.updateCourse}, //更新一节课程
        

        
        
        
    ]
};

module.exports=CourseRouter;