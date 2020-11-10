import React,{ useState,useEffect } from 'react';
import { Switch,Link,useLocation,useHistory,useRouteMatch,Redirect } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

/* style */
import './admin.scss';

/* common */
import { LOGO_URL } from '../../Common/config';
import { removeStorage,getStorage } from '../../Common/utils';
import PrivateRouter from '../../Common/PrivateRouter';

/* anted */
import { Layout,Breadcrumb,Menu ,Button } from 'antd';
import { PieChartOutlined,DesktopOutlined } from '@ant-design/icons';
const { Header, Sider, Content,Footer } = Layout;

export default function Admin ({ routes }) {

    useEffect(() => {
        console.log(location);
        console.log(match);
    }, []);

    const match = useRouteMatch();
    const history = useHistory();
    const user = getStorage('admin-user');

    const [ collapsed,setCollapsed ] = useState(false);

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
    // let renderDefaultKey = ()=>{
    //     if(location.pathname.split('/')[2] === 'restaurant'){
    //         return '1';
    //     }else if(location.pathname.split('/')[2] === 'menu'){
    //         return '2';
    //     }else {
    //         return '3';
    //     }
    // };

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
                    <Menu theme="dark" defaultSelectedKeys={ [ `${location.pathname}` ] }  mode="inline" className="bgc-1F">
                        <Menu.Item key="/admin/restaurant" icon={ <PieChartOutlined /> }>
                            <Link to={ '/admin/restaurant' }>餐馆</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/menu" icon={ <DesktopOutlined /> }>
                            <Link to={ '/admin/menu' }>菜单</Link>
                        </Menu.Item>
                        {user.role != 'visitor' ? <Menu.Item key="/admin/order" icon={ <DesktopOutlined /> }>
                            <Link to={ '/admin/order' }>订单</Link>
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
                                {_.map(routes,(route)=> (
                                    <PrivateRouter { ...route } key={ Math.random() }></PrivateRouter>
                                ))
                                }
                                <Redirect to={ `${match.path}/restaurant` } />
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

Admin.propTypes = {
    routes: PropTypes.array
};