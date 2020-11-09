import { createSlice } from '@reduxjs/toolkit';
import { Food ,setAvailable } from '../../../../../Request/menu';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';
import { message } from 'antd';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        foodList: [],
        total: 0,
        rest : {}
    },
    reducers: {
        renderFoodList: (state, action) => {
            state.foodList = action.payload;
        },
        renderTotal: (state, action) => {
            state.total = action.payload;
        },
        setRest: (state, action) => {
            state.rest = action.payload;
        },
        clearList: state=>{
            state.foodList = {};
            state.total = 0;
        }
    },
});

export const { renderFoodList,renderTotal,setRest,clearList } = menuSlice.actions;

export const rquestFoodList = (data)=>{
    return async (dispatch)=>{
        try {
            dispatch(showLoading());
            let foodRes = await Food(data);
            dispatch(renderFoodList(foodRes.list));
            dispatch(renderTotal(foodRes.count));

        } catch (error) {
            message.error(error.message);
        }finally{
            dispatch(hideLoading());
        }
    };
};
export const updateFood = (data,pageIn)=>{
    return async (dispatch)=>{
        try {
            dispatch(showLoading());
            await setAvailable(data);
            let foodRes = await Food(pageIn);
            dispatch(renderFoodList(foodRes.list));
            dispatch(renderTotal(foodRes.count));

        } catch (error) {
            message.error(error.message);
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const foods = state => state.menu.foodList;
export const totalF = state => state.menu.total;
export const restTar = state => state.menu.rest;

export default menuSlice.reducer;
