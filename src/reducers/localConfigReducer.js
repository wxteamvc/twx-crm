const initialState = {
    banner:[
           'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153670945&di=c738cb8388b3a3a67831b0969534e88d&imgtype=0&src=http%3A%2F%2Fwww.bjzfyr.com%2Fuploads%2Fallimg%2F160303%2F1-160303150U6361.jpg' ,
           'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153700130&di=0b346abd8593cdfbd0954124e18c0a65&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F71%2F16%2F00m58PICphT_1024.jpg',
           'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153732575&di=8b43e1bd98ac25b4ec10a6f48a5b0513&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcc11728b4710b912159922dbc9fdfc03924522bf.jpg' 
    ],
   notices:{
        icon: require('../constants/images/通告.png'),
        goUrl:'notices',
        content:[
           {text:'我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条',time:'半小时前'},
           {text:'我是第二条我是第二条我是第二条',time:'半小时前'},
        ]       
    },

    home_top: [
        { icon: require('../constants/images/录客户.png'), name: '录客户' },
        { icon: require('../constants/images/写跟进.png'), name: '写跟进' },
        { icon: require('../constants/images/建任务.png'), name: '建任务' },
        { icon: require('../constants/images/消息.png'), name: '消息' },
    ],

    modules: [
        {
            name: '潜在客户',
            selected: true,
            icon: require('../constants/images/潜在客户.png'),
            goUrl: 'home'
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