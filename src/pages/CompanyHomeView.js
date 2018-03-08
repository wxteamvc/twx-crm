import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    ProgressBarAndroid,
    Animated,
    Easing
} from 'react-native';
import { styles } from '../constants/styles'
import { NavigationBar, Toast } from 'teaset';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Carousel, List, WhiteSpace, Icon, WingBlank, Popover } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import ActionButton from 'react-native-action-button';
import Icons from 'react-native-vector-icons/FontAwesome';
import { getCompanyHome } from '../actions/companyAction';
import { connect } from 'react-redux';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import * as Types from "../actions/actionTypes";

class CompanyHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    activityData = [
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
        { title: '佛门法器知多少', content: '法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼,法器是天龙耳目,大家共同遵循的规则,法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
    ]

    componentDidMount() {
        const { cid } = this.props.navigation.state.params;
        this.props.dispatch(getCompanyHome(cid))
    }

    renderActivityList = () => {
        const data = this.activityData;
        let list = [];
        for (const key in data) {
            list.push(
                <View key={key} style={[styles.flex_row_columncenter, styles.companyHome_content_activity_listItem_body]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.flex_center, { flex: 0.2 }]}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={data[key].img ? { uri: data[key].img } : require('../constants/images/activity.png')}
                            />
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.fontsize12, { color: '#000' }]}>{data[key].title}</Text>
                            <WhiteSpace size={'xs'} />
                            <Text style={styles.fontsize10} numberOfLines={1}>{data[key].content}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row_columncenter, { position: 'absolute', bottom: 10, right: 5, }]}>
                        <Text style={[styles.fontsize10, { marginRight: 3, color: '#ccc' }]}>{data[key].count}</Text>
                        <Icon type={'\uE688'} size={12} color={'#ccc'} />
                    </View>
                </View>
            )
        }
        return list
    }

    renderLunbo() {
        const { navigation, companyInfo } = this.props;
        const data = companyInfo.data.company_home.company_home_carousel;
        let list = [];
        for (const key in data) {
            list.push(
                <TouchableOpacity key={key} activeOpacity={1} onPress={() => alert('我要跳去别的页面咯')}>
                    <ImageBackground source={{ uri: data[key].img }} style={{ width: ScreenWidth, height: parseInt(ScreenWidth / 3) }}>
                        <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', flexDirection: 'row' }]}>
                            <View style={{ flex: 0.7, paddingLeft: 30, paddingTop: 20 }}>
                                <Text style={[styles.fontsize14, { color: '#fff' }]}>{data[key].title ? data[key].title : null}</Text>
                                <WhiteSpace size={'sm'} />
                                <Text style={[styles.fontsize12, { color: '#fff' }]} numberOfLines={2}>{data[key].content ? data[key].content : null}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )

        }
        return list
    }

    render() {
        const { navigation, companyInfo, userInfo, dispatch } = this.props;
        const company = companyInfo.data;
        const topData = companyInfo.data.company_home;
        const { info, isLogin } = userInfo;
        const { params } = navigation.state;
        if (companyInfo.status == 'done') {
            return (
                <View style={{ flex: 1 }}>
                    <ParallaxScrollView
                        headerBackgroundColor="#333"
                        contentBackgroundColor={'#E9E9EF'}
                        stickyHeaderHeight={50}
                        parallaxHeaderHeight={150}
                        backgroundSpeed={10}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        renderForeground={
                            () =>
                                <ImageBackground
                                    source={{ uri: topData.company_background }}
                                    style={{ width: ScreenWidth, height: 150 }}
                                >
                                    <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                                        <View style={[styles.flex_row_columncenter, { marginTop: 50 }]}>
                                            <View style={[styles.flex_row_columncenter, { flex: 0.6, paddingLeft: 15 }]}>
                                                <View style={styles.flex_center}>
                                                    <Image source={{ uri: topData.company_avatar }} style={styles.companyHome_head_avatar} />
                                                    <WhiteSpace size={'xs'} />
                                                    {isLogin && companyInfo.data.id == info.cid && info.rid == 3 ?
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            style={styles.companyHome_head_modify_btn}
                                                            onPress={() => this.props.navigation.navigate('CompanyEdit', { companyInfo: companyInfo.data })}
                                                        >
                                                            <Text style={[styles.fontsize12, { color: '#fff' }]}>编辑</Text>
                                                        </TouchableOpacity> : null
                                                    }

                                                </View>
                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <Text numberOfLines={2} style={[styles.fontsize12, { color: '#fff' }]}>{companyInfo.data.company_name}</Text>
                                                    <WhiteSpace size={'xs'} />
                                                    <Text numberOfLines={3} style={[styles.fontsize10, { color: '#fff' }]}>{companyInfo.data.address}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_row_columncenter, styles.companyHome_head_foot_container]}>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={styles.companyHome_head_foot_btn}
                                                onPress={() => {
                                                    if (isLogin) {
                                                        Util.post(Urls.FollowCompany_url + `/${companyInfo.data.id}`, {},
                                                            (respJson) => {
                                                                if (respJson.code == 1) {
                                                                    dispatch({
                                                                        type: Types.Change_User_Info,
                                                                        data: respJson.data
                                                                    })
                                                                }
                                                                Toast.message(respJson.msg);
                                                            },
                                                            (error) => {
                                                                Toast.message(error.message);
                                                            }
                                                        )
                                                    } else {
                                                        Toast.message('请先登录')
                                                    }
                                                }}
                                            >
                                                <Icon type={isLogin && (info.follow.indexOf(companyInfo.data.id) >= 0) ? '\uE6A3' : '\uE6A4'} color={'#FD7D7C'} size={20} />
                                            </TouchableOpacity>
                                            <View style={styles.companyHome_head_foot_text}>
                                                <Text style={[styles.fontsize10, { color: '#fff' }]}>关注人数:&nbsp;{companyInfo.data.follow_count + companyInfo.data.pre_follow}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                        }
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={[{ marginTop: StatusBarHeight }, styles.flex_row_columncenter]}>
                                <TouchableOpacity
                                    style={[styles.flex_center, { flex: 0.1 }]}
                                    activeOpacity={1}
                                    onPress={() => this.props.navigation.goBack()}
                                >
                                    <Icon type={'left'} color={'#fff'} />
                                </TouchableOpacity>
                                <View style={[styles.flex_center, { flex: 0.8 }]}>
                                    <Text style={[styles.fontsize16, { color: '#fff' }]}>{companyInfo.data.company_name}</Text>
                                </View>
                            </View>
                        )}
                    >
                        <View style={styles.companyHome_content_synopsis_body}>
                            <View style={[styles.companyHome_content_synopsis_content,]}>
                                <Text style={[styles.fontsize12]}>{topData.company_about}</Text>
                                <View style={{ height: 10 }}></View>
                                <View style={[styles.flex_row_center, { height: 50 }]}>
                                    <View style={[styles.flex_center, { flex: 0.5, borderColor: '#ccc', borderRightWidth: 0.5 }]}>
                                        <View style={[styles.flex_center]}>
                                            <Text style={[styles.fontsize14]}>成交订单</Text>
                                            <WhiteSpace size={'xs'} />
                                            <Text style={styles.fontsize12}>
                                                {company.orders_count + company.pre_count}笔
                                                </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.flex_center, { flex: 0.5 }]}>
                                        <View style={[styles.flex_center]}>
                                            <Text style={[styles.fontsize14]}>借出金额</Text>
                                            <WhiteSpace size={'xs'} />
                                            <Text style={styles.fontsize12}>
                                                {company.orders_sum + company.pre_order_money}元</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.companyHome_content_synopsis_position}>
                                <View style={styles.companyHome_content_synopsis_position_title}>
                                    <Text style={[styles.fontsize12, { color: '#fff' }]}>公司简介</Text>
                                </View>
                                <View style={styles.companyHome_content_synopsis_position_jiao}></View>
                            </View>
                        </View>
                        <WhiteSpace size={'sm'} />
                        <Carousel
                            autoplayInterval={5000}
                            autoplay
                            infinite
                            dots={false}
                        >
                            {this.renderLunbo()}
                        </Carousel>
                        {/* <WhiteSpace size={'sm'} />
                        <View style={[styles.flex_row_columncenter, styles.companyHome_count_container]}>


                        </View> */}
                        <WhiteSpace size={'sm'} />
                        <View style={{ backgroundColor: '#fff', }}>
                            <View style={[styles.flex_row_between, styles.companyHome_content_activity_header]}>
                                <View style={styles.flex_row_between}>
                                    <WingBlank size={'sm'}><Icon type={'\uE604'} color={'#4EC9B0'} size={12} /></WingBlank>
                                    <Text style={styles.fontsize12}>公司活动</Text>
                                </View>
                                <TouchableOpacity style={styles.flex_row_columncenter} activeOpacity={1} onPress={() => alert('查看更多')}>
                                    <Text style={styles.fontsize10}>更多</Text>
                                    <WingBlank size={'sm'}><Icon type={'right'} size={10} color={'#ccc'} /></WingBlank>
                                </TouchableOpacity>
                            </View>
                            {this.renderActivityList()}
                        </View>
                    </ParallaxScrollView>
                    {params.staff ? null :
                        <ActionButton buttonColor="rgba(231,76,60,1)" size={30} offsetX={20}>
                            <ActionButton.Item buttonColor='#9b59b6' title="联系客服" onPress={() => console.log("notes tapped!")} >
                                <Icons name={'comments-o'} size={20} color={'#fff'} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#3498db' title="提交申请" onPress={() => {this.props.navigation.navigate('Application') }}>
                                <Icons name={'pencil-square-o'} size={20} color={'#fff'} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#996600' title="预约见面" onPress={() => {this.props.navigation.navigate('Appointment')}}>
                                <Icons name={'taxi'} size={18} color={'#fff'} />
                            </ActionButton.Item>
                        </ActionButton>
                    }
                </View>
            )
        } else {
            return (
                <View style={[{ flex: 1 }, styles.flex_center]}>
                    <StatusBar
                        translucent={false}
                        backgroundColor='#40a9ff'
                    />
                    <ProgressBarAndroid styleAttr="Inverse" />
                </View>
            )
        }

    }
    _renderActionButton = (extraData) => {
        let ActionButtonlist = [];
        if (extraData) {
            extraData.map((item, index) => {
                if (item.ison == 1) {
                    ActionButtonlist.push(
                        <ActionButton.Item buttonColor={item.color} title={item.title}
                            key={index}
                            onPress={() => { }}>
                            <Icons name={item.icon} size={18} color={'#fff'} />
                        </ActionButton.Item>
                    )
                }
            })
            return (
                <ActionButton buttonColor="rgba(231,76,60,1)" size={30} offsetX={20}>
                    {ActionButtonlist}
                </ActionButton>
            )
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        companyInfo: state.companyReducer.info,
        userInfo: state.personalReducer
    }
}
export default connect(mapStateToProps)(CompanyHome);