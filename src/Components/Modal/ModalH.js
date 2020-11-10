import React,{ useState,useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import _ from 'lodash';
import { v4 } from 'uuid';
import moment from 'moment';

/* style */
import './modal.scss';

/* common */
import { colorList } from '../../Common/config';
import { getWeek } from '../../Common/utils';

/* anted */
import { Modal,Select,Input,Form,Tag,Button,TimePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = TimePicker;

/* action */
import { isShow,hideModal } from '../../Redux/Reducer/modal';
import { initLan,setLan } from '../../Redux/Reducer/intl';
import { tagList,restInfo,sendRequestTags,updateRestInfo,updateTags,restName,updateInputTitle,closeTags,updateDateTime } from '../../Redux/Reducer/modal';

/* components */
import TimeInterval from './Components/TimeInterval/TimeInterval';

export default function ModalH () {

    let [ confirmLoading,setConfirmLoading ] = useState(false);

    let visible = useSelector(isShow);
    let lan = useSelector(initLan);
    let tags = useSelector(tagList);
    let restItem = useSelector(restInfo);
    let restTitle = useSelector(restName);

    const dispatch = useDispatch();

    useEffect(() => {
        /* 获取所有标签 */
        dispatch(sendRequestTags());
    }, []);

    /* 所有标签选项 */
    let renderTags = ()=>{
        return _.map(tags,(item)=>{
            return  <Option value={ item } key={ v4() }>{item}</Option>;
        });
    };

    /* 根据默认返回随机颜色的标签 */
    let renderHasTags = ()=>{
        return _.map(restItem.tags,tag => {
            let color = colorList[parseInt(Math.random() * colorList.length)];

            return (
                <Tag
                    color={ color }
                    key={ v4() }
                    closable
                    onClose={  ()=>{ handleClose(tag); } }>
                    {tag.toUpperCase()}
                </Tag>
            );
        });
    };

    /* 返回时间选择器 */
    let renderTimeSelect = ()=>{
        let clone =  _.cloneDeep(restItem.hours);
        while(clone.length < 7){
            clone.push({});
        }
        return _.map(clone,(item,index)=>{

            const d = [
                item.start ? moment().startOf('day').add(item.start,'minutes') : moment().startOf('day'),
                item.end ? moment().startOf('day').add(item.end,'minutes') : moment().startOf('day') ];
            return(
                <div key={ v4() }>
                    <Button disabled>{getWeek(index + 1)}</Button>
                    <RangePicker
                        defaultValue={ d }
                        onChange={ (v)=>{
                            let week = 0;
                            if(index < 6){
                                week = index + 1;
                            }else {
                                week = 0;
                            }
                            let data = {
                                type: 'delivery',
                                dayOfWeek:week,
                                start: v[0].minute() + v[0].hour() * 60,
                                end: v[1].minute() + v[1].hour() * 60,
                            };
                            dispatch(updateDateTime(data));
                        } }
                    />
                </div>
            );
        });
    };

    /* 标签删除 */
    let handleClose = (tag)=>{
        dispatch(closeTags(_.indexOf(restItem.tags,tag)));
    };

    /* modal框的ok按钮 */
    let handleOk = () => {
        setConfirmLoading(true);
        let clone = _.cloneDeep(restItem);
        clone.name[lan] = restTitle[lan];
        restItem = clone;
        setTimeout(() => {
            dispatch(updateRestInfo(restItem));
            setConfirmLoading(false);
            dispatch(hideModal());
        }, 2000);

    };

    /* modal框的关闭按钮 */
    let handleCancel = () => {
        dispatch(hideModal());

    };

    /* 选择框的改变事件 */
    let handleLanChange = (value)=> {
        dispatch(setLan(value));

    };

    /* 标签选择器改变事件 */
    let handleTagChange = (value)=>{
        if(_.indexOf(restItem.tags,value) < 0){
            dispatch(updateTags(value));
        }
    };

    return (
        <div>
            { visible && (<Modal
                title={ _.cloneDeep(restItem.name[lan]) }
                visible={ visible }
                onOk={ handleOk }
                confirmLoading={ confirmLoading }
                onCancel={ handleCancel }
                cancelText={ '取消' }
                okText={ '保存' }
            >
                <Form>
                    <Form.Item
                        className="rest-title"
                        label="餐馆名称：">
                        <Select defaultValue={ lan } style={{ width : 120 }} onChange={ handleLanChange }>
                            <Option value="zh-CN">中文</Option>
                            <Option value="en-US">英文</Option>
                        </Select>
                        <Input
                            value = { restTitle[lan] }
                            style={{ width : 200 }}
                            onChange={ (e)=>{
                                dispatch(updateInputTitle({
                                    lang: lan,
                                    value:e.target.value
                                }));
                            } }
                        />
                    </Form.Item>
                    <Form.Item
                        className="rest-tags"
                        label="餐馆标签："
                    >
                        <Select
                            style={{ width : 120 }}
                            onChange={ handleTagChange }
                            id="tags"
                            defaultValue={ restItem.tags[0] }
                        >
                            {renderTags()}
                        </Select>

                        <span
                            style={{ marginLeft : '10px' }}
                            className="tags"
                        >
                            {renderHasTags()}
                        </span>
                    </Form.Item>
                    <Form.Item
                        label="开门时间："
                    >
                        <div className="time-title">纽约当地时间</div>
                        <TimeInterval></TimeInterval>
                        <div className="time-select">
                            {renderTimeSelect()}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>)}
        </div>
    );
}
