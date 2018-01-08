import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import store from './store/ConfigureStore';
import App from './container/App';
import { NetInfo, AppState } from 'react-native';


export default class Root extends Component{
    componentDidMount() {
        NetInfo.isConnected.fetch().done((isConnected)=>{
            this.storeDispatch('listenerNetInfo',isConnected);
        })
        NetInfo.isConnected.addEventListener('connectionChange',this._handleConnectivityChange);
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange',this._handleConnectivityChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleConnectivityChange=(isConnected)=>{
        this.storeDispatch('listenerNetInfo',isConnected);
    }
    _handleAppStateChange=(nextAppState)=>{
        this.storeDispatch('listenerAppState',nextAppState);
    }
    storeDispatch =(type,data)=>{
        store.dispatch({
            type,
            data
        })
    }
    render(){ 
        console.log('*********************************************');
        console.log(store.getState());
        console.log('*********************************************');
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}