const homeState = {
    banner: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567190889&di=9d35f2f8a897f2564cd831916897b914&imgtype=0&src=http%3A%2F%2Fimg2.3lian.com%2F2014%2Ff2%2F188%2Fd%2F104.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567223850&di=ae7e3e83311d4295f3e2acb80ab93101&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2Fcb%2F3c%2Fd0%2Fcb3cd04575b89b8dfb29ffc31d22f140.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567248339&di=4b551ad695d2110c208bca8f1f8c2286&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20150819%2Ftooopen_sy_138946578587.jpg'
    ],
    notices: {
        icon: require('../constants/images/通告.png'),
        goUrl: 'notices',
        content: [
            { text: '我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条我是第一条', time: '半小时前' },
            { text: '我是第二条我是第二条我是第二条', time: '半小时前' },
        ]
    },

    activityData : [
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼' ,img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202355&di=b566bee4d945fde1fd671a7cecf5dcbb&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151203%2Ftooopen_sy_150207099617.jpg' },
        { title: '佛门法器知多少', content: '法器是天龙耳目,大家共同遵循的规则' ,img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202354&di=47ce1938ee52366e9e050714252cbcdf&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F81%2F48%2F46R58PICnzD.jpg'},
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼,法器是天龙耳目,大家共同遵循的规则,法器是天龙耳目,大家共同遵循的规则',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202354&di=1ce26073943481207afc6df39cbf2b9c&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151029%2Ftooopen_sy_146750127927.jpg' },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼' ,img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202352&di=19eb13615e508ab9ef31eb8a713dbdb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F69%2F82%2F58PIC2Q58PICsY9.jpg'},
    ],

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