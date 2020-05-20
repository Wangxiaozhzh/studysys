import React, { useEffect,useState } from 'react';
import {Dropdown ,Form ,Input ,Menu ,Icon ,message ,Modal } from 'antd';
import {systemUserInfo ,logOut ,editPassword} from '../Config/httpRouter';
import {createHashHistory} from 'history';
const {confirm} = Modal;

function UserInfo(props){
    const [isVisible,setIsVisible] = useState(false)
    const [teacherInfo,setTeacherInfo] = useState({"id":'',"name":"用户名","type":""})
    // 获取教师信息
    const getTeacherInfo = () => {
        systemUserInfo().then(res=>{
            if(res && res.status===200 && res.data.code===0){
                let resInfo = res.data.datas.info;
                setTeacherInfo(resInfo);
            }else{
                message.error('用户信息获取失败');
            }
        
        }).catch(error=>console.log(error))
    }
    // 注销登录
    const teacherLogout = ()=>{
        logOut().then(res=>{
            if(!res || res.error){
                message.error(res.message);
            }
            message.success("退出登录成功")
            localStorage.setItem('token','');
            // createHashHistory().push('/login/');
            window.location.href='/login'
        })
    }
    const handLogout=(e)=>{
        confirm({
            title:"确定要退出登录吗",
            okText:'确定',
            cancelText:'取消',
            onOk(){
                teacherLogout()
            }
        })
    }
    const updatePassword = ()=>{
        setIsVisible(true)
    }
    useEffect(()=>{
        getTeacherInfo();
    },[])
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={updatePassword}>
                <Icon type="edit" />
                修改密码
            </Menu.Item>
            <Menu.Item key="2" onClick={handLogout}>
                <Icon type="user" />
                退出登录
            </Menu.Item>
        </Menu>
      );
    return(
        <>
            <Dropdown.Button style={{float:'right',paddingRight:50}} overlay={menu} icon={<Icon type="user" />}>
                {teacherInfo.name}
            </Dropdown.Button>
            <ResetPassword isVisible={isVisible} setIsVisible={setIsVisible} />
        </>
    )
}

//表单子组件
const ResetPasswordForm=(props)=>{
    const {isVisible,setIsVisible} = props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },

    };
    const handleSubmit = () => {
        props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err);
            }
            if (!err) {
                console.log('Received values of form: ', values);
                props.form.resetFields();

                let dataProps = {
                    oldPassword:values.oldPassword,
                    newPassword:values.newPassword
                }
                // 修改密码
                editPassword(dataProps).then(res=>{
                    if(res && res.status === 200){
                        if(res.data.code===0){
                            message.success('修改密码成功');
                            setIsVisible(false);                        
                        }else if(res.data.code === 6){
                            message.error('原始密码输入错误');
                        }
                    }else{
                        message.error('修改密码失败');
                    }
                }).catch(err=>console.log(err))
            }
        });
    }

    // 点击确认
    const handleOk = ()=>{
        handleSubmit()
    }
    // 点击取消
    const handleCancel = () => {
        setIsVisible(false);
    }

    // 校验新旧密码是否一致
    const newPasComfirm =(rules,value,callback)=>{
        let oldPassword = props.form.getFieldValue('oldPassword');
        console.log(oldPassword,value)
        if(oldPassword == value){
            callback(new Error('新旧密码一致'))
        }else{
            callback(); //必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        }
    }
    // 校验两次密码是否一致
    const reNewconfirm = (rules,value,callback)=>{
        let newPassword = props.form.getFieldValue('newPassword');
        console.log(newPassword,value)
        if( newPassword && newPassword !== value){
            callback(new Error('两次密码输入不一致'))
        }else{
            callback();
        }
    }
    
      return (
        <Modal
        title="修改密码"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        > 
            <Form {...formItemLayout}>
                <Form.Item label="旧密码" hasFeedback>
                {getFieldDecorator('oldPassword', {
                    rules: [
                    {
                        required: true,
                        message: '请输入旧的密码',
                    }],
                })(<Input.Password autoComplete='off' placeholder="请输入旧的密码"/>)}
                </Form.Item>

                <Form.Item label="新密码" hasFeedback>
                {getFieldDecorator('newPassword', {
                    rules: [
                    {
                        required: true,
                        message: '请输入新的密码',
                    },{
                        validator:(rules,value,callback)=>
                        {newPasComfirm(rules,value,callback)}
                    }
                    ],
                })(<Input.Password autoComplete='off' placeholder="请输入新的密码"/>)}
                </Form.Item>
                
                <Form.Item label="确认新密码" hasFeedback>
                {getFieldDecorator('setNewPassword', {
                    rules: [
                    {
                        required: true,
                        message: '确认新的密码',
                    },{
                        validator:(rules,value,callback)=>
                        {reNewconfirm(rules,value,callback)}
                    }
                    ],
                })(<Input.Password autoComplete='off' placeholder="确认新的密码"/>)}
                </Form.Item>
            </Form>
     </Modal>
    );
}

const ResetPassword = Form.create({name:'register'})(ResetPasswordForm)


export default UserInfo;