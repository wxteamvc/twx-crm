import { combineReducers } from 'redux';
import { initReducer } from './initReducer';
import { localConfigReducer } from './localConfigReducer';
import { homeReducer } from './homeReducer';
import { personalReducer } from './personalReducer';
import { customerReducer } from './customerReducer';
import { companyReducer } from './companyReducer';
import { tasksReducer } from './tasksReducer';

const rootReducer = combineReducers({
    initReducer,
    localConfigReducer,
    homeReducer,
    personalReducer,
    customerReducer,
    companyReducer,
    tasksReducer
})

export default rootReducer;