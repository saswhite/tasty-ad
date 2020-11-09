import { createSlice } from '@reduxjs/toolkit';
import { restaurant,updateRest } from '../../../../../Request/restaurant';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';
import { message } from 'antd';
import _ from 'lodash';

export const restSlice = createSlice({
    name: 'restaurant',
    initialState: {
        restList: [],
    },
    reducers: {
        renderRestList: (state, action) => {
            state.restList = action.payload;
        },
        updateRestList: (state,action) => {
            state.restList = action.payload;
        }
    },
});

export const { renderRestList,updateRestList } = restSlice.actions;

export const sendRequestRest = ()=>{

    return async (dispatch)=>{

        try {
            dispatch(showLoading());
            const restRes = await restaurant();

            dispatch(renderRestList(restRes));

        } catch (error) {

            message.error(error.message);
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const postUpdateRest = (item)=>{
    return async (dispatch)=>{
        try {
            dispatch(showLoading());
            let newData = {
                id:item._id,
                data:{
                    ..._.omit(item,'_id')
                }
            };
            await updateRest(newData);
            const restRes = await restaurant();

            dispatch(updateRestList(restRes));

        } catch (error) {
            message.error(error.message);
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const restList = state => state.rest.restList;

export default restSlice.reducer;
