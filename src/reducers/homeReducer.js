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

    activityData: [
        {
            name: '新昌咨询', address: '大东方百货', range: 100, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202355&di=b566bee4d945fde1fd671a7cecf5dcbb&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151203%2Ftooopen_sy_150207099617.jpg',
            bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567190889&di=9d35f2f8a897f2564cd831916897b914&imgtype=0&src=http%3A%2F%2Fimg2.3lian.com%2F2014%2Ff2%2F188%2Fd%2F104.jpg',
        },
        {
            name: '德信咨询', address: '八佰伴11楼', range: 500, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202354&di=47ce1938ee52366e9e050714252cbcdf&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F81%2F48%2F46R58PICnzD.jpg',
            bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567223850&di=ae7e3e83311d4295f3e2acb80ab93101&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2Fcb%2F3c%2Fd0%2Fcb3cd04575b89b8dfb29ffc31d22f140.jpg',
        },
        {
            name: '维信咨询', address: '南禅寺街道', range: 600, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202354&di=1ce26073943481207afc6df39cbf2b9c&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151029%2Ftooopen_sy_146750127927.jpg',
            bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567248339&di=4b551ad695d2110c208bca8f1f8c2286&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20150819%2Ftooopen_sy_138946578587.jpg'
        },
        {
            name: '力宏咨询', address: '崇安寺步行街', range: 800, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517569202352&di=19eb13615e508ab9ef31eb8a713dbdb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F69%2F82%2F58PIC2Q58PICsY9.jpg',
            bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517567190889&di=9d35f2f8a897f2564cd831916897b914&imgtype=0&src=http%3A%2F%2Fimg2.3lian.com%2F2014%2Ff2%2F188%2Fd%2F104.jpg',
        },
    ],

    home_top: [
        { icon: require('../constants/images/录客户.png'), name: '录客户' },
        { icon: require('../constants/images/写跟进.png'), name: '写跟进' },
        { icon: require('../constants/images/建任务.png'), name: '建任务' },
        { icon: require('../constants/images/消息.png'), name: '消息' },
    ],

    home_activity: [
        { title: '外卖新人礼', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517573585242&di=5101bfa7a38cb2a0920e70feb9bcd2be&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Fgm%2F2015%2F0325%2FU11755P115DT20150325134658.jpg', content: '枪最高19元红包' },
        { title: '发红包赚赏金', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517573611150&di=bc709195643fbcbdbc5993e9b5ef5206&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01702f5600cb506ac7251df8908431.png', content: '2份赏金到手' },
        { title: '手机拍证件照', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517573611150&di=f9bf10357f1e002e9ffe54dfa97d17a7&imgtype=0&src=http%3A%2F%2Fimg5.dwstatic.com%2Fwow%2F1602%2F318597067177%2F1454641964420.jpg', content: '原来可以so easy' },
        { title: '交了多年医保', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517573611150&di=f9bf10357f1e002e9ffe54dfa97d17a7&imgtype=0&src=http%3A%2F%2Fimg5.dwstatic.com%2Fwow%2F1602%2F318597067177%2F1454641964420.jpg', content: '你用对了么' },
    ],
}



export function homeReducer(state = homeState, action) {
    switch (action.type) {
        case 'Home_BEGIN':
            return {
                ...state,
                status: 'begin',
                msg: '开始获取首页数据'
            }
        default:
            return state;
    }
}