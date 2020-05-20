import React,{useState,useEffect} from 'react';
import {Input,Modal,Row,Col,Table, message, Button} from 'antd'
import {allCourseType,updateCourseType,deleteCourseTypeById,addCourseType} from '../../Config/httpRouter'
const {Search} = Input;
const {confirm} =Modal;
function CourseType(){
    const [typeId,setTypeId] = useState(0);//为0的时时候新增，1的时候编辑
    const [courseType,setCourseType]=useState([]);
    const [loading,setLoading] = useState(false);
    const [CourseName,SetCourseName] = useState('');
    const [CourseTypeId,setCourseTypeId] = useState('')
    const [visible,setVisible] = useState(false);
    const [titleText,setTitleText] = useState('');
    const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          render:(text,record,index)=>`${index+1}`,
          width:'10%',
        },
        {
          title: 'ID',
          dataIndex: 'id',
          width:'20%',
        },
        {
          title: '名称',
          dataIndex: 'name',
          width:'45%',
        },
        {
          title: '操作',
          dataIndex:'actions',
          render:(text,record) => (
            <span>
              <Button onClick={()=>updateCourType(record)}>编辑</Button>
              <Button style={{paddingLeft:10}} onClick={(e)=>DeleteCourseType(record)}>删除</Button>
            </span>
          )
        },
      ];
      
      useEffect(()=>{
        getAllCourseType();
      },[])

      // 获取课程类型list
      const getAllCourseType = ()=>{
        setLoading(true);
        allCourseType().then((res)=>{
          if(res.status===200){
                let data = res.data.datas;
                setLoading(false);
                setCourseType(data);
            }
        })
      };

      // 新增课程类型
      const newCourse = () =>{
        setVisible(true)
        setTypeId(0);
        setTitleText("新增课程类型");
      }
      // 更新课程类型
      const updateCourType =(record)=>{
        let id=record.id;
        let name = record.name;
        setTypeId(1);
        setVisible(true);
        setCourseTypeId(id);
        SetCourseName(name); 
        setTitleText("编辑课程类型");
      }

      // 根据id删除当前课程类型
      const DeleteCourseType = (record)=>{
        let params={
          id:record.id
        }
        confirm({
          title:'确认要删除该条信息吗！',
          content:"删除信息后，信息将永久删除，不可恢复！",
            onOk(){
             deleteCourseTypeById(params).then(res=>{
                if(res.status===200 && res.data.code===0){
                    getAllCourseType();
                    message.success('删除成功');
                    return
                }else{
                  message.error("删除失败")
                }
              }).catch(error=>console.log(error))
            },
            onCancel(){
              message.success("没有任何改变")
            }
        })
      };

      // 保存修改
      const handleOk = ()=>{
        if(CourseName===""){
            message.error("请输入正确的课程类型")
            return
        }
        let dataprops ={
          name:CourseName
        }
        // 新增
        if(typeId === 0){
            addCourseType(dataprops).then(res => {
              if(res && res.status === 200){
                  if(res.data.code === 0){
                      message.success("添加课程类型成功");
                      SetCourseName('');
                      setVisible(false);
                      getAllCourseType();
                  }else if(res.data.code === 9){
                      message.error("课程类型已存在");
                  }
              }else{
                message.error('新增失败')
              }
            }).catch(error => console.log(error))
        }else{
          // 更新课程类型
          dataprops.id = CourseTypeId
          updateCourseType(dataprops).then(res => {
            if (res && res.status === 200) {
              if (res.data.code === 0) {
                message.success('更新成功');
                setVisible(false);
                getAllCourseType();
                SetCourseName('');
                return
              } else if (res.data.code === 9) {
                message.error("课程类型已存在");
              }
            }else{
              message.error("更新失败")
            }
          }).catch(error=>console.log(error))
        }

      }
      // 取消修改
      const handleCancel = ()=>{
        setVisible(false);
        SetCourseName('');
      }
      // 搜索
      const onSearchStu = (value) => {
        if (!value) {
            getAllCourseType();
        }
        let result = [];
        courseType.forEach(item => {
          if (item.name.indexOf(value) > -1) {
            result.push(item)
          }
        })
        setCourseType(result);
      }
      const [studentListColumns]=useState(columns);
      
      const changeCourseType = (e)=>{
        SetCourseName(e.target.value);
      }
    return(
            <Row>
                <Col span={4}>
                 <Search placeholder="课程类型" onSearch={value=>onSearchStu(value)} enterButton />
                 <p></p>
                </Col>
                <Col span={16}></Col>
                <Col span={4}><Button type="primary" onClick={newCourse}>+ 添加</Button></Col>
                <Col span={24}>
                    <Table bordered={true} 
                    pagination={{
                      pageSize:9,
                      showQuickJumper:true
                    }}
                    rowKey={row=>row.id}  loading={loading} columns={studentListColumns} dataSource={courseType} />
                </Col>
                <Col>
                  <Modal
                    title={titleText}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Input placeholder="" onChange={(e)=>changeCourseType(e)}  value={CourseName}/>
                  </Modal>
                </Col>
            </Row>
    )
}

export default CourseType;