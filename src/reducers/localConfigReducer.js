import { styles } from '../constants/styles';
import { stylesNight } from '../constants/stylesNight';
import {DeviceEventEmitter} from 'react-native';

const initialState = {
    token: '',
    modules: [
        {
            name: '潜在客户',
            selected: true,
            icon: require('../constants/images/潜在客户.png'),
            goUrl: 'CustomerList'
        },
        {
            name: '待办任务',
            selected: true,
            icon: require('../constants/images/待办任务.png'),
            goUrl: 'CompanyList'
        },
        {
            name: '审批订单',
            selected: true,
            icon: require('../constants/images/审批订单.png'),
        },
        {
            name: '工作日志',
            selected: true,
            icon: require('../constants/images/工作日志.png')
        },
        {
            name: '移动考勤',
            selected: true,
            icon: require('../constants/images/移动考勤.png')
        },
        {
            name: '个人消息',
            selected: true,
            icon: require('../constants/images/个人消息.png')
        },
        {
            name: '系统消息',
            selected: true,
            icon: require('../constants/images/系统消息.png')
        }
    ],
    setting:{
        cacheSize:'0M',
        nightMode:false,
    },
    captchaTime:null,
    stylesMode: styles
}

export function localConfigReducer(state = initialState, action) {
    switch (action.type) {
        case 'changeSetting':
            return {
                ...state,
                setting:{
                    ...state.setting,
                    [action.data.key]:action.data.value
                }
            }
        case 'changeStyles':
            return {
                ...state,
                stylesMode:action.data ? stylesNight : styles
            }
        case 'changeModules':
            return {
                ...state,
                modules: [...action.data]
            }
        case 'declineCaptchaTime':
            if (state.captchaTime == null){
                return {...state}
            }
            let newCaptchaTime = state.captchaTime > 1 ? --state.captchaTime : null;
            return {
                ...state,
                captchaTime:newCaptchaTime
            } 
        case 'setCaptchaTime':
            return {
                ...state,
                captchaTime: action.data
            }  
        case 'changeToken':
            DeviceEventEmitter.emit('my_login',{token:action.data})
            return {
                ...state,
                token: action.data
            }
        default:
            return state;
    }
}