import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect } from 'react-router-dom';
import _ from 'lodash';

/* common */
import { getStorage } from '../Common/utils';
import { loginPass } from '../Common/passUrl';

export default function PrivateRouter ({ component: Component , ...rest }) {

    let auth = true;

    let pathTarget = '/admin/restaurant';

    const user = getStorage('admin-user');

    if(rest.path === '/'){
        auth = false;
    }

    if(user) {
        console.log(user.role);
        console.log(rest);

        if(rest.path === '/login') {
            auth = false;
        }
        if(user.role === 'visitor'){
            if(rest.location.pathname === '/admin/order'){
                console.log('in');
                auth = false;
            }
        }
    }else {
        if(_.indexOf(loginPass,rest.location.pathname) >= 0){
            auth = false;
            pathTarget = '/login';
        }
    }

    return (

        <Route { ...rest } render={ ()=>{
            return (

                auth ? <Component/> : <Redirect to={ `${pathTarget}` }></Redirect>
            );

        } } ></Route>

    );
}

PrivateRouter.propTypes = {
    component: PropTypes.func
};
