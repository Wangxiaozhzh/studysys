import React, { useState ,useImperativeHandle, useEffect } from 'react';
import {Input,Form, DatePicker,Select} from 'antd';
const { TextArea } = Input;
const { Option } = Select;

// 新增面试组件
function RegistrationForm(props){
    // 把父组件传过来的值结构
    const {cRef,stuList} = props;
    useEffect(()=>{
        setStuData(stuList);
    },[stuList])

    const [stuData,setStuData] = useState([]);
    const { getFieldDecorator } = props.form;
    const [confirmDirty,SetConfirmDirty] = useState(false);
    const formItemLayout = {
      labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
      },
      wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: '请输入面试时间' }],
    };
 
    useImperativeHandle(cRef,()=>({
        addInterviewInfo:handleSubmit,
    }));

    const handleSubmit =  (e) => {
        let addInterInfo;
        props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                addInterInfo = 0
            }
            if (!err) {
                console.log('Received values of form: ', values);
                addInterInfo = values;
                props.form.resetFields();
            }
        });
        return addInterInfo;

    };

    const handleConfirmBlur = e => {
      const { value } = e.target;
      SetConfirmDirty(confirmDirty || !!value)
    };
    return (
      <>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="面试学生" hasFeedback>
          {
               getFieldDecorator('id',{
                  rules: [
                    {
                      required: true,
                      message: '请输入学生账号',
                    }
                  ],
               })(<Select>
                        {stuData.map((item,index)=>(
                             <Option key={index} value={item.student_id}>{item.student_name}</Option>
                        ))
                        }
                 
                  </Select>)

          }
         
        </Form.Item>
        <Form.Item label="面试时间" hasFeedback>
          {getFieldDecorator('date_time_picker', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>
        <Form.Item label="面试类型" hasFeedback>
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请输入面试类型',
              }
            ],
          })(<Input onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="备注信息">
        {getFieldDecorator('backInfo', {
            rules: [
              {
                required: false,
                message: '',
              }
            ],
          })(<TextArea rows={2} />)}
        </Form.Item>
      </Form>
      </>
    );
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;