import React, { useState, useEffect } from 'react';
import {Input,Modal,Row,Col,Table, Button,message} from 'antd'
import {getStudent,deleteStu} from '../../Config/httpRouter'
const {Search} = Input;
const {confirm} =Modal;
function StudentList(props){
    const [studentListData,setStudentListData]=useState([]);
    const [loading,setLoading] = useState(false);
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render:(text,record,index)=>`${index+1}`,
            width:'5%',
          },
          {
            title: 'ID',
            dataIndex: 'student_id',
  
          },
          {
            title: '地区',
            dataIndex: 'adress',
          },
          {
            title: '学生邮箱',
            dataIndex: 'student_name',
          },
          {
              title: '当前课程',
              dataIndex: 'course_name',
          },
          {
              title: '学生类型',
              dataIndex:'course_type'
          },
          {
              title: '更新时间',
              dataIndex:'update_date'
          },
          {
            title: '操作',
            dataIndex:'actions',
            render:(text,record) => (
              <span>
                <Button onClick={()=>updateStudent(record)}>编辑</Button>
                <Button style={{paddingLeft:10}} onClick={(e)=>DeleteStudent(record)}>删除</Button>
              </span>
            )
          },
    ];

    // 初始化的时候请求数据,注意第二个参数需要写上[],否则会一直请求数据，造成浏览器崩溃。具体可自行去查找useEffect()的使用方法。
    useEffect(()=>{
        getStuList()
    },[])

    // 请求学生列表方法
    const getStuList = ()=>{
        setLoading(true);
        getStudent().then(res =>{
                if(res.status === 200 && res.data.code === 0){
                    let data = res.data.datas;
                    setLoading(false);
                    setStudentListData(toLocalTime(data));
                }
            }
        )
    }
    const updateStudent = (record)=>{
        // 编辑
        let Id = record.student_id;
        // 跳转到新增页面，给url带上一个id的参数
        props.history.push('/student/addStudent/'+Id);
    }
    
        // 删除学生
    const DeleteStudent = (record)=> {
        let params = {
            student_id:record.student_id
        }
        console.log(record.student_id);
        confirm({
            title:"确定删除吗",
            content:"确认删除后，信息将永久删除，不可恢复！",
            onOk(){
                deleteStu(params).then(res=>{
                    if(res.status === 200 && res.data.code === 0){
                        getStuList();
                        message.success("删除信息成功");
                    }else{
                        message.error("删除失败");
                    }
                })
            }
        })
    }

    const [studentListColumns] = useState(columns);

    const onSearchStu = (value) =>{
        if(!value){
            getStuList();
        }
        let result=[];
        studentListData.forEach(item=>{
            if(item.student_name.indexOf(value)>-1){
                result.push(item);
            }
        })
        setStudentListData(result);
    }
    
    // 将后台获取的数据中时间格式进行更改
    const toLocalTime = (t)=>{ 
        const addp = (s)=>{
            return s < 10? "0"+s : s
        }
        const newArr = t.map(item=>{
                let d = new Date(item.update_date); 
                const resDate = d.getFullYear() + '-' + addp((d.getMonth()+1))+'-' + addp(d.getDate());
                const resTime = d.getHours() + ':' + addp(d.getMinutes()) + ':' + addp(d.getSeconds());
                item.update_date = resDate + " " + resTime;
                return item;
            })
        return newArr;
    }

    return(
        <Row>
            <Col span={4}>
            <Search placeholder="搜索学生邮箱" onSearch={value=>onSearchStu(value)} enterButton />
            <p></p>
            </Col>
            <Col span={24}>
                <Table bordered={true} pagination={{
                    pageSize:9,
                    showQuickJumper:true
                }}
                rowKey={row=>row.student_id}  loading={loading} columns={studentListColumns} dataSource={studentListData} />
            </Col>
        </Row>
    )
}
export default StudentList;