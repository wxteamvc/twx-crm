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
import { NavigationBar, ListRow, Button } from 'teaset';
import { Card, WhiteSpace, Grid, List, } from 'antd-mobile';
import { PullView } from 'react-native-pull';
import { initPersonal } from '../actions/personalAction';
import Loading from '../components/loading';

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
        if (token !== "") {
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
        listData.map((items, index) => {
            list.push(
                <View key={index}>
                    <Card full>
                        <Card.Body>
                            {renderItem(items)}
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </View>
            )
        })
        function renderItem(items) {
            let row = [];
            items.map((item, index) => {
                row.push(
                    <ListRow key={index} title={item.title} detail='Detail'
                        icon={item.icon}
                        accessory='indicator'
                    />)
            })
            return row;
        }

        return list;
    }

    render() {
        let { initData, userInfo, navigation } = this.props;
        const rightView = (
            <NavigationBar.IconButton
                onPress={() => {
                    navigation.navigate('Setting');
                }}
                icon={require('../constants/images/设置.png')}
            />);
        const headerBottom = (
            <Card full
                style={{ borderWidth: 0, backgroundColor: "#fff" }}
            >
                <Card.Header
                    title="公司管理"
                    thumb={<Image
                        source={require('../constants/images/个人消息.png')}
                        style={{ height: 20, width: 20 }}
                    />}
                />
            </Card>
        );
        const data = [
            { name: '订单管理', gourl: 'Orders' },
            { name: '客户管理', gourl: 'Orders' },
            { name: '还款管理', gourl: 'Repay' },
            { name: '过账管理', gourl: 'Orders' },
            { name: '通知管理', gourl: 'Orders' },
        ];
        const listData = [
            [
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
            ],
            [
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
                { title: '个人消息', icon: require('../constants/images/个人消息.png') },
            ]

        ];
        const userCard = userInfo.isLogin ?
            <Button title='个人信息' type='secondary' onPress={() => navigation.navigate('SetUserInfo')} />
            : <Button title='登陆' type='secondary' onPress={() => navigation.navigate('Login')} />;
        const avatar = userInfo.isLogin ?
            { uri: userInfo.info.avatar_path }
            : require('../constants/images/头像.png');
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
                    <Card full style={{ borderWidth: 0, backgroundColor: "#337AB7" }}>
                        <Card.Header
                            title={null}
                            thumb={
                                <Image
                                    source={avatar}
                                    style={{ height: 70, width: 70, borderRadius: 35 }}
                                />}
                            extra={userCard}
                        />
                    </Card>
                    {userInfo.isLogin && userInfo.info.rid <= 2 ? headerBottom : false}
                    <WhiteSpace size="lg" />
                    <View style={{ backgroundColor: "#fff" }}>
                        <Grid data={data}
                            columnNum={3}
                            renderItem={dataItem => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(dataItem.gourl)}>
                                    <Text>{dataItem.name}</Text>
                                </TouchableOpacity>

                            )}
                        />
                    </View>

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