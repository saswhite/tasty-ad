import { configureStore } from '@reduxjs/toolkit';

/* components */
import errorReducer from '../Reducer/error';
import loagingReducer from '../Reducer/loading';
import intlReducer from '../Reducer/intl';
import modalReducer from '../Reducer/modal';

/* pages */
import restReducer from '../../Features/Admin/Components/Restaurant/state/reducer';
import menuReducer from '../../Features/Admin/Components/Menu/state/reducer';
import orderReducer from '../../Features/Admin/Components/Order/state/reducer';

export default configureStore({
    reducer: {
        error: errorReducer,
        loading: loagingReducer,
        rest: restReducer,
        intl: intlReducer,
        modal:modalReducer,
        menu:menuReducer,
        order: orderReducer
    },
});
