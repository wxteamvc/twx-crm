import * as Types from "../actions/actionTypes";


const companyState = {
    status: false,
    list: {
        data:[],
    },
}

export function companyReducer(state = companyState, action) {
    switch (action.type) {
        case Types.CompanyList_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.CompanyList_SUCCESS:
            return {
                ...state,
                status: 'done',
                list: {
                    ...state.list,
                    ...action.data,
                    data:state.list.data.concat(action.data.data)
                }         
            }
        case Types.CompanyList_FAILED:
            return companyState
        default:
            return state;
    }
}