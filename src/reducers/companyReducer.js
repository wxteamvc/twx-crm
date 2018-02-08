import * as Types from "../actions/actionTypes";


const companyState = {
    list: {
        status: false,
        data: [],
    },
    info: {
        status: false,
        data: {},
    },
}

export function companyReducer(state = companyState, action) {
    switch (action.type) {
        case Types.CompanyList_BEGIN:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'doing',
                }

            }
        case Types.CompanyList_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data,
                    status: 'done',
                    data: state.list.data.concat(action.data.data)
                }
            }
        case Types.CompanyList_FAILED:
            return companyState
        case Types.CompanyHome_BEGIN:
            return {
                ...state,
                info: {
                    ...state.info,
                    status: 'doing',
                }
            }
        case Types.CompanyHome_SUCCESS:
            return {
                ...state,

                info: {
                    status: 'done',
                    data: action.data
                }
            }
        case Types.CompanyHome_FAILED:
            return companyState
        default:
            return state;
    }
}