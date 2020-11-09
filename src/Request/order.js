import request from '../Common/request';
import { host } from '../Common/config';

export async function order (date){
    const result = await request({
        url: `${host}/order?start=${date.start}&end=${date.end}`,
        method:'get',
    });
    return result.list;
}