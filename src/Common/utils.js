
/* 往localstorage里面设置特定的值 */
export function setStorage (key, data) {
    if(!key) return;
    localStorage.setItem(key, JSON.stringify(data));
}

/* 从localstorage里面获取特定的值 */
export function getStorage (key) {
    if(!key) return;
    let res = localStorage.getItem(key);
    try {
        return JSON.parse(res);
    } catch (err) {
        return res;
    }
}

/* 从localstorage去除指定的值 */
export function removeStorage (key){
    localStorage.removeItem(key);
}

export function getWeek (week){

    switch (week) {
    case 1:
        return '周一';
    case 2:
        return '周二';
    case 3:
        return '周三';
    case 4:
        return '周四';
    case 5:
        return '周五';
    case 6:
        return '周六';
    case 0:
        return '周日';
    default:
        return '周日';
    }
}