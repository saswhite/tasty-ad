import request from '../Common/request';
import { host } from '../Common/config';
import _ from 'lodash';

export async function restaurant (){
    const result = await request({
        url: `${host}/restaurant/location/-74.0059413,40.7127837`,
        method:'get',
    });
    return result.list;
}

export async function updateRest (newData){
    const result = await request({
        url: `${host}/restaurant`,
        method:'post',
        data:{
            id:newData._id,
            data:{
                ..._.omit(newData,'_id')
            }
        }
    });
    return result;

}