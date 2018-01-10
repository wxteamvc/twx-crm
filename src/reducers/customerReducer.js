import * as Types from "../actions/actionTypes";


const customerState = {
    status: false,
    msg: '',
    list: {
        data:[],
    },
    info: {},
}



export function customerReducer(state = customerState, action) {
    switch (action.type) {
        case Types.CustomerList_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.CustomerList_SUCCESS:
        console.log(action.data)
            return {
                ...state,
                status: 'done',
                list: {
                    ...state.list,
                    ...action.data,
                    data:state.list.data.concat(action.data.data)
                }         
            }
        case Types.CustomerList_FAILED:
            return {
                customerState
            }
        default:
            return state;
    }
}