import { createSlice } from '@reduxjs/toolkit';
import { tags } from '../../Request/modal';
import _ from 'lodash';
import { restaurant,updateRest } from '../../Request/restaurant';
import { updateRestList } from '../../Features/Admin/Components/Restaurant/state/reducer';
import { message } from 'antd';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false,
        restItem: {},
        tags:[],
        restTitle: []
    },
    reducers: {
        /* 显示modal框 */
        showModal: (state,action) => {
            state.isShow = true;
            state.restItem = action.payload;
            state.restTitle = action.payload.name;
        },
        /* 隐藏modal框 */
        hideModal: state => {
            state.isShow = false;
        },
        /* 获取所有标签 */
        renderTags: (state,action)=>{
            state.tags = action.payload;
        },
        /* 更新标签 */
        updateTags: (state,action)=>{
            let clone = _.cloneDeep(state.restItem.tags);
            clone.push(action.payload);
            state.restItem.tags = clone;
            console.log( state.restItem.tags);
        },
        /* 去除标签 */
        closeTags: (state,action)=>{
            let clone = _.cloneDeep(state.restItem.tags);
            clone.splice(action.payload,1);
            state.restItem.tags = clone;
            console.log(state.restItem.tags);
        },
        /* 保存要改变的餐馆标题 */
        updateInputTitle: (state,action)=>{
            let clone = _.cloneDeep(state.restTitle);
            clone[`${action.payload.lang}`] = action.payload.value;
            state.restTitle[`${action.payload.lang}`] = clone[`${action.payload.lang}`];
            console.log(state.restTitle[`${action.payload.lang}`]);
        },
        /* 更新时间 */
        updateDateTime: (state,action)=>{
            let clone = _.cloneDeep(state.restItem.hours);
            let week = 0;
            if(action.payload.dayOfWeek === 0){
                week = 7;
            }else {
                week = action.payload.dayOfWeek;
            }
            if(clone.length < week){
                clone.push(action.payload);
            }else {
                clone[week - 1] = action.payload;
            }
            state.restItem.hours = clone;
        }
    },
});

export const {
    showModal,
    hideModal,
    renderTags,
    updateTags,
    closeTags,
    updateInputTitle,
    updateDateTime
} = modalSlice.actions;

export const isShow = state => state.modal.isShow;
export const tagList = state => state.modal.tags;
export const restInfo = state => state.modal.restItem;
export const restName = state => state.modal.restTitle;

export const sendRequestTags = ()=>{

    return async (dispatch)=>{

        try {
            const tagsRes = await tags();

            dispatch(renderTags(tagsRes));

        } catch (error) {

            message.error(error.message);
        }
    };
};

export const updateRestInfo = (data)=>{
    return async (dispatch)=>{
        try {

            await updateRest(data);
            const restRes = await restaurant();

            dispatch(updateRestList(restRes));

        } catch (error) {
            message.error(error.message);
        }
    };
};

export default modalSlice.reducer;
