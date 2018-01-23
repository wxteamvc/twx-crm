import * as Types from "../actions/actionTypes";

const initialState = {
    isLogin:false,
    errorMsg:'',
    status:null,
    info:null,
    notice:[],
}

export function personalReducer(state = initialState, action){
    switch (action.type){
        case Types.Logout:
            global.token = '';
            return initialState
        case Types.Login_SUCCESS:
            global.token = action.data.token;
            return {
                ...state,
                isLogin:true,
                info:action.data
            }
        case Types.Login_FAILED:
            global.token = '';
            return {
                ...initialState,
                errorMsg:action.data
            }
        case Types.Upload_Avatar_SUCCESS:
            return {
                ...state,
                info:action.data
            }
        case Types.UserInfo_BEGIN:
            return {
                ...state,
                status:'doing',
            }
        case Types.UserInfo_SUCCESS:
            global.token = action.data.token;
            return {
                ...state,
                isLogin:true,
                status:'done',
                info:action.data
            }
        case Types.UserInfo_FAILED:
            global.token = '';
            return initialState
        default:
        return state;
    }
}