import * as Types from "../actions/actionTypes";


const customerState = {
   
    list: {
        data:[],
        status: false,
        msg: '',
    },
    info: {
        data:{},
        status: false,
        msg: '',
    },
}



export function customerReducer(state = customerState, action) {
    switch (action.type) {
        case Types.CustomerInfo_BEGIN:
            return {
                ...state,
                info:{
                    ...state.info,
                    status: 'doing',
                }
                
            }
        case Types.CustomerInfo_SUCCESS:
            return {
                ...state,
                info:{
                    ...state.info,
                    status: 'done',
                    data: action.data        
                }
            }
        case Types.CustomerInfo_FAILED:
            return customerState
        case Types.CustomerList_BEGIN:
            return {
                ...state,
                list:{
                    ...state.list,
                    status: 'doing',    
                }   
            }
        case Types.CustomerList_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data,
                    status: 'done',
                    data:state.list.data.concat(action.data.data)
                }         
            }
        case Types.CustomerList_FAILED:
            return customerState

        default:
            return state;
    }
}