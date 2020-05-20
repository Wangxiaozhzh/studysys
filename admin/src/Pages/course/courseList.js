import React ,{useState,useEffect}from 'react';
import {Input,Row,Col,Table,Modal, message,Select,Button} from 'antd'
import {findAllCourseList,deleteCourseById,allCourseType} from '../../Config/httpRouter'
const {confirm} =Modal;
const { Search } = Input;
function CourseList(props){
    const { Option } = Select;
    const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          render:(text,record,index)=>`${index+1}`,
        },
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '课程分类',
          dataIndex: 'course_name',
        },
        {
            title: '课程名称',
            dataIndex:'name'
        },
        {
            title: '视屏ID',
            dataIndex:'uid'
        },
        {
          title: '操作',
          dataIndex:'actions',
          render:(text,record) => (
            <span>
              <Button onClick={e=>updateCourse(record)}>编辑</Button>
              <Button style={{paddingLeft:10}} onClick={(e)=>delCourseById(record)}>删除</Button>
            </span>
          )
        },
      ];
      
      const [courseList,SetCourseList] = useState([]);
      const [courseArray,setCourseArray] = useState([]);
      const [studentListColumns]=useState(columns);
      const [courseTypeList,setCourseTypeList] = useState([]);
      const [courseType,setCourseType] = useState('');


      useEffect(()=>{
        getCourseList();
        getAllCourseType();
      },[])
        // 编辑
      const updateCourse = (record) => {
        let id = record.id;
        props.history.push('/course/addCourse/'+id);
      }
      // 删除课程
      const delCourseById = (record)=>{
          let dataprops = {id:record.id};
          confirm({
            title:'确认要删除该条课程信息吗！',
            content:"删除信息后，信息将永久删除，不可恢复！",
            onOk(){
                deleteCourseById(dataprops).then(res=>{
                    if(res && res.status === 200 && res.data.code===0){
                        getCourseList();
                        message.success("删除课程成功")
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            onCancel(){
              message.success("没有任何改变")
            }
          })
      }

    //  获取所有课程类型
      const getCourseList = ()=>{
        findAllCourseList().then(res=>{
          SetCourseList(res.data.datas);
          setCourseArray(res.data.datas)
        })
      }
    // 获取所有课程列表
      const getAllCourseType=()=>{
          allCourseType().then(res=>{
            if(res.status===200 && res.data.code===0){
                setCourseTypeList(res.data.datas);
            }else{
                message.error(res.message);
            }
          })
      }
    // 选择课程类型
    const selectType = (value)=>{
        setCourseType(value);
    }
    // 搜索课程
    const searchCourse = (value)=>{
      let arr = [];
      if (!value) {
            if(courseType !== ''){
                courseArray.forEach(e => {
                    if (courseType === e.typeId) {
                        arr.push(e)
                    }
                })
                if (arr.length === 0 && courseType === undefined) {
                    SetCourseList(courseArray)
                } else {
                    SetCourseList(arr)
                }
            }else if(courseType === ''){
                    SetCourseList(courseArray);
            }
      }else{
          if (courseType !== ''&& courseType !== undefined) {
              console.log(1)
              courseArray.forEach(e => {
                  if (courseType === e.typeId && e.name.indexOf(value) > -1) {
                      arr.push(e)
                  }
              })
          }else{
                courseArray.forEach(e => {
                    if (e.name.indexOf(value) > -1) {
                        arr.push(e)
                    }
                })
          }
          SetCourseList(arr);
      }
    }
    return(
            <>
              <Row gutter={10}>
                  <Col span={4}>
                      <Select allowClear style={{ width: '100%' }} onChange={selectType}>
                          {courseTypeList.map(item=>(
                              <Option key={item.id}>{item.name}</Option>
                          ))}
                      </Select>
                  </Col>
                  <Col span={4}>
                      <Search
                        placeholder="课程名称"
                        onSearch={searchCourse}
                        style={{ width: '100%' }}
                      />
                  </Col>
              </Row>
              <p></p>
              <Row>
                  <Col span={24}>
                      <Table pagination={{
                          pageSize:9,
                          showQuickJumper:true
                      }} bordered={true} rowKey={row=>row.id} columns={studentListColumns} dataSource={courseList} />
                  </Col>
              </Row>
            </>
    )
}

export default CourseList;