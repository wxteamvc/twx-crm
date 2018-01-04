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
    ]
}

export function localConfigReducer(state = initialState, action){
    switch (action.type){
        case 'changeModules':
            console.log('接收到新状态');
            console.log(action.data)
            return {
                ...state,
                modules:[...action.data]
            }
        default:
        return state;
    }
}