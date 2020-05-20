import React, { useEffect } from 'react';
import {findAllCourseList,allCourseType} from '../../Config/httpRouter'
import {message} from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import"echarts/lib/component/legend";
 
function Course(){
    let categorys=[];
    let allDatas = [];
    useEffect(()=>{
        findAllCourseType();
        getAllCourse();
    },[])
    // 获取所有课程
    const getAllCourse  = () => {
        findAllCourseList().then(res => {
            if(res.status === 200 && res.data.code === 0){
                allDatas = res.data.datas.map(e => {
                    e.category = filterType(e.typeId);
                    return e;
                })
            }else{
                message.error('获取课程列表数据失败')
            }
          
        }).then(()=>{
            chart1()
        })
    }
    // 获取所有课程类型
    const findAllCourseType = ()=> {
        allCourseType().then(res=>{
            if(res.status === 200 && res.data.code === 0){
                categorys = res.data.datas;
            }else{
                message.error('获取课程列表数据失败')
            }
        })
    }
    // 过滤课程列表，给课程列表新增一个category属性
    const filterType =(id)=>{
        let rs = categorys.find(e => e.id===id);
        return rs ? rs.name : "无"
    }
    const chart1 = ()=>{
        let datas = [];
        let legends = categorys.map(e=>{
            datas.push({
                value:0,
                name:e.name
            });
            return e.name
        })
        // 对比课程类型的名称和课程列表名称，如果对此出现递增
        allDatas.forEach(e=>{
            datas.forEach(o=>{
                if(e.category === o.name){
                    o.value++;
                }
            })
        })
        const debounce = (func,delay)=>{
            let timer  = null;
            return function (...args){
                if(timer) clearTimeout(timer)
                timer = setTimeout(()=>{
                    func.apply(this,args)
                },delay)
            }
        }
        const courseDiv  = document.getElementById('course');
        if(courseDiv){
            const myChart = echarts.init(courseDiv);
          // 图表自适应
            window.addEventListener("resize",debounce(myChart.resize,300))
            
            // 绘制图表
            myChart.setOption({
                title : {
                text: '课程分类情况统计',
                subtext: '',
                x:'center',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show:true,
                orient: 'vertical',
                left: 50,
                top:150,
                data:legends
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '60%'],
                    data:datas,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            });
        }
        
    }
    return(
        <div className='divWrap'>
            <h1>课程统计</h1>
            <div id="course" style={{height: 600 }}></div>
        </div>
    )
}

export default Course;