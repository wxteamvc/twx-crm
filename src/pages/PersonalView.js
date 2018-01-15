import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    SectionList,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar, ListRow } from 'teaset';
import { Card, WhiteSpace, Grid, List } from 'antd-mobile';
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

    componentWillMount() {

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

    renderListRow = (listData)=>{
        let list = [];
        listData.map((items,index)=>{
            list.push(
                <View  key={index}>
                    <Card full>
                        <Card.Body>
                            {renderItem(items)}
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </View>
            )
        })
        function renderItem(items){
            let row = [];
            items.map((item,index)=>{
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
        let { initData, userInfo,navigation } = this.props;
        const rightView = (
            <NavigationBar.LinkButton
                onPress={() => {
                    navigation.navigate('Login');
                }}
                title="设置"
            />
        )
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
            { name: '订单管理' },
            { name: '客户管理' },
            { name: '还款管理' },
            { name: '过账管理' },
            { name: '通知管理' },
        ];
        const listData = [
            [
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
            ],
            [
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
                {title:'个人消息',icon:require('../constants/images/个人消息.png')},
            ]

        ];
        if (userInfo.status == 'done' || userInfo.info !== null) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 66, backgroundColor: "#337AB7", padding: 0, margin: 0 }}>
                        <NavigationBar title='我的'
                            ref={(ref) => this.navBar = ref}
                            rightView={rightView}
                        />
                    </View>
                    <PullView
                        style={{ top: -1}}
                        showsVerticalScrollIndicator={false}
                        onPullRelease={this.onPullRelease}
                        topIndicatorRender={this.topIndicatorRender}
                        topIndicatorHeight={60}
                        isPullEnd={userInfo.status == 'done'?true:false}
                    >
                        <Card full
                            style={{ borderWidth: 0, backgroundColor: "#337AB7"}}
                        >
                            <Card.Header
                                title={null}
                                thumb={<Image
                                    source={{ uri: "http://www.wxdevelop.com/xc-cms/public/avatar/20180102/16b76ea61a3b26e1f590f72699868d15.jpg" }}
                                    style={{ height: 80, width: 80 }}
                                />}
                                extra={<Text>{userInfo.info.nickname}</Text>}
                            />
                        </Card>
                        {userInfo.info.rid <= 2 ? headerBottom :false}
                        <WhiteSpace size="lg" />
                        <View style={{ backgroundColor: "#fff" }}>
                            <Grid data={data}
                                columnNum={3}
                                renderItem={dataItem => (
                                    <Text>{dataItem.name}</Text>
                                )}
                            />
                        </View>
                        <WhiteSpace size="lg" />
                        {this.renderListRow(listData)}
                    </PullView>
                </View>
            )
        }
        return <Loading />
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