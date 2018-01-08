const homeState = {
    banner: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153670945&di=c738cb8388b3a3a67831b0969534e88d&imgtype=0&src=http%3A%2F%2Fwww.bjzfyr.com%2Fuploads%2Fallimg%2F160303%2F1-160303150U6361.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153700130&di=0b346abd8593cdfbd0954124e18c0a65&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F71%2F16%2F00m58PICphT_1024.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153732575&di=8b43e1bd98ac25b4ec10a6f48a5b0513&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcc11728b4710b912159922dbc9fdfc03924522bf.jpg'
    ],
    notices: {
        icon: require('../constants/images/通告.png'),
        goUrl: 'notices',
        content: [
            { text: '我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条', time: '半小时前' },
            { text: '我是第二条我是第二条我是第二条', time: '半小时前' },
        ]
    },

    home_top: [
        { icon: require('../constants/images/录客户.png'), name: '录客户' },
        { icon: require('../constants/images/写跟进.png'), name: '写跟进' },
        { icon: require('../constants/images/建任务.png'), name: '建任务' },
        { icon: require('../constants/images/消息.png'), name: '消息' },
    ],

    home_activity: [
        { title: '外卖新人礼', image: 'http://bpic.588ku.com/element_origin_min_pic/00/01/64/535680e00b8e39d.jpg', content: '枪最高19元红包' },
        { title: '发红包赚赏金', image: 'http://bpic.588ku.com/element_origin_min_pic/00/01/64/535680e00b8e39d.jpg', content: '2份赏金到手' },
        { title: '手机拍证件照', image: 'http://bpic.588ku.com/element_origin_min_pic/00/01/64/535680e00b8e39d.jpg', content: '原来可以so easy' },
        { title: '交了多年医保', image: 'http://bpic.588ku.com/element_origin_min_pic/00/01/64/535680e00b8e39d.jpg', content: '你用对了么' },
    ],
}



export function homeReducer(state = homeState, action) {
    switch (action.type) {
        case 'Home_BEGIN':
            return {
                ...state,
                status: 'begin',
                msg:'开始获取首页数据'
            }
        default:
            return state;
    }
}