import React from 'react';
import {Descriptions} from 'antd';
import moment from 'moment';
// 面试详情组件
function InterViewDetails(props){
    // 父组件传值给子组件
  const {itemText}=props;
  return(
          <Descriptions title="" column={{xs: 1, sm: 1, md: 1}} layout="horizontal">
              <Descriptions.Item label="学生">{itemText.student_name}</Descriptions.Item>
              <Descriptions.Item label="时间">{moment(itemText.interview_date).format('a h:mm')}</Descriptions.Item>
              <Descriptions.Item label="类型">{itemText.interview_type}</Descriptions.Item>
              <Descriptions.Item label="备注">{itemText.remarks}</Descriptions.Item>
          </Descriptions>
         )
}

export default InterViewDetails;