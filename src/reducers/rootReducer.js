import { combineReducers } from 'redux';
import { initReducer } from './initReducer';
import { localConfigReducer } from './localConfigReducer';
import { homeReducer } from './homeReducer';
import { personalReducer } from './personalReducer';
import { customerReducer } from './customerReducer';
import { companyReducer } from './companyReducer';
import { tasksReducer } from './tasksReducer';
import { ordersReducer } from './ordersReducer';
import { myChatReducer } from './myChatReducer';

const rootReducer = combineReducers({
    initReducer,
    localConfigReducer,
    homeReducer,
    personalReducer,
    customerReducer,
    companyReducer,
    tasksReducer,
    ordersReducer,
    myChatReducer
})

export default rootReducer;