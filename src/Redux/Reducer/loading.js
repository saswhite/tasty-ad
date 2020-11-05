import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading:false
    },
    reducers: {
    /* 显示loading */
        showLoading:state => {
            state.isLoading = true;
        },
        /* 隐藏loading */
        hideLoading: state => {
            state.isLoading = false;
        },
    },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export const selectIsLoading = state => state.loading.isLoading;

export default loadingSlice.reducer;
