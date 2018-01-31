import * as Types from "../actions/actionTypes";

const ordersState = {
    list: {
        data: {
            data: [],
        },
        status: false,
    },
    info: {
        data: {},
        status: false,
    },
}

export function ordersReducer(state = ordersState, action) {
    switch (action.type) {
        case Types.OrderList_BEGIN:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'doing',
                }
            }
        case Types.OrderList_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'done',
                    data: {
                        ...state.list.data,
                        ...action.data,
                        data: state.list.data.data.cnocat(action.data.data)
                    }
                }
            }
        case Types.OrderList_FAILED:
            return ordersState
        default:
            return state;
    }
}