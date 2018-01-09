import * as Types from "../actions/actionTypes";

const initialState = {
    status:null,
    info:null,
    notice:[],
}

export function personalReducer(state = initialState, action){
    switch (action.type){
        case Types.UserInfo_BEGIN:
            return {
                ...state,
                status:'doing',
            }
        case Types.UserInfo_SUCCESS:
            return {
                ...state,
                status:'done',
                info:action.data
            }
        case Types.UserInfo_FAILED:
            return {
                initialState
            }
        default:
        return state;
    }
}