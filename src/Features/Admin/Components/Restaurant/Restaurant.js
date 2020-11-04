import React from 'react';

/* common */
import { colorList } from '../../../../Common/color_list';

/* style */
import './restaurant.scss';

/* anted */
import { Table, Tag ,Button,Switch } from 'antd';

export default function Restaurant () {
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
            render: () => (
                <Button type="primary">操作</Button>
            ),
        },
        {
            title: '手动关闭',
            key: 'close',
            render: () => (
                <Switch
                    onChange={ (checked)=>{
                        console.log(checked);
                    } }
                >操作</Switch>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            address: 'New York No. 1 Lake Park',
            tags: [ 'nice', 'developer' ],
        },
        {
            key: '2',
            name: 'Jim Green',
            address: 'London No. 1 Lake Park',
            tags: [ 'loser' ],
        },
        {
            key: '3',
            name: 'Joe Black',
            address: 'Sidney No. 1 Lake Park',
            tags: [ 'cool', 'teacher' ],
        },
    ];

    return (
        <div>
            <Table
                columns={ columns }
                dataSource={ data }
            />
        </div>
    );
}
