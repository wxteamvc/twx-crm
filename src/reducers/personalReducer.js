import * as Types from "../actions/actionTypes";
import {DeviceEventEmitter} from 'react-native';

const initialState = {
    isLogin: false,
    errorMsg: '',
    status: null,
    info: null,
    notice: [],
}

export function personalReducer(state = initialState, action) {
    switch (action.type) {
        case Types.Change_User_Info:
            return {
                ...state,
                info:action.data
            }
        case Types.Logout:
            DeviceEventEmitter.emit('connect_socket',{connect:false})
            return initialState
        case Types.Upload_Avatar_SUCCESS:
            return {
                ...state,
                info:action.data
            }
        case Types.UserInfo_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.UserInfo_SUCCESS:
            DeviceEventEmitter.emit('connect_socket',{connect:true})
            return {
                ...state,
                isLogin: true,
                status: 'done',
                info: action.data
            }
        case Types.UserInfo_FAILED:
            DeviceEventEmitter.emit('connect_socket',{connect:false})
            return initialState
        default:
            return state;
    }
}