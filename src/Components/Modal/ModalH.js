import React,{ useState,useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import _ from 'lodash';
import { v4 } from 'uuid';
import moment from 'moment-timezone';

/* common */
import { getWeek } from '../../Common/utils';

/* style */
import './modal.scss';

/* anted */
import { Modal,Select,Input,Form } from 'antd';
const { Option } = Select;

/* action */
import { isShow,hideModal } from '../../Redux/Reducer/modal';
import { initLan,setLan } from '../../Redux/Reducer/intl';
import { tagList,restInfo,sendRequestTags,updateRestInfo,updateTags,restName,updateInputTitle } from '../../Redux/Reducer/modal';

/* components */
import Tags from './Components/Tags/Tags';
import TimeSelect from './Components/TimeSelect/TimeSelect';

export default function ModalH () {

    let [ confirmLoading,setConfirmLoading ] = useState(false);
    let [ timer,setTimer ] = useState(null);
    let [ dateT,setDateT ] = useState(moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss'));
    // let [ restTitle,setRestTitle ] = useState('');

    let visible = useSelector(isShow);
    let lan = useSelector(initLan);
    let tags = useSelector(tagList);
    let restItem = useSelector(restInfo);
    let restTitle = useSelector(restName);

    let dispatch = useDispatch();

    useEffect(() => {
        /* 获取所有标签 */
        dispatch(sendRequestTags());
        /* 自动时间 */
        setTimer(setInterval(()=>{
            setDateT(moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss'));
        },1000));
        return ()=>{
            if(timer) {
                setTimer(null);
            }
        };
    }, []);

    /* 所有标签选项 */
    let renderTags = ()=>{
        return _.map(tags,(item)=>{
            return  <Option value={ item } key={ v4() }>{item}</Option>;
        });
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
        console.log(restItem);
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
                            <Tags></Tags>
                        </span>
                    </Form.Item>
                    <Form.Item
                        label="开门时间："
                    >
                        <div className="time-title">纽约当地时间</div>
                        <div className="date-main">
                            <span>{dateT}</span>
                            <span style={{ marginLeft : '5px' }}>{getWeek(moment.tz('America/New_York').clone().day())}</span>
                        </div>
                        <div className="time-select">
                            <TimeSelect></TimeSelect>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>)}
        </div>
    );
}
