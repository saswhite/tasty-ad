import React,{ memo } from 'react';
import _ from 'lodash';
import { v4 } from 'uuid';
import { useSelector,useDispatch } from 'react-redux';

/* common */
import { colorList } from '../../../../Common/config';

/* action */
import { restInfo,closeTags } from '../../../../Redux/Reducer/modal';

/* anted */
import { Tag } from 'antd';

const Tags = memo(()=> {

    const restItem = useSelector(restInfo);

    const dispatch = useDispatch();

    /* 根据默认返回随机颜色的标签 */
    let renderHasTags = ()=>{
        return _.map(restItem.tags,tag => {
            let color = colorList[parseInt(Math.random() * colorList.length)];

            return (
                <Tag
                    color={ color }
                    key={ v4() }
                    closable
                    onClose={  ()=>{ handleClose(tag); } }>
                    {tag.toUpperCase()}
                </Tag>
            );
        });
    };

    /* 标签删除 */
    let handleClose = (tag)=>{
        dispatch(closeTags(_.indexOf(restItem.tags,tag)));
    };

    return (
        <div>
            {renderHasTags()}
        </div>
    );
});

export default Tags;
