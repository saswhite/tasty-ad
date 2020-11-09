import { createSlice } from '@reduxjs/toolkit';
import { order } from '../../../../../Request/order';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';
import moment from 'moment';
import _ from 'lodash';
import { message } from 'antd';

export const orderSlice = createSlice({
    name: 'menu',
    initialState: {
        orderData:[],
        numData: [],
        perData:[]
    },
    reducers: {
        renderOrderData: (state, action) => {
            state.orderData = action.payload;
        },
        setNumData :(state, action) => {
            let arr = [];
            _.forEach(action.payload,(item)=>{
                arr.push(moment(item.createdAt).format('YYYY-MM-DD'));
            });
            let numSource = [];
            _.forIn(_.groupBy(arr),(value,key)=>{
                numSource.push([ key,value.length ]);
            });
            console.log(numSource);
            state.numData = numSource;
        },
        setPerData :(state, action) => {
            let arr = [];
            _.forEach(action.payload,(item)=>{
                arr.push(item.user.username);
            });
            let perSource = [];
            _.forIn(_.groupBy(arr),(value,key)=>{
                perSource.push([ key,value.length ]);
            });
            state.perData = perSource;
        },
    },
});

export const { renderOrderData,setNumData,setPerData } = orderSlice.actions;

export const rquestOrderData = (date)=>{
    return async (dispatch)=>{
        try {
            dispatch(showLoading());
            let orderRes = await order(date);
            console.log(orderRes);
            dispatch(renderOrderData(orderRes));
            dispatch(setNumData(orderRes));
            dispatch(setPerData(orderRes));
        } catch (error) {
            message.error(error.message);
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const orderInfo = state => state.order.orderData;
export const numInfo = state => state.order.numData;
export const perInfo = state => state.order.perData;

export default orderSlice.reducer;
