import { combineReducers } from 'redux';
import { initReducer } from './initReducer';
import { localConfigReducer } from './localConfigReducer';
import { homeReducer } from './homeReducer';

const rootReducer = combineReducers({
    initReducer,
    localConfigReducer,
    homeReducer,
})

export default rootReducer;