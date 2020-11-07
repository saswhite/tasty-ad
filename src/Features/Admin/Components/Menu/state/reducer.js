import { createSlice } from '@reduxjs/toolkit';
import { showErrorAsync } from '../../../../../Redux/Reducer/error';
import { Food ,setAvailable } from '../../../../../Request/menu';
import { showLoading,hideLoading } from '../../../../../Redux/Reducer/loading';

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
        }
    },
});

export const { renderFoodList,renderTotal,setRest } = menuSlice.actions;

export const rquestFoodList = (data)=>{
    return async (dispatch)=>{
        try {
            let foodRes = await Food(data);
            dispatch(renderFoodList(foodRes.list));
            dispatch(renderTotal(foodRes.count));

        } catch (error) {
            dispatch(showErrorAsync(error.message));
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
            dispatch(showErrorAsync(error.message));
        }finally{
            dispatch(hideLoading());
        }
    };
};

export const foods = state => state.menu.foodList;
export const totalF = state => state.menu.total;
export const restTar = state => state.menu.rest;

export default menuSlice.reducer;
