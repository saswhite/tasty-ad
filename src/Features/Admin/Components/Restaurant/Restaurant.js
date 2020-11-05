import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import _ from 'lodash';

/* common */
import { colorList } from '../../../../Common/color_list';

/* style */
import './restaurant.scss';

/* anted */
import { Table, Tag ,Button,Switch } from 'antd';

/* action */
import { restList,sendRequestRest,postUpdateRest } from '../Restaurant/state/reducer';
import { showModal } from '../../../../Redux/Reducer/modal';

export default function Restaurant () {

    let rest = useSelector(restList);

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(sendRequestRest());
    }, []);

    /* 表格头 */
    const columns = [
        {
            title: '餐馆',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = colorList[parseInt(Math.random() * colorList.length)];

                        return (
                            <Tag color={ color } key={ tag } style={{}}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (el) => (
                <Button
                    type="primary"
                    onClick={
                        ()=>{
                            dispatch(showModal(el.clone));
                        }
                    }
                >操作</Button>
            ),
        },
        {
            title: '手动关闭',
            key: 'close',
            render: (v) => (
                <Switch
                    onChange={ (checked)=>{ hangdleClose(checked,v.clone);} }
                    checked={ v.closed ? true : false }
                >操作</Switch>
            ),
        },
    ];

    /* 对餐馆数据的处理 */
    let renderData = ()=>{
        return _.map(rest,(item)=>{
            let clone = _.cloneDeep(item);
            return {
                key: item._id,
                name: item.name['zh-CN'],
                address: item.address.formatted,
                tags: item.tags,
                closed: item.closed,
                clone: clone
            };
        });
    };

    /* 手动关闭 */
    let hangdleClose = (checked,item)=>{
        if(checked){
            dispatch(postUpdateRest({
                ...item,
                closed:{
                    closed:true
                }
            }));
        }else {
            dispatch(postUpdateRest({
                ...item,
                closed: null
            }));
        }
    };

    return (
        <div>
            <Table
                columns={ columns }
                dataSource={ renderData() }
                pagination={{
                    defaultCurrent:1,
                    total: rest.length
                }}
            />
        </div>
    );
}
