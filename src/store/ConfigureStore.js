'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

import {persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(rootReducer,autoRehydrate())

persistStore(store,{
    storage:AsyncStorage,
    whitelist:['localConfigReducer']
});

export default store;