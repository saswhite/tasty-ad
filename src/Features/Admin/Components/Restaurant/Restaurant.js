import React from 'react';

/* style */
import './restaurant.scss';

/* anted */
import { Table, Tag, Space } from 'antd';

export default function Restaurant () {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'magenta' : 'red';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
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
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <span>111</span>
                </Space>
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
