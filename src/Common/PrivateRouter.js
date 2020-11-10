import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect } from 'react-router-dom';
import _ from 'lodash';

/* common */
import { getStorage } from '../Common/utils';
import { loginPass } from '../Common/config';

export default function PrivateRouter ({ component: Component ,children,...rest }) {
    console.log(rest,children);
    let auth = true;

    let pathTarget = '/admin/restaurant';

    const user = getStorage('admin-user');

    if(user) { /* 已经登陆的情况下 */
        /* 不能进入登陆页面 */
        if(rest.path === '/login' || rest.path === '/' ) {
            auth = false;
        }
        /* 当作为游客进入页面的时候 */
        if(user.role === 'visitor'){
            /* 游客不能进入order页面 */
            if(rest.location.pathname === '/admin/order'){
                auth = false;
            }
        }
    }else {/* 没有登陆的情况下 */
        /* 如果在进入已经设置好的页面时，重定向到登陆页面 */
        if(_.indexOf(loginPass,rest.location.pathname) < 0){
            auth = false;
            pathTarget = '/login';
        }
    }

    return (

        <Route { ...rest } render={ ()=>{
            return (

                auth ? <Component routes={ children }/> : <Redirect to={ `${pathTarget}` }></Redirect>
            );

        } } ></Route>

    );

}

PrivateRouter.propTypes = {
    component: PropTypes.func,
    children: PropTypes.array
};
