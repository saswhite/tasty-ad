import React from 'react';

/* pages */
import Admin from '../Features/Admin/Admin';
import Login from '../Features/Login/Login';

export const routerConfig = [

    {
        path:'/admin',
        component: Admin
    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/',
        component:()=>{
            return(
                <div>111</div>
            );
        }
    },
    {
        path:'*',
        component:()=>{
            return (
                <div>404</div>
            );
        }
    },
];