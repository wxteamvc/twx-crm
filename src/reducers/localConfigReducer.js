const initialState = {
    modules:[
        {
            name:'我的客户',
            selected:true,
        },
        {
            name:'联系跟进',
            selected:true,
        },
        {
            name:'成交订单',
            selected:true,
        },
        {
            name:'待办任务',
            selected:true,
        },
        {
            name:'功能5',
            selected:true,
        },
        {
            name:'功能6',
            selected:true,
        },
    ]
}

export function localConfigReducer(state = initialState, action){
    switch (action.type){
        case 'changeModules':
            return {
                ...state,
                modules:[...action.data]
            }
        default:
        return state;
    }
}