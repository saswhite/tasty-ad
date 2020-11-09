import React,{ useState } from 'react';
import { Switch,Route,Link,useRouteMatch,useLocation,useHistory } from 'react-router-dom';

/* style */
import './admin.scss';

/* common */
import { LOGO_URL } from '../../Common/img_url';
import { removeStorage,getStorage } from '../../Common/utils';

/* component */
import menuCom from './Components/Menu/Menu';
import restCom from './Components/Restaurant/Restaurant';
import orderCom from './Components/Order/Order';

/* anted */
import { Layout,Breadcrumb,Menu ,Button } from 'antd';
import { PieChartOutlined,DesktopOutlined } from '@ant-design/icons';
const { Header, Sider, Content,Footer } = Layout;

export default function Admin () {

    const history = useHistory();
    const user = getStorage('admin-user');

    const [ collapsed,setCollapsed ] = useState(false);

    const { path,url } = useRouteMatch();

    const location = useLocation();

    /* 侧边栏的拉开和合拢 */
    let onCollapse = ()=>{
        setCollapsed(!collapsed);
        console.log(location.pathname.split('/')[2]);
    };

    /* 对当前url地址的处理 */
    let renderLocation = ()=>{
        let title = location.pathname;
        return title != '/admin' ? title.split('/')[2].charAt(0).toUpperCase() + title.split('/')[2].slice(1) : '';
    };

    /* 设置默认的key */
    let renderDefaultKey = ()=>{
        if(location.pathname.split('/')[2] === 'restaurant'){
            return '1';
        }else if(location.pathname.split('/')[2] === 'menu'){
            return '2';
        }else {
            return '3';
        }
    };

    return (
        <div className="admin">
            <Layout style={{ minHeight : '100vh' }}>
                <Sider
                    collapsible
                    collapsed={ collapsed }
                    onCollapse={ onCollapse }
                    className="bgc-1F main-sider">
                    <div className="logo" >
                        <img  src={ LOGO_URL } className="logo-img"/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={ [ renderDefaultKey() ] } mode="inline" className="bgc-1F">
                        <Menu.Item key="1" icon={ <PieChartOutlined /> }>
                            <Link to={ `${url}/restaurant` }>餐馆</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={ <DesktopOutlined /> }>
                            <Link to={ `${url}/menu` }>菜单</Link>
                        </Menu.Item>
                        {user.role != 'visitor' ? <Menu.Item key="3" icon={ <DesktopOutlined /> }>
                            <Link to={ `${url}/order` }>订单</Link>
                        </Menu.Item> : null}
                    </Menu>
                    <Button
                        className="logout-btn"
                        onClick={ ()=>{
                            removeStorage('admin-user');
                            history.push('/login');
                        } }>登出</Button>
                </Sider>
                <Layout className="site-layout bgc-00">
                    <Header className="site-layout-background bgc-1F" style={{ padding : 0 }} />
                    <Content style={{ margin : '0 16px' }}>
                        <Breadcrumb style={{ margin : '16px 0' }} className="left">
                            <Breadcrumb.Item className="col-45 fw">Admin</Breadcrumb.Item>
                            <Breadcrumb.Item className="col-85 fw">{renderLocation()}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding : 24, minHeight : 360 }}>
                            <Switch>
                                <Route path={ `${path}/restaurant` } component={ restCom }/>
                                <Route path={ `${path}/menu` } component={ menuCom }/>
                                <Route path={ `${path}/order` } component={ orderCom }/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer
                        className="bgc-00"
                        style={{ textAlign : 'center',color : 'hsla(0,0%,100%,.85)' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div>
    );
}
