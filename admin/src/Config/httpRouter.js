import http from './axiosSetting';
import servicePath from './apiUrl';

//统一处理项目中的所有api接口
export const getStudent = () => http.get(servicePath.getStudent);
export const addStudent = (data) =>http.post(servicePath.addStudent,data);
export const deleteStu = (data) => http.get(servicePath.deleteStu,data);
export const getStudentById = (data) => http.get(servicePath.getStudentById,data);
export const updateStudent = (data) =>http.post(servicePath.updateStu,data);
export const findAllCourseList = ()=>http.get(servicePath.findAllCourseList);
export const deleteCourseById = (data) => http.get(servicePath.deleteCourseById,data);
export const addCourse = (data) => http.post(servicePath.addCourse,data);
export const queryCourseById = (data) => http.get(servicePath.queryCourseById,data);
export const updateCourse = (data) => http.post(servicePath.updateCourse,data);
export const getActiveStu = ()=>http.get(servicePath.getActiveStu);
export const findAllCourseType = ()=>http.get(servicePath.findAllCourseType);

export const allCourseType = ()=>http.get(servicePath.allCourseType);
export const addCourseType = (data) => http.post(servicePath.addCourseType,data);
export const deleteCourseTypeById = (data) => http.get(servicePath.deleteCourseTypeById,data);
export const updateCourseType = (data) => http.post(servicePath.updateCourseType,data);

export const findInterviewsByMonth = (data) => http.post(servicePath.findInterviewsByMonth,data);
export const addInterview = (data) => http.post(servicePath.addInterview,data);
export const deleteInterview = (data) => http.get(servicePath.deleteInterview,data);
export const findNextInterview = ()=>http.get(servicePath.findNextInterview);

export const teaLogin = (data) => http.post(servicePath.teaLogin,data);
export const systemUserInfo = () => http.get(servicePath.systemUserInfo);
export const getAllTeacher = () => http.get(servicePath.getAllTeacher);
export const logOut = () => http.get(servicePath.logOut);
export const addTeacher = (data) => http.post(servicePath.addTeacher,data);
export const deleteTeaById = (data) => http.get(servicePath.deleteTeaById,data);
export const updateTeacher = (data) => http.post(servicePath.updateTeacher,data);
export const editPassword = (data) => http.post(servicePath.editPassword,data);

