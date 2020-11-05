import React,{ memo } from 'react';
import _ from 'lodash';
import { v4 } from 'uuid';
import { useSelector,useDispatch } from 'react-redux';

/* common */
import { colorList } from '../../../../Common/color_list';

/* action */
import { tag,closeTags } from '../../../../Redux/Reducer/modal';

/* anted */
import { Tag } from 'antd';

const Tags = memo(()=> {

    let initTags = useSelector(tag);

    let dispatch = useDispatch();

    let renderHasTags = ()=>{
        return _.map(initTags,tag => {
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

    let handleClose = (tag)=>{
        dispatch(closeTags(_.indexOf(initTags,tag)));
    };

    return (
        <div>
            {renderHasTags()}
        </div>
    );
});

export default Tags;
