import React,{useState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom"
import '../Static/Css/adminIndex.css';
import { Layout, Menu, Icon } from 'antd';
import allMenu from '../Data/menu'
import Contents from '../Components/Content'
import MyBreadcrumb from '../Components/myBreadcrumb';
import UserInfo from '../Components/userInfo'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(){
    const [collapsed,setCollapsed]=useState(false);
    const onCollapse = collapsed => {
         setCollapsed(collapsed)
    };
   
    return (
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
              <div className="logo">
                <p>React</p>
              </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {allMenu.map(subMenu => {
                  if (subMenu.children && subMenu.children.length) {
                    return (
                      <SubMenu
                        key={subMenu.url}
                        title={
                          <span>
                            <Icon type={subMenu.icon} />
                            <span>{subMenu.name}</span>
                          </span>
                        }
                      >
                        {subMenu.children.map(menu => (
                          <Menu.Item key={menu.url}>
                            <Link to={`/${menu.url}`}>{menu.name}</Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    )
                  }
                  return (
                    <Menu.Item key={subMenu.url}>
                      <Link to={`/${subMenu.url}`}>
                        <Icon type={subMenu.icon} />
                        <span>{subMenu.name}</span>
                      </Link>
                    </Menu.Item>
                  )
                })}
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ padding: 0 }}>
                  <UserInfo />
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <MyBreadcrumb></MyBreadcrumb>
                <div style={{ padding: 24, minHeight: 360,maxHeight:800,overflow:'auto' }}>
                    <Contents />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center',background:'#001529',color:'#fff' }}>xxx管理系统</Footer>
            </Layout>
          </Layout>
        </Router>
    );

}

export default AdminIndex;  


