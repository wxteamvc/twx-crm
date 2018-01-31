import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import store from './store/ConfigureStore';
import App from './container/App';
import { NetInfo, AppState,DeviceEventEmitter } from 'react-native';
import * as Types from "./actions/actionTypes";
import DeviceInfo from 'react-native-device-info';
import JPushModule from 'jpush-react-native';
import util from './constants/util';
import * as urls from './constants/urls';
import Tchat from './constants/Tchat';

global.token = '';
const tchat = false;
const receiveCustomMsgEvent = 'receivePushMsg'
const receiveNotificationEvent = 'receiveNotification'
const openNotificationEvent = 'openNotification'
const getRegistrationIdEvent = 'getRegistrationId'

export default class Root extends Component {
    componentDidMount() {
        //监听是否登录
        DeviceEventEmitter.addListener('my_login',this._handUserLogin)
        // JPushModule.initPush();

        //监听推送信息
        JPushModule.notifyJSDidLoad((resultCode) => {
            if (resultCode === 0) {
                
            }
        });
        JPushModule.getRegistrationID(registrationId => {
            global.registrationId = registrationId;
            let url = urls.Add_jpush+'/'+registrationId;
            util.post(url,{},
            resp=>{
                // console.log(resp)
            },
            error=>{
                // console.log(error)
            })
        })
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: " + map.alertContent);
            console.log("extras: " + map.extras);
        });
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!");
            console.log("map.extra: " + map.key);
        });
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
        DeviceEventEmitter.removeListener('my_login',this._handUserLogin);
        DeviceEventEmitter.removeListener('connect_socket',this._handConnectSocket);
        JPushModule.removeReceiveNotificationListener(receiveNotificationEvent);
        JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent);
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
        NetInfo.removeEventListener('connectionChange',this._handleFirstConnectivityChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
        navigator.geolocation.clearWatch(this.watchID);
    }
    _handUserLogin = (e)=>{
        if (global.token !=  e.token){
            global.token = e.token;
        }
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
        //监听是否连接服务器
        if (isConnected){
            DeviceEventEmitter.addListener('connect_socket',this._handConnectSocket);
        }else{
            DeviceEventEmitter.removeListener('connect_socket',this._handConnectSocket);
        }
        this.storeDispatch('listenerNetInfo', isConnected);
    }
    connect_socket = ()=>{
        tchat = Tchat.init('www.wxdevelop.com',12000);
        tchat.addWebSocketOnOpenListener(()=>{
            let sendData = JSON.stringify({type:'login',data:global.token});
            tchat.send(sendData);
        })
        tchat.addWebSocketOnErrorListener((e)=>{
            console.log(e.message)
        })
        tchat.addWebSocketOnMessageListener((e)=>{
            let data = JSON.parse(e.data)
            let storeAll = store.getState();
            let { id } = storeAll.personalReducer.info;
            if (data.target == id){
                data.target = data.data.to;
                this.storeDispatch('mergeChatList',data);
            }else{
                this.storeDispatch('addChatList',data);
                this.storeDispatch('mergeChatList',data);
            }
        })
        tchat.addWebSocketOnCloseListener((e)=>{
            console.log('关闭链接')
        })
    }
    _handConnectSocket = (e)=>{
        console.log(e)
        if (e.connect == false && tchat){
            tchat = tchat.close();
        }
        if (e.connect && !tchat){
            console.log('开始监听服务器')
            this.connect_socket()
        }
    }
    _handleFirstConnectivityChange = (connectionInfo)=>{
        this.storeDispatch('listenerNetMode', connectionInfo);
    }
    _handleAppStateChange = (nextAppState) => {
        this.storeDispatch('listenerAppState', nextAppState);
    }
    _handleGetGeolocation() {
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