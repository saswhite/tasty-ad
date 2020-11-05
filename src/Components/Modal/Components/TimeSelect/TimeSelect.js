import React,{ memo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';
import { v4 } from 'uuid';

/* common */
import { getWeek } from '../../../../Common/utils';

/* anted */
import { TimePicker,Button } from 'antd';
const { RangePicker } = TimePicker;

/* action */
import { restInfo } from '../../../../Redux/Reducer/modal';

let  TimeSelect = memo(()=> {

    let restItem = useSelector(restInfo);

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