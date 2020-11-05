import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        isError:false,
        message:''
    },
    reducers: {
        showError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        hideError: state => {
            state.isError = false;
        }
    },
});

export const { showError, hideError } = errorSlice.actions;

/** 实时更改error框的message */
export const showErrorAsync = (  message )=>{

    return (dispatch)=>{
        return dispatch(showError( message));
    };
};

export const selectIsError = state => state.error.isError;
export const selectErrorMsg = state => state.error.message;

export default errorSlice.reducer;
