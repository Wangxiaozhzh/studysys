import React, { useState, useEffect} from 'react';
import { Form, Input,  Select, Button,message } from 'antd';
import {addStudent,getStudentById,findAllCourseType,updateStudent,allCourseType,findAllCourseList} from '../../Config/httpRouter'
function StudentRegistrationForm(props){
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
    const [typeId,setTypeId] = useState(0); //typeId这个参数用来控制是新增还是编辑，默认是0，即默认是新增
    const [studentName,setStudentName]=useState('');
    const [studentTypeList,setStudentTypeList]=useState([]);
    const [studentType,setStudentType]=useState();
    const [studentAdress,setStudentAdress]=useState('');
    const [studentCourse,setStudentCourse]=useState();
    const [courseTypeArray,setCourseTypeArray] = useState([]);
    const [courseListArray,setcourseListArray] = useState([]);
    const [allCourseList,setAllCourseList] = useState([]);

    useEffect(()=>{
        getAllCourseType();
        getAllCourseList();
        getCourseType();

        // 在这里要注意的是Content组件中的路由需要添加exact属性，不然获取不到params的值
        let tempId = props.match.params.id;
        if(tempId){
            setTypeId(tempId);
            getStuById(tempId);
        }
    },[])

    // 提交保存操作
    const saveStudent = () => {
        props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err);
            }
            if (!err) {
                console.log('Received values of form: ', values);
                props.form.resetFields();

                setStudentName(values.student_name);
                setStudentType(values.student_type);
                setStudentAdress(values.adress);
                setStudentAdress(values.student_course);
                let dataProps = {
                    student_name: studentName,
                    student_type: studentType,
                    course_id: studentCourse,
                    adress: studentAdress
                }
                   // 新增学生
                if (typeId === 0) {
                    addStudent(dataProps).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                message.success("新增成功");
                            } else if (res.data.code === 2) {
                                message.error("用户名已经存在");
                            } else if (res.data.code === 1) {
                                message.error('缺少参数');
                            }
                        } else {
                            message.error("新增失败");
                        }
                    })
                } else {
                    // 更新学生数据
                    dataProps.student_id = typeId;
                    updateStudent(dataProps).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                message.success("数据更新成功");
                                props.history.push('/student/studentList');
                            } else if (res.data.code === 1) {
                                message.error("缺少参数");
                            } else if (res.data.code === 2) {
                                message.error("用户名已经存在");
                            }
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        });
    }

    // 通过id获取学生信息
    const getStuById = (id)=>{
        let paramsData = {
            "id":id
        }
        getStudentById(paramsData).then(res=>{
            if(res.status===200 && res.data.code===0){
                let stuInfo = res.data.datas[0];
                setStudentName(stuInfo.student_name);
                setStudentType(stuInfo.type_id);
                setStudentAdress(stuInfo.adress);
                setStudentCourse(stuInfo.course_id)
                let formData = {
                    student_name:stuInfo.student_name,
                    student_type:stuInfo.type_id,
                    adress:stuInfo.adress,
                    student_course:stuInfo.course_name
                }
                //设置默认值
                props.form.setFieldsValue(formData);

            }else{
                message.error("获取信息出错");
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    // 查询所有学生类型
    const getAllCourseType = () => {
        findAllCourseType().then(res => {
            if (res.status===200 && res.data.code ===0) {
                    setStudentTypeList(res.data.datas);
            }else{
                message.error(res.message)
            }
        })
    }
    
    // 获取所有课程类型
    const getCourseType = () => {
        allCourseType().then(res => {
            if (res.status===200 && res.data.code ===0) {
                setCourseTypeArray(res.data.datas);
            }else{
                message.error(res.message)
            }
        })
    }

    //获取所有课程列表
    const getAllCourseList = () => {
        findAllCourseList().then(res => {
            if (res.status===200 && res.data.code ===0) {
                setAllCourseList(res.data.datas);
                setcourseListArray(res.data.datas);
            }else{
                message.error(res.message)
            }

        })

    }
    // 学长学生类型
    const changStuType = (value) => {
        setStudentType(value);
    }

    // 学生课程类型
    const handleCouTypeChange = value => {
        props.form.setFieldsValue({
            student_course:[]
        })
        let arr = [];
        allCourseList.forEach(e => {
            if (value == e.typeId) {
                arr.push(e);
            }
        })
        setcourseListArray(arr);
    };
    
    // 选择课程
    const CourseChange = value => {
        setStudentCourse(value);
    };

    return(
            <Form {...formItemLayout}>
                <Form.Item label='学生邮箱' hasFeedback>
                {getFieldDecorator('student_name', {
                    rules: [
                    {
                        required: true,
                        message: '请输入学生邮箱',
                    }
                    ],
                })(<Input onChange={(e)=>setStudentName(e.target.value)} placeholder="学生邮箱" id="warning" />)}
                </Form.Item>

                <Form.Item label="学生类型" hasFeedback>
                {getFieldDecorator('student_type',{
                    rules:[{
                        required:true,
                        message:'请输入学生类型'
                    }],
                })(
                    <Select onChange={changStuType}>
                            {studentTypeList.map((item,index)=>(
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))
                            }
                    </Select>
                )}
           
                </Form.Item>

                <Form.Item label="所在地区" hasFeedback>
                {getFieldDecorator('adress',{
                    rules:[{
                        required:true,
                        message:'请输入学生地址'
                    }],
                })(
                    <Select onChange={(value)=>setStudentAdress(value)}>
                        <Option value="新西兰">新西兰</Option>
                        <Option value="国内">国内</Option>
                        <Option value="澳洲">澳洲</Option>
                        <Option value="加拿大">加拿大</Option>
                    </Select>
                )}
             
                </Form.Item>

                <Form.Item label="课程" hasFeedback>
                    <Select
                        style={{ width:300 }}
                        onChange={handleCouTypeChange}
                        >
                        {courseTypeArray.map(item => (
                            <Option key={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                    {getFieldDecorator('student_course',{
                        rules:[{
                            required:true,
                            message:'请输入课程',
                        }],
                    })(
                        <Select
                        style={{ width: 300 }}
                        onChange={CourseChange}
                        >
                        {courseListArray.map(e => (
                            <Option key={e.id}>{e.name}</Option>
                        ))}
                        </Select>
                    )}
                </Form.Item>
                
                <Form.Item style={{textAlign:'center'}}>
                    <Button onClick={saveStudent} type="primary">
                        确定
                    </Button>
                </Form.Item>    
            </Form>
    )
}
const AddStudent = Form.create({ name: 'register' })(StudentRegistrationForm);
export default AddStudent;