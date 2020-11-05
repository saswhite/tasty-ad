import { createSlice } from '@reduxjs/toolkit';
import { tags } from '../../Request/modal';
import { showErrorAsync } from '../Reducer/error';
import _ from 'lodash';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false,
        modalText: { 'zh-CN': '上海小面', 'en-US': 'Taste of Shanghai', 'zh-HK': '上海小麵' },
        initTags:[ 'noodle' ],
        restItem: {}
    },
    reducers: {
        showModal: (state,action) => {
            state.isShow = true;
            state.modalText = action.payload.name;
            state.initTags = action.payload.tags;
            state.restItem = action.payload;
        },
        hideModal: state => {
            state.isShow = false;
        },
        renderTags: (state,action)=>{
            state.tags = action.payload;
        },
        updateTags: (state,action)=>{
            state.initTags = [ ...state.initTags,action.payload ];
            console.log(state.initTags);
        },
        closeTags: (state,action)=>{
            let clone = _.cloneDeep(state.initTags);
            clone.splice(action.payload,1);
            state.initTags = clone;
            console.log(state.initTags);
        }
    },
});

export const { showModal, hideModal,renderTags,updateTags,closeTags } = modalSlice.actions;

export const isShow = state => state.modal.isShow;

export const data = state => state.modal.modalText;

export const tagList = state => state.modal.tags;

export const tag = state => state.modal.initTags;

export const restInfo = state => state.modal.restItem;

export const sendRequestTags = ()=>{

    return async (dispatch)=>{

        try {
            const tagsRes = await tags();

            dispatch(renderTags(tagsRes));

        } catch (error) {

            dispatch(showErrorAsync(error.message));
        }
    };
};

export const updateRestInfo = ()=>{
    return ()=>{

    };
};

export default modalSlice.reducer;
