import React, { useState ,useEffect } from 'react';
import {message,Col,Row,Card} from 'antd';
import {getActiveStu,getStudent,findAllCourseList} from '../../Config/httpRouter';
 
function Snapshot(){
    const [allStudent,setAllStudent] = useState(0);
    const [activeStudent,setActiveStudent] = useState(0);
    const [courseNum,setCourseNum] = useState(0);
    useEffect(()=>{
        getStudentInfo();
        getActiveStudent();
        getAllCourse();
    },[])
    // 获取学生人数
    const getStudentInfo = ()=>{
        getStudent().then(res=>{
            if(res.status === 200 && res.data.code===0){
                setAllStudent(res.data.datas.length);
            }else{
                message.error('获取学生总人数失败！');
            }
        })
    }
    // 获取最近活跃人数
    const getActiveStudent = ()=>{
        getActiveStu().then(res=>{
            if(res.status === 200 && res.data.code===0){
                setActiveStudent(res.data.datas.length)
            }else{
                message.error('获取最近活跃人数失败！')
            }
        })
    }
    // 获取所有课程
    const getAllCourse = ()=>{
        findAllCourseList().then(res=>{
            if(res.status === 200 && res.data.code===0){
                setCourseNum(res.data.datas.length)
            }else{
                message.error('获取课程数量失败！')
            }
        })
    }
    return(
        <div className='divWrap status'>
            <h1>数据快照</h1>
            <Row gutter={30}>
                <Col span={8}>
                    <Card title="" bordered={false}>
                        <p className='title'>学生总人数</p>
                        <p className='num'>{allStudent}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <p className='title'>近7天内活跃同学</p>
                        <p className='num'>{activeStudent}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <p className='title'>课程总数</p>
                        <p className='num'>{courseNum}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Snapshot;