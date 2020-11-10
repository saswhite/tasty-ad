import React from 'react';

/* pages */
import Admin from '../Features/Admin/Admin';
import Login from '../Features/Login/Login';

/* children */
import Rest from '../Features/Admin/Components/Restaurant/Restaurant';
import Menu from '../Features/Admin/Components/Menu/Menu';
import Order from '../Features/Admin/Components/Order/Order';

export const routerConfig = [

    {
        path:'/admin',
        component: Admin,
        children: [
            {
                path:'/admin/restaurant',
                component: Rest
            },
            {
                path:'/admin/menu',
                component: Menu
            },
            {
                path:'/admin/order',
                component: Order
            },
        ]
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