import request from '../Common/request';
import { host } from '../Common/config';

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
        data:newData
    });
    return result;
}