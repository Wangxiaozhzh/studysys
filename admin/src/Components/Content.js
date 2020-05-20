import React, { Suspense,lazy } from 'react';
import {Route,Switch} from 'react-router-dom'
import {Spin} from 'antd'
import '../Static/Css/common.css'

// 懒加载配置
const Home = lazy(()=>
    import('../Pages/home/home')
);
const StudentList = lazy(()=>
    import('../Pages/student/studentList')
)
const AddStudent = lazy(()=>
    import("../Pages/student/addStudent")
)
const CourseList = lazy(()=>
    import("../Pages/course/courseList")
)
const AddCourse = lazy(()=>
    import("../Pages/course/addCourse")
)
const CourseType = lazy(()=>
    import("../Pages/course/courseType")
)
const InterviewMaster = lazy(()=>
    import("../Pages/interview/index")
)
const TeacherList = lazy(()=>
    import("../Pages/teacher/teacherList")
)
const AddTeacher = lazy(()=>
    import("../Pages/teacher/addTeacher")
)
const NoMatch = lazy(()=>
    import("../Pages/404/error")
)


const Contents=()=>(
    <Suspense fallback={<div className="example"><Spin tip='加载中...'></Spin></div>}>
        <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/student/studentList" exact component={StudentList} />
            <Route path="/student/addStudent" exact component={AddStudent} />
            <Route path="/student/addStudent/:id" exact component={AddStudent} />
            <Route path="/course/courseList" exact component={CourseList} />
            <Route path='/course/addCourse' exact component={AddCourse} />
            <Route path='/course/addCourse/:id' exact component={AddCourse} />
            <Route path='/course/courseType' exact component={CourseType} />
            <Route path='/interview/index' exact component={InterviewMaster} />
            <Route path='/teacher/teacherList' exact component={TeacherList} />
            <Route path='/teacher/addTeacher' exact component={AddTeacher} />
            <Route path='*' exact component={NoMatch} />
        </Switch>     
    </Suspense>
)

export default Contents;