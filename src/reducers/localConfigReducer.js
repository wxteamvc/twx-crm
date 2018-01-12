const initialState = {
    token:'eyJpdiI6ImR4MTJVR0NNUnlFS1ErQ1ZoWFFGVlE9PSIsInZhbHVlIjoiVmRjcnFRdWM5amowTmx5SGhIbHlBakdUTExvbVh3YytTMlJYdHFoN1NIMD0iLCJtYWMiOiJlOTk3ZTUwMTNiNGNiNTRhMDIzM2E5MjA3ZjFmNTZkYWJhMzg5ZTRhODhjOGIxMDk4MDQwY2I1MDE0MjkyZWNkIn0=',
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
            icon: require('../constants/images/待办任务.png'),
            goUrl: 'CompanyList'
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
        }
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