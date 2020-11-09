import React,{ useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import _ from 'lodash';
import { match } from 'pinyin-match';

/* anted */
import { Select, Table,Input,Space,Button,Switch } from 'antd';
const { Option } = Select;

/* style */
import './menu.scss';

/* action */
import { sendRequestRest,restList } from '../Restaurant/state/reducer';
import { foods,totalF,restTar,rquestFoodList,setRest,updateFood ,clearList } from '../Menu/state/reducer';

/* common */
import { getStorage } from '../../../../Common/utils';

export default function Menu () {

    const user = getStorage('admin-user');

    const rest = useSelector(restList);
    const foodList = useSelector(foods);
    const totalFoods = useSelector(totalF);
    const restT = useSelector(restTar);

    const [ filterValue,setFilterValue ] = useState('');
    const [ pageInfo,setPageInfo ] = useState({});
    const [ pageSize,setPageSize ] = useState(10);

    const dispatch = useDispatch();

    useEffect(() => {
        /* 获取餐馆信息 */
        dispatch(sendRequestRest());
        /* 清除食品列表 */
        dispatch(clearList());
    }, []);

    /* 所有的餐馆名称 */
    let renderTotalRestName = ()=>{
        return _.map(rest,(item)=>{
            return (
                <Option value={ item.name['en-US'] } key={ item._id }>{item.name['zh-CN']}</Option>
            );
        });
    };

    /* 自定义过滤器 */
    let renderFilter = (dataIndex)=>({
        filterDropdown:filterMain,
        onFilter: (value, record) =>{
            let pattern = /[\u4e00-\u9fa5]/gm;
            if(pattern.test(value)){
                return record[dataIndex].indexOf(value) >= 0;
            }else {
                return record[dataIndex].toLowerCase().indexOf(value.toLowerCase()) >= 0;
            }
        }
    });

    /* 过滤器主体设置 */
    let filterMain = ({ setSelectedKeys, selectedKeys ,clearFilters })=>{
        return (
            <div>
                <Input
                    value={ selectedKeys[0] }
                    onChange={ e => {
                        setFilterValue(e.target.value);
                        return setSelectedKeys(e.target.value ? [ e.target.value ] : []);
                    } }
                    onPressEnter={ ()=>{ handleSearch(selectedKeys,clearFilters); } }
                />
                <Space>
                    <Button
                        size="small"
                        style={{ width : 90 }}
                        onClick={ ()=>{ handleSearch(selectedKeys,clearFilters); } }
                    >
                      搜索
                    </Button>
                </Space>
            </div>
        );
    };

    /* 处理过滤搜索 */
    let handleSearch = (selectedKeys,clearFilters)=>{
        // confirm();
        let nPageInfo = {
            ...pageInfo,
            keyword:selectedKeys[0]
        };
        dispatch(rquestFoodList(nPageInfo));
        clearFilters();
    };

    /* food数据处理 */
    let renderData = ()=>{
        return _.map(foodList,(item)=>{
            let clone = _.cloneDeep(item);
            return {
                key: item._id,
                foods: item.name['zh-CN'],
                price: `$ ${(item.price / 100).toFixed(2)}`,
                status: item.available,
                clone: clone
            };
        });
    };

    /* 列表中每项数据设置 */
    const columns = [
        {
            title: '菜品',
            dataIndex: 'foods',
            key:'foods',
            ...renderFilter('foods')
        },
        {
            title: '价格',
            dataIndex: 'price',
            key:'price'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key:'status',
            render: (status,data) => (
                <Switch
                    checked={ status ? true : false }
                    onChange={ (newStatus)=>{
                        let clone = data.clone;
                        let newData = { ...clone,available:newStatus };
                        let newPageInfo = { ...pageInfo,keyword:filterValue };
                        dispatch(updateFood(newData,newPageInfo));
                    } }
                    disabled={ user.role === 'employee' || user.role === 'visitor' ? true : false }
                />
            ),
        },
    ];

    return (
        <div>
            <div className="select-rest--name">
                <Select
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    style={{ width : '200px' }}
                    className="left"
                    onChange={ (v)=>{
                        let data = {};
                        _.forEach(rest,(item)=>{
                            if(item.name['en-US'] === v){
                                data.id = item._id;
                                data.page = 1;
                                data.limit = pageSize;
                                data.keyword = '';
                                dispatch(setRest(item));
                            }
                        });
                        setPageInfo(data);
                        dispatch(rquestFoodList(data));
                    } }
                    filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || match(option.children,input)
                    }>
                    {renderTotalRestName()}
                </Select>
            </div>
            <div className="table-foods">
                <Table
                    locale='emptyText'
                    columns={ columns }
                    dataSource={ renderData() }
                    pagination={{
                        defaultCurrent:1,
                        total: totalFoods,
                    }}
                    onChange={ (pagination)=>{
                        setPageSize(pagination.pageSize);
                        let data = {
                            id: restT._id,
                            page: pagination.current,
                            limit: pagination.pageSize,
                            keyword: filterValue
                        };
                        setPageInfo(data);
                        dispatch(rquestFoodList(data));
                    } }/>

            </div>
        </div>
    );
}

