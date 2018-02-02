import * as Types from "../actions/actionTypes";

const ordersState = {
    list: {
        data: {
            data: [],
        },
        status: false,
        isReady: false,
    },
    info: {
        data: {},
        status: false,
        isReady: false,
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
                    isReady: true,
                    data: {
                        ...action.data,
                        data: state.list.data.data.concat(action.data.data)
                    }
                }
            }
        case Types.OrderList_FAILED:
            return ordersState
        case Types.OrderInfo_BEGIN:
            return {
                ...state,
                info: {
                    ...state.info,
                    status: 'doing',
                }
            }
        case Types.OrderInfo_SUCCESS:
            return {
                ...state,
                info: {
                    ...state.info,
                    status: 'done',
                    isReady: true,
                    data: action.data
                }
            }
        case Types.OrderInfo_FAILED:
            return ordersState
        default:
            return state;
    }
}