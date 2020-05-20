// 登录页面
import React, { useState } from 'react';
import { Spin, Card, Input, Icon, Button, Form, message } from 'antd';
import '../../Static/Css/login.css';
import {teaLogin } from '../../Config/httpRouter'
function Login(props){
    const [isLoading,setIsLoading] = useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const checkLogin=()=>{
        // 点击出现loading，防止重复提交
        setIsLoading(true);
        if(!userName){
            message.error("用户名不能为空！");
            setTimeout(() => {
                  setIsLoading(false);   
            }, 500);
            return false;
        }else if(!password){
            message.error("密码不能为空！");
            setTimeout(()=>{
                setIsLoading(false);
            },500);
            return false;
        }

        let propsData={
            name:userName,
            password:password
        }

        teaLogin(propsData).then(res=>{
            if(res.data.code===0){
                setIsLoading(false);
                // 请求成功后，把后端返回的token保存在localstorage中
                localStorage.setItem('token',res.data.datas.token);
                props.history.push('/home');
            }else{
                setIsLoading(false);
                message.error('账号或密码错误');
            }
        })
    }
    return(
        <div className="loginWrap">
            <div className='login-div'>
                <Spin tip="loading..." spinning={isLoading}>
                    <Card title="StudySystem" bordered={true} style={{width:400}}>
                        <Form>
                        <Input id='userName' size="large" placeholder='Enter your userName'
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        <br/><br/>
                        <Input.Password id='password' size="large" placeholder='Enter your password'
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        autoComplete=''
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <br/><br/>
                        <Button type='primary' size='large' block onClick={checkLogin} >登录</Button>
                        </Form>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}

export default Login;