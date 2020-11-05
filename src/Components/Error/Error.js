import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { selectErrorMsg, selectIsError ,hideError } from '../../Redux/Reducer/error';
import { get } from '../../Common/Intl';

/** scss */
import './error.scss';

export default function Error () {
    const isError = useSelector(selectIsError);
    const msg = useSelector(selectErrorMsg);

    const dispatch = useDispatch();

    /** 关闭error模态框 */
    function hideErrorModal (){
        dispatch(hideError());
    }

    return (
        isError ?
            <div className='error'>
                <div className='error-container'>
                    <div className='error-modal-box containerCol space-between vertical'>
                        <div>{ msg }</div>
                        <button className='normal-btn' onClick={  hideErrorModal }>{ get('close') }</button>
                    </div>
                </div>
            </div> : null
    );
}
