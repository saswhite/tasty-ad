import React,{ useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useDispatch,useSelector } from 'react-redux';

/* anted */
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

/* style */
import './order.scss';

/* action */
import { rquestOrderData,numInfo,perInfo } from '../Order/state/reducer';

/* common */
import { defaultNumOption,defaultPerOption } from '../../../../Common/defaultOption';

export default function Order () {

    let numData = useSelector(numInfo);
    let perData = useSelector(perInfo);

    const [ isChange,setIsChange ] = useState(false);

    let dispatch = useDispatch();

    /* 订单量折线图与饼图设置 */
    const numOption = {
        title:{
            text: '订单量',
            textStyle:{
                color:'#fff'
            }
        },
        grid: { right:'50%' },
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
                symbolSize: 7,
                lineStyle: {
                    color: '#9B8BBB'
                },
                itemStyle: {
                    color: '#9B8BBB'
                },
                label: {
                    show:true,
                    formatter: '{@[1]}'
                },
            },
            {
                type: 'pie',
                radius: '50%',
                center: [ '75%', '50%' ],
                label: {
                    formatter: '{b}: {@[1]} ({d}%)'
                }
            }
        ]
    };

    /* 订单人群饼图设置 */
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
                        setIsChange(true);
                    } }/>
            </div>
            <div className="order-chart">
                <ReactEcharts
                    option={ isChange  ? numOption : defaultNumOption }
                    notMerge={ true }
                    lazyUpdate={ true }
                    theme={ 'dark' }
                />
            </div>
            <div className="order-chart">
                <ReactEcharts
                    option={ isChange ? personOption : defaultPerOption }
                    notMerge={ true }
                    lazyUpdate={ true }
                    theme={ 'dark' }
                />
            </div>
        </div>
    );
}
