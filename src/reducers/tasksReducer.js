import * as Types from "../actions/actionTypes";


const tasksState = {
    list_loading:false,
    list_status:false,
    list:{
        from:[],
        from_count:0,
        to:[],
        to_count:0,
        finish:[],
        finish_count:0
    },
    form_loading:false,
    form_status:false,
    formOptions:{
        customer_list:[],
        user_list:[],
        types:[]
    },
}

export function tasksReducer(state = tasksState, action) {
    switch (action.type) {
        case Types.Get_Task_List_BEGIN:
            return {
                ...state,
                list_loading:true,
                list_status:false,
            }
        case Types.Get_Task_List_SUCCESS:
            return {
                ...state,
                list_loading:false,
                list_status:true,
                list:action.data
            }
        case Types.Get_Task_List_FAILED:
            return {
                ...state,
                list_loading:false,
                list_status:false,
            }
        case Types.Get_Task_Form_BEGIN:
            return {
                ...state,
                form_loading:true,
                form_status:false,
            }
        case Types.Get_Task_Form_SUCCESS:
            return {
                ...state,
                form_loading:false,
                form_status:true,
                formOptions:action.data
            }
        case Types.Get_Task_Form_FAILED:
            return {
                ...state,
                form_loading:false,
                form_status:false,
            }
        default:
            return state;
    }
}