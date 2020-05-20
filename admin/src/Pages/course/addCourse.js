import React, { useState,useEffect } from 'react';
import { Form, Input, message, Select, Button } from 'antd';
import {addCourse,queryCourseById,updateCourse,allCourseType} from '../../Config/httpRouter'
const { TextArea } = Input;
function CourseRegistrationForm(props){
        const { Option } = Select;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const [courseId,setCourseId] = useState(0); //用来记录是新增还是更新，0表示新增
        const [courseName,SetCourseName]=useState('');  
        const [courseVid,SetCourseVid]=useState('');
        const [courseType,SetCourseType]=useState('');
        const [coursehomework,SetCoursehomework]=useState('');
        const [courseTypeList,setCourseTypeList] = useState([])
        useEffect(()=>{
            getAllCourseType();
            let tempId = props.match.params.id;
            if(tempId){
                setCourseId(tempId);
                getCourseById(tempId);
            }
        },[])

        // 点击保存按钮
        const addOneCourse = () => {
            props.form.validateFieldsAndScroll((err, values) => {
                if (err) {
                    console.log(err)
                }
                if (!err) {
                    console.log('Received values of form: ', values);
                    props.form.resetFields();
                    // 赋值
                    SetCourseName(values.courseName);
                    SetCourseVid(values.courseVid);
                    SetCourseType(values.courseType);
                    SetCoursehomework(values.homework);
                    let dataProps = {
                        name: courseName,
                        vid: courseVid,
                        homework: coursehomework,
                        typeId: courseType
                    }

                    if (courseId === 0) {
                        // 新增课程
                        addCourse(dataProps).then(res => {
                            if (res && res.status === 200 && res.data.code === 0) {
                                SetCourseName('');
                                SetCourseVid('');
                                SetCoursehomework('');
                                message.success("新增课程成功");
                            } else {
                                message.error("新增课程失败");
                            }
                        }).catch(error => console.log(error))
                    } else {
                        // 更新课程
                        dataProps.id = courseId;
                        updateCourse(dataProps).then(res => {
                            if (res && res.status === 200 && res.data.code === 0) {
                                message.success("更改信息成功");
                            } else {
                                message.success("更改信息失败");
                            }
                        }).catch(error => console.log(error))
                    }

                }
            })
        }

        // 通过id查询课程信息
        const getCourseById = (data) => {
            let dataProps = {
                id: data
            }
            queryCourseById(dataProps).then(res => {
                if (res.data.code === 0 && res.data.datas.length!==0) {
                    let courseInfo = res.data.datas[0];
                    SetCourseName(courseInfo.name);
                    SetCourseVid(courseInfo.uid);
                    SetCoursehomework(courseInfo.homework);
                    SetCourseType(courseInfo.typeId);

                    let formData = {
                        courseName: courseInfo.name,
                        courseVid: courseInfo.uid,
                        courseType: courseInfo.typeId,
                        homework: courseInfo.homework
                    }
                    // 初始化表单中的数据
                    props.form.setFieldsValue(formData);
                }
                if(res.data.datas.length===0){
                    message.error('没有当前id对应的信息');
                    props.history.push('/404');
                }
            })
        }
        // 获取所有课程类型
        const getAllCourseType = () => {
            allCourseType().then(res => {
                if (res.status===200 && res.data.code===0) {
                    setCourseTypeList(res.data.datas);
                }else{
                    message.error(res.message)
                }
            })
        }
        // 选择课程分类
        const changCourseType = (value) => {
            console.log(value);
            SetCourseType(value)
        }
        return(
            <Form {...formItemLayout}>
                <Form.Item label="课程名称">
                    {getFieldDecorator('courseName',{
                        rules:[{
                            required:true,
                            message:'请输入课程类型'
                        }],
                    })(<Input onChange={e=>{SetCourseName(e.target.value)}} placeholder="课程名称" id="warning" />)}
                </Form.Item>

                <Form.Item label="课程VID">
                    {getFieldDecorator('courseVid',{
                        rules:[{
                            required:true,
                            message:'请输入课程VID'
                        }],
                    })(<Input onChange={e=>{SetCourseVid(e.target.value)}} placeholder="课程VID" id="warning" />)}
                </Form.Item>

                <Form.Item label="所属分类">
                    {getFieldDecorator('courseType',{
                        rules:[{
                            required:true,
                            message:'请输入所属分类'
                        }],
                    })(
                        <Select onChange={changCourseType}>
                            {courseTypeList.map(e=>(
                                    <Option key={e.id}>{e.name}</Option>                            
                                ))
                            }
                        </Select>
                    )}

                </Form.Item>

                <Form.Item label="作业">
                    {getFieldDecorator('homework',{
                        rules:[{
                            required:false,
                        }],
                    })(<TextArea onChange={e=>{SetCoursehomework(e.target.value)}} rows={10} />
                    )}
                </Form.Item>
                
                <Form.Item style={{textAlign:'center'}}>
                    <Button onClick={addOneCourse} type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>    
            </Form>
         )
}
const AddCourse = Form.create({name:'register'})(CourseRegistrationForm);
export default AddCourse;