import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../Redux/Reducer/loading';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/** scss */
import './loading.scss';

/* img */
// import loadingLocal from '../../Assets/loading.gif';

export default function Loading () {

    const antIcon = <LoadingOutlined style={{ fontSize : 24 }} spin />;
    console.log('loading');
    /* state中获取是否登录 */
    const isLoading = useSelector(selectIsLoading);
    return (
        isLoading  ?
            <div className='loading'>
                <div className='loading-container'>
                    <Spin indicator={ antIcon }/>
                </div>
            </div> : null
    );
}
