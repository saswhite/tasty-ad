import { createSlice } from '@reduxjs/toolkit';
import { restaurant,updateRest } from '../../../../../Request/restaurant';
import { showErrorAsync } from '../../../../../Redux/Reducer/error';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';

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
            const restRes = await restaurant();

            dispatch(renderRestList(restRes));

        } catch (error) {

            dispatch(showErrorAsync(error.message));
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
            dispatch(showErrorAsync(error.message));
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const restList = state => state.rest.restList;

export default restSlice.reducer;
