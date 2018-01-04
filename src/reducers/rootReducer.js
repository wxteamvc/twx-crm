import { combineReducers } from 'redux';
import { initReducer } from './initReducer';
import { localConfigReducer } from './localConfigReducer';

const rootReducer = combineReducers({
    initReducer,
    localConfigReducer
})

export default rootReducer;