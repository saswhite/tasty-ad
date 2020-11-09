import React,{ memo } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';
import { v4 } from 'uuid';

/* common */
import { getWeek } from '../../../../Common/utils';

/* anted */
import { TimePicker,Button } from 'antd';
const { RangePicker } = TimePicker;

/* action */
import { restInfo,updateDateTime } from '../../../../Redux/Reducer/modal';

let  TimeSelect = memo(()=> {

    const restItem = useSelector(restInfo);

    const dispatch = useDispatch();

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

    return (
        <div>
            {renderTimeSelect()}
        </div>
    );
});

export default TimeSelect;