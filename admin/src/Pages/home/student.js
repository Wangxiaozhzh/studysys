import React, { useEffect } from 'react';
import {getStudent} from '../../Config/httpRouter';
import {message} from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
 
function Student(){
    let result =[];
    // 获取学生列表
    const getAllStudent = ()=>{
            getStudent().then(res=>{
                if(res.status===200 && res.data.code === 0){
                    result = res.data.datas;
                }else{
                    message.error(res.message);
                }
            }).then(()=>{
                chart1();
            })
    }
    useEffect(()=>{
        getAllStudent();
    },[]);
    const chart1 = ()=>{
        var datas=[
            [0,0], //记录国内的开发和测试
            [0,0],//记录新西兰的开发和测试
            [0,0],//记录澳洲的开发和测试
            [0,0],//记录加拿大的开发和测试
        ];
        result.forEach(e => {
            switch (e.adress) {
                case "国内":
                    e.course_type === "测试" ? datas[0][1]++ : datas[0][0]++;
                    break;
                case "新西兰":
                    e.course_type === "测试" ? datas[1][1]++ : datas[1][0]++;
                    break;
                case "澳洲":
                    e.course_type === "测试" ? datas[2][1]++ : datas[2][0]++;
                    break;
                case "加拿大":
                    e.course_type === "测试" ? datas[3][1]++ : datas[3][0]++;
                    break;
            }
        });
        
        const debounce = (func,delay)=>{
            let timer  = null;
            return function (...args){
                if(timer) clearTimeout(timer)
                timer = setTimeout(()=>{
                    func.apply(this,args)
                },delay)
            }
        }
        const mainDiv = document.getElementById('main');
        if(mainDiv){
            const myChart = echarts.init(mainDiv);

            // 图表自适应 
            window.addEventListener("resize",debounce(myChart.resize,300))
            // 绘制图表
            myChart.setOption({
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    type: 'plain',          // 普通图例
                    orient: 'horizontal',   // 水平
                    left:0,               // 左距离
                    top: 0,                // 上距离
                    bottom: 20,             // 下距离
                    width:400,              // 宽度
                    itemGap: 10,            // 间隔
                    itemWidth: 24,          // 图形宽度。
                    itemHeight: 24,         // 图形高度。
                    data: ['国内', '新西兰','澳洲','加拿大']
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    top:'15%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['测试','开发']
                },
                series: [
                    {
                        name: '国内',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        barWidth : 100,//柱图宽
                        data: datas[0]
                    },
                    {
                        name: '新西兰',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: datas[1]
                    },
                    {
                        name: '澳洲',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: datas[2]
                    },
                    {
                        name: '加拿大',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: datas[3]
                    }
                ]
            });
        }
    }
    return(
        <div className='divWrap'>
            <h1 style={{marginBottom:50}}>学生人数分布情况</h1>
            <div id="main" style={{height: 500 }}></div>
        </div>
    )
}

export default Student;