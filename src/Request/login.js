import request from '../Common/request';
import { host } from '../Common/config';

export async function login (data){
    const result = await request({
        url: `${host}/admin/login`,
        method:'post',
        data:{
            username:data.username,
            password:data.password
        }
    });
    return result;
}