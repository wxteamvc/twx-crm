import * as Types from "../actions/actionTypes";

const initialState = {
    listeners:{
        netInfo:null,
        netMode:null,
        appState:null,
        geolocation:{}
    },
    mobileInfo:{
        PhoneNumber:'',   //手机号码
        SerialNumber:'',   //手机序列号
        UniqueID:'',       //手机唯一码
        Manufacturer:'',    //手机制造商
        Brand:'',           //手机品牌
        SystemName:''       //手机系统名称
    },
    text:'初始化App',
}

export function initReducer(state = initialState, action){
    switch (action.type){
        case 'inputMobileInfo':
            return {
                ...state,
                mobileInfo:action.data
            }
        case 'listenerNetInfo':
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    netInfo:action.data
                }
            }
        case 'listenerNetMode':
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    netMode:action.data
                }
            }
        case 'listenerAppState':
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    appState:action.data
                }
            }       
        case Types.GetGeolocation:
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    geolocation:action.data
                }
            }

        default:
        return state;
    }
}