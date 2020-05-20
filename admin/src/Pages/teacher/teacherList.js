import React ,{useState, useEffect}from 'react';
import {Input,Row,Col,Table, message ,Button,Modal} from 'antd';
import {getAllTeacher,deleteTeaById,updateTeacher} from '../../Config/httpRouter';
const {Search} = Input;
const {confirm} = Modal;
function TeacherList(){
    const columns = [
        {
          title: '序号',
          dataIndex: 'cout',
          render:(text,record,index)=>`${index+1}`,
          key: 'cout',
          width:'10%',
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width:'10%',
        },
        {
          title: '教师账号',
          dataIndex: 'name',
          key: 'name',
          width:'25%',
        },
        {
          title: '教师类型',
          key: 'type',
          dataIndex: 'type',
        },
        {
          title: '操作',
          dataIndex:'actions',
          render:(text,record) => (
            <span>
              <Button onClick={()=>Edit(record)}>编辑</Button>&nbsp;&nbsp;&nbsp;
              <Button style={{paddingLeft:10}} type="danger" onClick={(e)=>DeleteStudent(record)}>删除</Button>
            </span>
          )
        },
      ];
    const [teaList,setTeaList] = useState([]);
    const [visible,setVisible] = useState(false);
    const [teacherName,setTeacherName] = useState('');
    const [teaId,setTeaId] = useState('');
    useEffect(()=>{
        allTeacherList();
    },[])

    // 获取教师列表
    const allTeacherList = ()=>{
        getAllTeacher().then(res=>{
            if(res && res.status === 200 && res.data.code === 0){
                setTeaList(res.data.datas);
            }
        }).catch(err=>console.log(err))
    }
    const DeleteStudent = (record)=>{
        // console.log(record.id);
        let data = {id:record.id};
        confirm({
            title:'确认删除这条教师信息？',
            content:'确认删除后，信息将永久删除，无法恢复！',
            onOk(){
                deleteTeaById(data).then(res=>{
                    if(res && res.status === 200 && res.data.code === 0){
                        message.success('删除成功'); 
                        allTeacherList();
                    }
                }).catch(err=>console.log(err))
            }
        })
    }
    const Edit = (record)=>{
        setTeacherName(record.name);
        setTeaId(record.id);
        setVisible(true);
    }
    const handleOk = () =>{
        let dataProps = {
            id:teaId,
            newName:teacherName
        }
        updateTeacher(dataProps).then(res => {
            if(res && res.status === 200){
                if(res.data.code === 2){
                    message.error("用户名已经存在")
                }else if(res.data.code === 0){
                    message.success("更新成功");
                    setVisible(false);
                    allTeacherList();
                }
            }else{
                message.error("更新失败")
            }
        }).catch(error => console.log(error))

    }
    const handleCancel = () =>{
        setVisible(false);
        setTeacherName('');
    }
    const changeTeacherName = (e) =>{
        setTeacherName(e.target.value);
    }
    const onSearchTea = (value)=>{
        if(!value){
            allTeacherList();
        }
        let result=[];
        teaList.forEach(item=>{
            if(item.name.indexOf(value)>-1){
                result.push(item);
            }
        })
        setTeaList(result);
    }
    return(
            <Row>
                <Col span={4}>
                     <Search  enterButton  onSearch={value=>onSearchTea(value)} placeholder="搜索教师" />
                 <p></p>
                </Col>
                <Col span={24}>
                    <Table pagination={{
                        pageSize:9,
                        showQuickJumper:true
                    }} bordered={true}  rowKey={row=>row.id} columns={columns} dataSource={teaList} />
                </Col>
                <Col>
                  <Modal
                    title="编辑教师账号"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Input placeholder="" onChange={(e)=>changeTeacherName(e)}  value={teacherName}/>
                  </Modal>
                </Col>
            </Row>
    )
}

export default TeacherList;