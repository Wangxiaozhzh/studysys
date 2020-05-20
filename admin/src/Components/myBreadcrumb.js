import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import breadCrumbMap from '../Data/breadcrumb'

const MyBreadcrumb = withRouter((props)=>{
    const {location} = props;
    const breadcrumbMap = breadCrumbMap;

    // 获取url的pathname;
    const url = location.pathname;
    // 获取breadcrumbMap中对应的名称
    const nameItem = breadcrumbMap[url]

    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
             后台管理系统
            </Breadcrumb.Item>
        ),(<Breadcrumb.Item key={url}>
        <Link to={url}>
          {nameItem}
        </Link>
      </Breadcrumb.Item>)]
    
    return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbItems}
            </Breadcrumb>
    );


})


export default MyBreadcrumb;