import { createSlice } from '@reduxjs/toolkit';

export const intlSlice = createSlice({
    name: 'intl',
    initialState: {
        lan: 'zh-CN'
    },
    reducers: {
    /* 显示loading */
        setLan:(state,action) => {
            state.lan = action.payload;
        },
    },
});

export const { setLan } = intlSlice.actions;

export const initLan = state => state.intl.lan;

export default intlSlice.reducer;
