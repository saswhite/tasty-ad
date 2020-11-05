import _ from 'lodash';

/* 自定义error */
export default function CustomError (err){
    this.details = _.get(err, 'response.data.details');

    this.code = _.get(err, 'response.data.code');

    this.message = _.get(err, 'response.data.message') || err.message;

    if(/timeout of/.test(err.meassage)){this.code = 'timeout';}
    if(/Network Error/.test(err.message)){this.code = 'network';}
}