import axios from 'axios';
import _ from 'lodash';
import CustomError from './CustomError';

/**
 * request
 */
const fetch = (options) => {

    let { url } = options;
    const { data = {}, headers = {}, method } = options;

    headers['Content-Type'] = 'application/json';

    /* cache */
    headers['Cache-Control'] = 'no-cache';

    /* Clone request body data */
    const cloneData = _.cloneDeep(data);

    switch (_.toLower(method)) {
    case 'get':
        return axios.get(url, { params: cloneData, headers });
    case 'delete':
        return axios.delete(url, { data: cloneData, headers });
    case 'post':
        return axios.post(url, cloneData, { headers });
    case 'put':
        return axios.put(url, cloneData, { headers });
    case 'patch':
        return axios.patch(url, cloneData, { headers });
    default:
        return axios(options);
    }
};

/**
 * Default request function
 */
export default async function request (options) {

    try {
        const res = await fetch(options);
        let data = _.get(res, 'data', {});

        /* convert list to object */
        if (_.isArray(data)) {
            data = { list: data };
        }

        return data;
    } catch (error) {

        throw new CustomError(error);

    }
}
