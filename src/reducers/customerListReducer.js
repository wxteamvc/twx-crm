const customerState = {
    banner: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153670945&di=c738cb8388b3a3a67831b0969534e88d&imgtype=0&src=http%3A%2F%2Fwww.bjzfyr.com%2Fuploads%2Fallimg%2F160303%2F1-160303150U6361.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153700130&di=0b346abd8593cdfbd0954124e18c0a65&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F71%2F16%2F00m58PICphT_1024.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153732575&di=8b43e1bd98ac25b4ec10a6f48a5b0513&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcc11728b4710b912159922dbc9fdfc03924522bf.jpg'
    ],
}



export function homeReducer(state = customerState, action) {
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