import React from 'react';
import { Form, Input,  Select, Button ,message} from 'antd';
import {addTeacher} from '../../Config/httpRouter'
const { Option } = Select;
function TeacherRegistrationForm(props){
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
        const handleSubmit = () => {
            let dataProps={
                type:1
            }
            props.form.validateFieldsAndScroll((err, values) => {
                if (err) {
                    console.log(err);
                }
                if (!err) {
                    console.log('Received values of form: ', values);
                    props.form.resetFields();
                    dataProps.name = values.name;
                    addTeacher(dataProps).then(res => {
                        if(res && res.status === 200){
                            if(res.data.code === 0){
                                message.success("新增成功");
                            }else if(res.data.code === 2){
                                message.error('账号已经存在');
                            }
                        }else{
                            message.error('新增失败');
                        }
                    }).catch(err=>console.log(err))
                }
            });
        }
        return(
            <Form {...formItemLayout}>
               <Form.Item label="教师账号" hasFeedback>
                {getFieldDecorator('name', {
                    rules: [
                    {
                        required: true,
                        message: '请输入教师账号',
                    }
                    ],
                })(<Input placeholder="请输入教师账号"/>)}
                </Form.Item>

                <Form.Item label="教师类型">
                <Select defaultValue="1">
                    <Option value="1">超管</Option>
                    <Option value="2">教师</Option>
                    <Option value="3">游客</Option>
                </Select>
                </Form.Item>

                <Form.Item label="默认密码">
                <span>123456</span>
                </Form.Item>
                
                <Form.Item style={{textAlign:'center'}}>
                    <Button onClick={()=>{handleSubmit()}} type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>    
            </Form>
            )
}

const AddTeacher = Form.create({ name: 'register' })(TeacherRegistrationForm);
export default AddTeacher;