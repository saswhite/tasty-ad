import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect } from 'react-router-dom';

export default function PrivateRouter ({ component: Component , ...rest }) {

    let auth = true;

    if(rest.path === '/'){
        auth = false;
    }

    return (

        <Route { ...rest } render={ ()=>{
            return (

                auth ? <Component/> : <Redirect to='/admin/restaurant'></Redirect>
            );

        } } ></Route>

    );
}

PrivateRouter.propTypes = {
    component: PropTypes.func
};
