import React, { useEffect, useState } from 'react';
import {message,Col,Row,Card} from 'antd';
import {findNextInterview} from '../../Config/httpRouter'
import moment from 'moment';
function RecentInterview(){
    const [interStu,setInterStu] = useState([]);
    const [showText,isShowText] = useState(false);
    useEffect(()=>{
        getRecentInterview();
    },[])
    // 查询最近面试
    const getRecentInterview = () => {
        findNextInterview().then(res=>{
            if(res.status === 200 && res.data.code===0){
                if(res.data.datas.length){
                    setInterStu(res.data.datas);
                }else{
                    isShowText(true);
                }
            }else{
                message.error('获取最近面试数据失败');
            }


        })
    }
    return(
        <div className='divWrap interview'>
            <h1>近期面试</h1>
            <Row gutter={30}>
                {showText ? <h1 style={{color:'red'}}>暂无面试</h1> : interStu.map((item,index)=>(
                    <Col key={index} span={8}>
                        <Card className='rencentInterview' bordered={false}>
                             <p>学生: <span>{item.student_name}</span></p>
                             <p>时间: <span>{moment(item.interview_date).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                             <p>内容: <span>{item.interview_type}</span></p>
                             <p>备注: <span>{item.remarks}</span></p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default RecentInterview;