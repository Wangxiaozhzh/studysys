import React, { useState ,useEffect ,useRef} from 'react';
import {Modal, Calendar, Badge,Button, message} from 'antd';
import '../../Static/Css/interviewMaster.css';
import {findInterviewsByMonth,getStudent, addInterview,deleteInterview} from '../../Config/httpRouter';
import moment from 'moment';
import InterViewDetails from './interviewDetails';
import WrappedRegistrationForm from './addInterview'
const {confirm} =Modal;
function InterviewMaster(){
    const [visible,setVisible] =useState(false);
    const [visible2,setVisible2] =useState(false);
    const [currentData,setCurrentData] = useState('');
    const [MonthDatas,setMonthDatas] = useState({}); //当前月份
    const [stuList,setStuList] = useState([]);
    const [itemText,setItemText] = useState('');
    useEffect(()=>{
        getAllStudent();
        setTimeout(()=>{
            dateChange({_d:new Date()});
        },100)
    },[])
  
    // 自定义渲染日期单元格
    const dateCellRender = (value) =>{
        const handleClick = (item,e) => {
            // console.log(item)
            setItemText(item);
            setVisible2(true);
            e.stopPropagation();       
          }
        return (
          <ul className="events">
            {getListData(value).map(item => (
                <li onClick={e=>handleClick(item,e)} key={item.id}>
                    <Badge status={item.type} text={moment(item.interview_date).format('a h:mm') + item.student_name} />
                </li>
            ))}
          </ul>
        );
    };
    const dateChange = (date)=>{
        setCurrentData(transDate(date._d));
        let dataProps = {
            interview_date:date._d
        }
        findInterviewsByMonth(dataProps).then(res => {
            if(res.status === 200 && res.data.code === 0){
                let obj = {};
                res.data.datas.map(e=>{
                    let currentDate = (new Date(e.interview_date));
                    let d = currentDate.getDate();
                    if(!obj[d]){
                        obj[d] = [];
                    }
                    // 根据日期不同显示不同的状态
                    if(new Date()>currentDate){
                        e.type = 'success';
                    }else if(new Date().getDate === d){
                        e.type = 'error';
                    }else{
                        e.type = 'warning';
                    }
                    e.interview_date = currentDate;
                    obj[d].push(e);
                })
                setMonthDatas(obj);
            }else{
                message.error(res.message);
                return
            }
        })
    }

    // 日期转换为月份字符串
    const transDate = (date) => {
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1; //2020-03
        if(month < 10){
            month = "0" + month;
        }
        return year + "-" + month
    }

    // 获取当日数据
    const getListData = (value) => {
        if(currentData !== transDate(value._d)){
            return [];
        }
        return MonthDatas[value.date()] || []
    }
    const onSelect = ()=>{
        setVisible(true);
    };
    const handleOk = ()=>{
        // 父组件调用新增子组件表单提交方法
        let addInterInfo = childRef.current.addInterviewInfo();
        if(addInterInfo !== 0){
            let addInterDatas = {
                student_id:addInterInfo.id,
                interview_date:addInterInfo.date_time_picker,
                interview_type:addInterInfo.type,
                remarks:addInterInfo.backInfo
            }
            // 新增面试
            addInterview(addInterDatas).then(res=>{
                if(!res || res.error){
                    message.error(res.error)
                }
                setVisible(false);
                let oldDate = new Date(currentData);
                dateChange({_d:oldDate});
            })
        }
    
    };
    const handleOk2 = ()=>{
        let deleteId = {interview_id:itemText.id};
        confirm({
            title:'确认要删除该条面试信息吗！',
            content:"删除信息后，信息将永久删除，不可恢复！",
            onOk(){
                deleteInterview(deleteId).then(res => {
                    if(res && res.status === 200 && res.data.code === 0){
                        setVisible2(false);                
                        message.success("删除成功");
                        let oldDate = new Date(currentData);
                        dateChange({_d:oldDate});
                    }else{
                        message.error("删除失败");
                    }
                }).then(err => console.log(err))
            },  
            onCancel(){
                message.info("没有任何改变")
            }
        })
    };
    const handleCancel = ()=>{
      setVisible(false);
    }
    const handleCancel2 = ()=>{
      setVisible2(false);
    }

    // 定义一个childRef，用来给父组件获取调用子组件（新增面试）的方法
    const childRef = useRef();

    // 获取所有学生列表
    const getAllStudent = ()=>{
        getStudent().then(res=>{
            if(!res && res.error){
                message.error(res.error);
            }
            setStuList(res.data.datas);
        })
    }
      return (
          <>  
              <div>
                  <Calendar onSelect={onSelect} onChange={dateChange} dateCellRender={dateCellRender}  />
              </div>
              <div>
                <Modal
                        title="添加面试"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                <WrappedRegistrationForm stuList = {stuList} cRef = {childRef} />
                </Modal>
                <Modal
                      title="面试详情"
                      visible={visible2}
                      onOk={handleOk2}
                      onCancel={handleCancel2}
                      footer={[
                        <Button key="back" onClick={handleCancel2}>
                          取消
                        </Button>,
                        <Button key="删除" type="danger"  onClick={handleOk2}>
                          删除
                        </Button>,
                      ]}
                    >
                   <InterViewDetails itemText={itemText}/>
                </Modal>

              </div>
          </>
      )
}
export default InterviewMaster;