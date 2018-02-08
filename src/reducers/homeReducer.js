import * as Types from "../actions/actionTypes";

const homeState = {
    status: false,
    isReady: false,
    data: {}

}



export function homeReducer(state = homeState, action) {
    switch (action.type) {
        case Types.Home_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.Home_SUCCESS:
            return {
                ...state,
                status: 'done',
                isReady: true,
                data: action.data
            }
        case Types.Home_FAILED:
            return homeState
        default:
            return state;
    }
}