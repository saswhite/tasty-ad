import { createSlice } from '@reduxjs/toolkit';
import { restaurant,updateRest } from '../../../../../Request/restaurant';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';
import { message } from 'antd';

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

            await updateRest(item);
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
