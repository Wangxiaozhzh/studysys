// 菜单数据
const allMenu = [
    {
      name: '首页',
      url: 'home',    
      icon: 'home'
    },
    {
      name: '学生管理',
      url: 'student/studentList',
      icon: 'contacts',
      children: [
          { name: '学生列表', url: 'student/studentList' },
          { name: '新增学生', url: 'student/addStudent' }
        ]
    },
    {
      name: '课程管理',
      url: 'course/courseList',
      icon: 'book',
      children: [
        { name: '课程列表', url: 'course/courseList' },
        { name: '添加课程', url: 'course/addCourse' },
        { name: '课程类型', url: 'course/courseType' }
      ]
    },
    {
      name: ' 面试管理',
      url: 'interview/interviewMaster',
      icon: 'calendar',
      children: [{ name: '面试排期', url: 'interview/index' }]
    },
    {
      name: '教师管理',
      url: 'teacher/teacherList',
      icon: 'user',
      children: [
          { name: '教师列表', url: 'teacher/teacherList' },
          { name: '添加教师', url: 'teacher/addTeacher' }
        ]
    }
  ]
  
  export default allMenu
  