// 接口的基本地址

const servicePath={
    getStudent:'stu/allStudent', //获取学生列表
    addStudent:'stu/addStudent',//新增学生
    deleteStu:"stu/deleteStu", //删除学生
    getStudentById:'stu/getStudentById/',//通过id获取学生信息
    updateStu:'stu/updateStu',//更新学生信息
    getActiveStu:'stu/getActiveStu', //获取近七天活跃的人数
    findAllCourseType:'stu/findAllCourseType',//查询所有学生类型


    findAllCourseList:'course/findAllCourseList',//获取所有课程列表
    deleteCourseById:'course/deleteCourseById',//根据id删除课程
    addCourse:'course/addCourse',//新增一节课程
    queryCourseById:'course/queryCourseById',//通过id查询课程
    updateCourse:'course/updateCourse', //更新课程

    allCourseType:'course/allCourseType', //获取所有课程类型
    addCourseType:'course/addCourseType',//新增课程类型
    updateCourseType:'course/updateCourseType',//更新课程类型
    deleteCourseTypeById:'course/deleteCourseTypeById',//根据id删除课程类型

    findInterviewsByMonth:'inter/findInterviewsByMonth',//通过月份查询面试
    addInterview:'inter/addInterview', //新增面试
    deleteInterview: 'inter/deleteInterview', //根据id删除面试记录
    findNextInterview:'inter/findNextInterview',//查询最近面试

    teaLogin: 'teacher/teaLogin', //教师登录
    systemUserInfo:'teacher/systemUserInfo',//获取当前用户信息
    getAllTeacher:'teacher/getAllTeacher', //获取教师列表
    logOut:'teacher/logOut',//教师退出登录
    addTeacher: 'teacher/addTeacher',//新增教师账号
    deleteTeaById:'teacher/deleteTeaById',//通过id删除教师账号
    updateTeacher:'teacher/updateTeacher',//通过id更新教师账号
    editPassweord:'teacher/editPassword', //更改老师密码
    


}
export default servicePath;