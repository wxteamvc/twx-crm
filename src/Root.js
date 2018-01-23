import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import store from './store/ConfigureStore';
import App from './container/App';
import { NetInfo, AppState } from 'react-native';
import * as Types from "./actions/actionTypes";
import DeviceInfo from 'react-native-device-info';



export default class Root extends Component {
    componentDidMount() {
        global.token = '';
        //获取手机相关信息
        this._getMobileInfo();
        //监听网络状况
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
        //监听网络环境
        NetInfo.addEventListener('connectionChange',this._handleFirstConnectivityChange);
        //监听App运行状况
        AppState.addEventListener('change', this._handleAppStateChange);
        //监听坐标位置
        this._handleGetGeolocation();
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
        NetInfo.removeEventListener('connectionChange',this._handleFirstConnectivityChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
        navigator.geolocation.clearWatch(this.watchID);
    }

    _getMobileInfo = ()=>{
        let mobileInfo = {
            PhoneNumber: DeviceInfo.getPhoneNumber(),
            SerialNumber:DeviceInfo.getSerialNumber(),
            UniqueID:DeviceInfo.getUniqueID(),
            Manufacturer:DeviceInfo.getManufacturer(),
            Brand: DeviceInfo.getBrand(),
            SystemName:DeviceInfo.getSystemName()
        }
        this.storeDispatch('inputMobileInfo',mobileInfo);
    }
    _handleConnectivityChange = (isConnected) => {
        this.storeDispatch('listenerNetInfo', isConnected);
    }
    _handleFirstConnectivityChange = (connectionInfo)=>{
        this.storeDispatch('listenerNetMode', connectionInfo);
    }
    _handleAppStateChange = (nextAppState) => {
        this.storeDispatch('listenerAppState', nextAppState);
    }
    _handleGetGeolocation() {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.storeDispatch(Types.GetGeolocation, position)
        // },
        //     (error) => {
        //         alert(error.message)
        //     },
        //     // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // )
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