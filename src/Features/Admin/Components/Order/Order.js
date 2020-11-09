import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useDispatch,useSelector } from 'react-redux';
// import moment from 'moment';
// import _ from 'lodash';

/* anted */
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

/* style */
import './order.scss';

/* action */
import { rquestOrderData,numInfo,perInfo } from '../Order/state/reducer';

export default function Order () {

    let numData = useSelector(numInfo);
    let perData = useSelector(perInfo);

    let dispatch = useDispatch();

    const numOption = {
        title:{
            text: '订单量',
            textStyle:{
                color:'#fff'
            }
        },
        grid: { width: '50%' },
        backgroundColor: '#5b5c6e',
        dataset:{
            source: numData
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
        }
        ,
        yAxis:{
            gridIndex: 0
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'circle',
                position: 'rigth',
                symbolSize: 7,
                lineStyle: {
                    color: '#9B8BBB'
                },
                itemStyle: {
                    color: '#9B8BBB'
                }
            },
            {
                type: 'pie',
                radius: '50%',
                center: [ '80%', '50%' ],
                label: {
                    formatter: '{b}: {@[1]} ({d}%)'
                }
            }
        ]
    };

    const personOption = {
        title:{
            text: '订单人群',
            textStyle:{
                color:'#fff'
            }
        },
        backgroundColor: '#5b5c6e',
        dataset:{
            source: perData
        },
        series: {
            type: 'pie',
            radius: '50%',
            label: {
                formatter: '{b}: {@[1]} ({d}%)'
            }
        }
    };

    /* 订单量数据 */
    // let renderNumData = ()=>{
    //     let arr = [];
    //     _.forEach(orderData,(item)=>{
    //         arr.push(moment(item.createdAt).format('YYYY-MM-DD'));
    //     });
    //     let numSource = [];
    //     _.forIn(_.groupBy(arr),(value,key)=>{
    //         numSource.push([ key,value.length ]);
    //     });
    //     setNumData(numSource);
    //     console.log(numSource);
    // };

    /* 订单人群数据 */
    // let renderPersonData = ()=>{
    //     console.log(orderData);
    //     let arr = [];
    //     _.forEach(orderData,(item)=>{
    //         arr.push(item.user.username);
    //     });
    //     let perSource = [];
    //     _.forIn(_.groupBy(arr),(value,key)=>{
    //         perSource.push([ key,value.length ]);
    //     });
    //     setPerData(perSource);
    //     console.log(perSource);
    // };

    return (
        <div>
            <div className="order-container">
                <RangePicker
                    className="order-time-select"
                    onChange={ (dates)=>{
                        dispatch(rquestOrderData({
                            start: dates[0]._d.toISOString(),
                            end: dates[1]._d.toISOString()
                        }));
                    } }/>
            </div>
            <div className="order-chart">
                <ReactEcharts
                    option={ numOption }
                    notMerge={ true }
                    lazyUpdate={ true }
                    theme={ 'dark' }
                />
            </div>
            <div className="order-chart">
                <ReactEcharts
                    option={ personOption }
                    notMerge={ true }
                    lazyUpdate={ true }
                    theme={ 'dark' }
                />
            </div>
        </div>
    );
}
