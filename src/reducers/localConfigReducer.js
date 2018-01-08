const initialState = {
   home_top :[
        {icon:require('../constants/images/录客户.png'),name:'录客户'},
        {icon:require('../constants/images/写跟进.png'),name:'写跟进'},
        {icon:require('../constants/images/建任务.png'),name:'建任务'},
        {icon:require('../constants/images/消息.png'),name:'消息'},
    ],
    modules:[
        {
            name:'我的客户',
            selected:true,
            icon:require('../constants/images/消息.png'),
            goUrl:'home'
        },
        {
            name:'联系跟进',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'成交订单',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'待办任务',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'功能5',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'功能6',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
                {
            name:'我的客户',
            selected:true,
            icon:require('../constants/images/消息.png'),
            goUrl:'home'
        },
        {
            name:'联系跟进',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'成交订单',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'待办任务',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'功能5',
            selected:true,
            icon:require('../constants/images/消息.png')
        },
        {
            name:'功能6',
            selected:true,
            icon:require('../constants/images/消息.png')
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