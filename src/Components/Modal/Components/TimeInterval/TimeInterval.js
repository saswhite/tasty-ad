import React,{ useEffect,useState } from 'react';
import moment from 'moment-timezone';

/* common */
import { getWeek } from '../../../../Common/utils';

export default function TimeInterval () {

    let [ dateT,setDateT ] = useState(moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(() => {
        let timer = setInterval(()=>{
            setDateT(moment.tz('America/New_York').clone().format('YYYY-MM-DD HH:mm:ss'));
        },1000);
        return ()=>{
            if(timer) {
                clearInterval(timer);
            }
        };
    }, []);

    return (
        <div className="date-main">
            <span>{dateT}</span>
            <span style={{ marginLeft : '5px' }}>{getWeek(moment.tz('America/New_York').clone().day())}</span>
        </div>
    );
}
