import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import store from './store/ConfigureStore';
import App from './container/App';
import { NetInfo, AppState } from 'react-native';
import * as Types from "./actions/actionTypes";

export default class Root extends Component {
    componentDidMount() {
        //监听网络状况
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.storeDispatch('listenerNetInfo', isConnected);
        })
        //监听App运行状况
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
        //监听坐标位置
        AppState.addEventListener('change', this._handleAppStateChange);
        this._handleGetGeolocation();
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
        navigator.geolocation.clearWatch(this.watchID);
    }
    _handleConnectivityChange = (isConnected) => {
        this.storeDispatch('listenerNetInfo', isConnected);
    }
    _handleAppStateChange = (nextAppState) => {
        this.storeDispatch('listenerAppState', nextAppState);
    }
    _handleGetGeolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.storeDispatch(Types.GetGeolocation, position)
        },
            (error) => {
                alert(error.message)
            },
            // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.storeDispatch(Types.GetGeolocation, position)
        });
    }
    storeDispatch = (type, data) => {
        store.dispatch({
            type,
            data
        })
    }
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}