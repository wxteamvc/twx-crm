import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar, ListRow, Button, Toast, Badge } from 'teaset';
import { Card, WhiteSpace, Grid, List, NoticeBar, Icon, WingBlank } from 'antd-mobile';
import { PullView } from 'react-native-pull';
import { initPersonal } from '../actions/personalAction';
import Loading from '../components/loading';
import { styles } from '../constants/styles';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { ScreenWidth } from '../constants/global';

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    componentDidMount() {
        let { token } = this.props.localConfigReducer;
        if (token !== '') {
            global.token = token;
            this.props.dispatch(initPersonal());
        }

    }
    componentDidUpdate() {
        let { token } = this.props.localConfigReducer;
        if (global.token !== token) {
            global.token = token;
            this.props.dispatch(initPersonal());
        }
    }
    onPullRelease = (resolve) => {
        //do something
        this.props.dispatch(initPersonal());
    }

    topIndicatorRender(pulling, pullok, pullrelease, gesturePosition) {
        const hide = { position: 'absolute', left: 10000 };
        const show = { position: 'relative', left: 0 };
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: show });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: show });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: show });
            }
        }, 1);

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                <Text ref={(c) => { this.txtPulling = c; }}>下拉中...</Text>
                <Text ref={(c) => { this.txtPullok = c; }}>松开刷新</Text>
                <Text ref={(c) => { this.txtPullrelease = c; }}>刷新中</Text>
            </View>
        );
    }

    renderListRow = (listData) => {
        let list = [];
        for (const key in listData) {
            list.push(
                <View key={key}>
                    <List>
                        {this.renderItem(listData[key])}
                    </List>
                    <WhiteSpace size="lg" />
                </View>
            )
        }



        return list;
    }

    renderItem(items) {
        const { userInfo, navigation } = this.props;
        let row = [];
        for (const key in items) {
            row.push(
                <ListRow key={key} title={items[key].title} detail={items[key].detail ? items[key].detail : null}
                    icon={items[key].icon}
                    accessory='indicator'
                    onPress={() => {
                        if (userInfo.isLogin) {
                            navigation.navigate(items[key].gourl, items[key].extra)
                        } else {
                            navigation.navigate('Login')
                        }
                    }}
                />)
        }
        return row;
    }


    renderGrid = (dataItem) => {
        return (
            <View style={[styles.flex_center, { marginTop: 10 }]}>
                <Image source={dataItem.icon} style={{ width: 35, height: 35 }} />
                <Text style={styles.fontsize10}>{dataItem.name}</Text>
            </View>
        )
    }

    renderRid() {
        const { initData, userInfo, navigation } = this.props;
        const { rid } = userInfo.info;
        switch (rid) {
            case 100:
                return '普通用户'
                break;
            case 3:
                return '公司创建者'
                break;
            case 4:
                return '公司主管'
                break;
            case 5:
                return '公司财务'
                break;
            case 6:
                return '公司业务员'
                break;
            case 7:
                return '公司家访员'
                break;
            default:
                return ''
                break;
        }
    }

    render() {
        let { initData, userInfo, navigation } = this.props;
        console.log(userInfo)
        const { info } = userInfo;
        const rightView = (
            <NavigationBar.IconButton
                onPress={() => {
                    navigation.navigate('Setting');
                }}
                icon={require('../constants/images/设置.png')}
            />);
        const data = [
            { name: '公司主页', gourl: 'CompanyHome', icon: require('../constants/images/personal/主页.png'), extra: userInfo.isLogin ? { cid: userInfo.info.cid, staff: true } : null },
            { name: '客户管理', gourl: 'CustomerList', icon: require('../constants/images/personal/客户.png') },
            { name: '订单管理', gourl: 'Orders', icon: require('../constants/images/personal/订单.png') },
            { name: '还款管理', gourl: 'Repay', icon: require('../constants/images/personal/还款3.png') },
            { name: '通知管理', gourl: 'Orders', icon: require('../constants/images/personal/通知.png') },
            { name: '项目发布', gourl: 'Orders', icon: require('../constants/images/personal/信息发布.png') },
            { name: '指派任务', gourl: 'Tasks', icon: require('../constants/images/personal/任务.png') },
            { name: '账单管理', gourl: 'Orders', icon: require('../constants/images/personal/账单.png') },
            { name: '消费记录', gourl: 'UserChat', icon: require('../constants/images/personal/消费.png'), extra: { chatWith: 7 } },
            { name: '公司设置', gourl: 'Orders', icon: require('../constants/images/personal/设置.png') },
            { name: '更多', gourl: 'EditModules', icon: require('../constants/images/personal/设置.png') },
        ];
        const listData = [
            [
                { title: '我的订单', icon: require('../constants/images/personal/订单1.png') },
                { title: '我的关注', icon: require('../constants/images/personal/关注.png') },
                { title: '个人消息', icon: require('../constants/images/personal/消息.png'), gourl: 'Notice', extra: { notice: userInfo.info }, detail: userInfo.isLogin && info.notice_all > 0 ? <Badge count={info.notice_all} /> : null },
                { title: '浏览记录', icon: require('../constants/images/personal/足迹1.png') },
            ],
            [
                { title: '联系我们', icon: require('../constants/images/personal/联系我们.png') },
                { title: '认证服务', icon: require('../constants/images/personal/公司.png'), gourl: 'Authentication' },
            ],
            [
                { title: '企业服务' },
                { title: '协议及申明' },
            ]

        ];
        const userCard = userInfo.isLogin ?
            <Button title='个人信息' type='secondary' onPress={() => navigation.navigate('SetUserInfo')} />
            : <Button title='登陆' type='secondary' onPress={() => navigation.navigate('Login')} />;
        const avatar = userInfo.isLogin && userInfo.info.avatar_path ? { uri: userInfo.info.avatar_path } : require('../constants/images/头像.png');
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 66, backgroundColor: "#337AB7", padding: 0, margin: 0 }}>
                    <NavigationBar title='我的'
                        ref={(ref) => this.navBar = ref}
                        rightView={rightView}
                    />
                </View>
                <PullView
                    style={{ top: -1 }}
                    showsVerticalScrollIndicator={false}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={60}
                    isPullEnd={userInfo.status == 'done' ? true : false}
                >
                    {userInfo.isLogin ?
                        <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#337AB7' }} >
                            <View style={[styles.flex_row_columncenter]}>
                                <View style={[styles.flex_row_center, { flex: 0.5 }]}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => navigation.navigate('SetUserInfo')}
                                        style={[{ borderRadius: 36, borderColor: '#fff', borderWidth: 1 }]}
                                    >
                                        <Image
                                            source={avatar}
                                            style={{ height: 70, width: 70, borderRadius: 35 }}
                                        />
                                    </TouchableOpacity>
                                    <WingBlank size={'md'}>
                                        <View>
                                            <Text style={[styles.fontsize14, { color: '#fff' }]}>{userInfo.info.nickname}</Text>
                                            <View style={{ padding: 5, paddingTop: 1, paddingBottom: 1, borderColor: '#fff', borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                                                <Text style={[styles.fontsize10, { color: '#fff' }]}>{this.renderRid()}</Text>
                                            </View>
                                        </View>

                                    </WingBlank>
                                </View>
                                <View style={[styles.flex_row_end, { flex: 0.5 }]}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            if (info.is_auth == 0) {
                                                navigation.navigate('PersonalAuthentication')
                                            }
                                        }}
                                        style={[styles.flex_row_center, { height: 30, paddingLeft: 10, paddingRight: 10, borderBottomLeftRadius: 15, borderTopLeftRadius: 15, backgroundColor: info.is_auth ? '#0099CC' : '#8a8a8a' }]}>
                                        <View style={[styles.flex_center, { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginRight: 10 }]}>
                                            {info.is_auth ? <Icons size={16} name={'check'} color={'#0099CC'} /> :
                                                <Icons size={16} name={'check'} color={'#8a8a8a'} />}
                                        </View>
                                        <Text style={[styles.fontsize12, { color: '#fff' }]}>{info.is_auth ? '已认证' : '未认证'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> :
                        <View style={[styles.flex_row_center, { paddingTop: 10, paddingBottom: 10, backgroundColor: '#337AB7' }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => navigation.navigate('Login')}
                                style={styles.flex_column_rowcenter}
                            >
                                <View
                                    style={[{ borderRadius: 36, borderColor: '#fff', borderWidth: 1 }]}
                                >
                                    <Image
                                        source={avatar}
                                        style={{ height: 70, width: 70, borderRadius: 35 }}
                                    />
                                </View>
                                <WhiteSpace size={'md'}/>
                                <Text style={[styles.fontsize12,{color:'#fff'}]}>点击登录</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {/* <NoticeBar mode="closable" >
                        你的个人认证没有通过
                    </NoticeBar> */}
                    {userInfo.isLogin && userInfo.info.rid < 100 ?
                        <List>
                            <Grid data={data}
                                columnNum={5}
                                carouselMaxRow={2}
                                isCarousel={true}
                                infinite={true}
                                renderItem={this.renderGrid}
                                hasLine={false}
                                onClick={(dataItem, index) => {
                                    navigation.navigate(dataItem.gourl, dataItem.extra)
                                }}
                            />
                        </List> : false}

                    <WhiteSpace size="lg" />
                    {this.renderListRow(listData)}
                </PullView>
            </View>
        )
    }

}


function mapStateToProps(state) {
    return {
        initData: state.initReducer,
        localConfigReducer: state.localConfigReducer,
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(Personal);