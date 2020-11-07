import request from '../Common/request';
import { host } from '../Common/config';
import _ from 'lodash';

export async function Food (data){
    const result = await request({
        url: `${host}/food?restaurantId=${data.id}&page=${data.page}&limit=${data.limit}&keyword=${data.keyword}`,
        method:'get',
    });
    return result;
}

export async function setAvailable (newData){
    const result = await request({
        url: `${host}/food`,
        method:'post',
        data:{
            id: newData._id,
            data:{
                ..._.omit(newData,'_id')
            }
        }
    });
    return result;
}