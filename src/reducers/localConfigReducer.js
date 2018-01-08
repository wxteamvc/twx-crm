const initialState = {
    modules: [
        {
            name: '潜在客户',
            selected: true,
            icon: require('../constants/images/潜在客户.png'),
            goUrl: 'CustomerList'
        },
        {
            name: '待办任务',
            selected: true,
            icon: require('../constants/images/待办任务.png')
        },
        {
            name: '审批订单',
            selected: true,
            icon: require('../constants/images/审批订单.png')
        },
        {
            name: '工作日志',
            selected: true,
            icon: require('../constants/images/工作日志.png')
        },
        {
            name: '移动考勤',
            selected: true,
            icon: require('../constants/images/移动考勤.png')
        },
        {
            name: '个人消息',
            selected: true,
            icon: require('../constants/images/个人消息.png')
        },
        {
            name: '系统消息',
            selected: true,
            icon: require('../constants/images/系统消息.png')
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

export function localConfigReducer(state = initialState, action) {
    switch (action.type) {
        case 'changeModules':
            return {
                ...state,
                modules: [...action.data]
            }
        default:
            return state;
    }
}