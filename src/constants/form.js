export const ApplicationForm = [
    {
        type: 'input',
        key: 'cname',
        title: '姓名',
        rules:
            [
                { required: true, message: '姓名必须填写' }
            ]
    },
    {
        type: 'picker',
        key: 'sex',
        title: '性别',
        rules:
            [
                { required: true, message: '性别必须选择' }
            ],
        options: [
            {
                label: '男',
                value: '1',
            },
            {
                label: '女',
                value: '2',
            }
        ]
    },
    {
        type: 'input',
        key: 'card_id',
        title: '身份证',
        rules:
            [
                { required: true, message: '身份证必须填写' },
                { len: 18, message: '身份证是18位' },
            ]
    },
    {
        type: 'input',
        key: 'phone',
        title: '手机号码',
        keyboard: 'number',
        rules:
            [
                { required: true, message: '手机号码必须填写' },
                { len: 11, message: '手机号码是11位' },
            ]
    },
    // {
    //     type: 'input',
    //     key: 'serve_password',
    //     title: '服务密码',
    // },
    {
        type: 'input',
        key: 'home_address',
        title: '家庭住址',
        rules:
            [
                { required: true, message: '家庭住址必须填写' }
            ]
    },
    // {
    //     type: 'input',
    //     key: 'home_tel',
    //     title: '家庭电话',
    // },
    // {
    //     type: 'input',
    //     key: 'living_mark',
    //     title: '居住备注',
    // },
    // {
    //     type: 'input',
    //     key: 'car_brand',
    //     title: '车辆品牌',
    // },
    // {
    //     type: 'input',
    //     key: 'car_code',
    //     title: '车牌号码',
    // },
    // {
    //     type: 'input',
    //     key: 'car_age',
    //     title: '车龄',
    //     keyboard:'number',
    // },
    // {
    //     type: 'input',
    //     key: 'company',
    //     title: '任职公司',
    // },
    // {
    //     type: 'input',
    //     key: 'industry',
    //     title: '所属行业',
    // },
    // {
    //     type: 'input',
    //     key: 'company_address',
    //     title: '公司地址',
    // },
    // {
    //     type: 'input',
    //     key: 'company_tel',
    //     title: '公司电话',
    //     keyboard:'number',
    // },
    {
        type: 'input',
        key: 'job',
        title: '公司职务',
    },
    // {
    //     type: 'input',
    //     key: 'job_age',
    //     title: '任职年数',
    //     keyboard:'number',
    // },
    {
        type: 'input',
        key: 'income',
        title: '月收入',
        extra: "¥",
        keyboard: 'number',
    },
    // {
    //     type: 'input',
    //     key: 'social_password',
    //     title: '社保密码',
    // },
    // {
    //     type: 'input',
    //     key: 'social_password',
    //     title: '社保密码',
    // },
    // {
    //     type: 'input',
    //     key: 'accumulation_fund',
    //     title: '公积金号',
    // },
    // {
    //     type: 'input',
    //     key: 'accumulation_password',
    //     title: '公积金密码',
    // },
]


