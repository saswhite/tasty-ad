import React,{ useState } from 'react';
import { Switch,Link,useLocation,useHistory,useRouteMatch,Redirect } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

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

    const match = useRouteMatch();
    const history = useHistory();
    const user = getStorage('admin-user');

    const [ collapsed,setCollapsed ] = useState(false);

    const location = useLocation();

    /* 侧边栏的拉开和合拢 */
    let onCollapse = ()=>{
        setCollapsed(!collapsed);
    };

    /* crumb */
    let renderLocation = ()=>{
        let title = location.pathname;
        console.log(title.split('/'));
        return _.map(title.split('/'),(item,index)=>{
            console.log(_.capitalize(item));
            if(index === 1){
                return (<Breadcrumb.Item key={ v4() } className="col-45 fw">{_.capitalize(item)}</Breadcrumb.Item>);
            } else if(index > 1){
                return ( <Breadcrumb.Item key={ v4() } className="col-85 fw">{_.capitalize(item)}</Breadcrumb.Item>);
            }
        });
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
                    <Menu theme="dark" defaultSelectedKeys={ [ `${location.pathname}` ] }  mode="inline" className="bgc-1F">
                        <Menu.Item key={ `${match.path}/restaurant`  } icon={ <PieChartOutlined /> }>
                            <Link to={ `${match.path}/restaurant`  }>餐馆</Link>
                        </Menu.Item>
                        <Menu.Item key={ `${match.path}/menu`  } icon={ <DesktopOutlined /> }>
                            <Link to={ `${match.path}/menu`  }>菜单</Link>
                        </Menu.Item>
                        {user.role != 'visitor' ? <Menu.Item key={ `${match.path}/order`  } icon={ <DesktopOutlined /> }>
                            <Link to={ `${match.path}/order`  }>订单</Link>
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
                            {renderLocation()}
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