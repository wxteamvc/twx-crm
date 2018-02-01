import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { styles } from '../constants/styles'
import { NavigationBar, Toast } from 'teaset';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Carousel, List, WhiteSpace, Icon, WingBlank, Popover } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import ActionButton from 'react-native-action-button';
import Icons from 'react-native-vector-icons/dist/FontAwesome';

class CompanyHome extends Component {



    activityData = [
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
        { title: '佛门法器知多少', content: '法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼,法器是天龙耳目,大家共同遵循的规则,法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
    ]

    lunboData = [
        { img: 'http://p.yjbys.com/image/20160919/1474284202349030.png', title: '开借啦开借啦', content: '免息开借啦免息开借啦' },
        { img: 'http://pic1.win4000.com/wallpaper/b/5881ae6e5e47b.jpg', title: '开借啦开借啦', content: '免息开借啦免息开借啦免息开借啦' },
        { img: 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/01/a8e8afe94d0e1e912643537ad60dc540.jpg', title: '开借啦开借啦', content: '免息开借啦免息开借啦免息开借啦免息开借啦' },
    ]

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
        const data = this.lunboData;
        let list = [];
        for (const key in data) {
            list.push(
                <TouchableOpacity key={key} activeOpacity={1} onPress={() => alert('我要跳去别的页面咯')}>
                    <ImageBackground source={{ uri: data[key].img }} style={{ width: ScreenWidth, height: 100 }}>
                        <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' }]}>
                            <View style={{ flex: 0.7, paddingLeft: 30, paddingTop: 20 }}>
                                <Text style={[styles.fontsize12, { color: '#fff' }]}>{data[key].title}</Text>
                                <WhiteSpace size={'sm'} />
                                <Text style={[styles.fontsize10, { color: '#fff' }]} numberOfLines={2}>{data[key].content}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )

        }
        return list
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ParallaxScrollView
                    headerBackgroundColor="#333"
                    contentBackgroundColor={'#E9E9EF'}
                    stickyHeaderHeight={50}
                    parallaxHeaderHeight={130}
                    backgroundSpeed={10}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    renderForeground={
                        () =>
                            <ImageBackground
                                source={require('../constants/images/companybg.jpg')}
                                style={{ width: ScreenWidth, height: 130 }}
                            >
                                <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                                    {/* <View style={[styles.flex_row_between, { , paddingLeft: 10, paddingRight: 10 }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <Icon type={'left'} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                    <WhiteSpace size={'sm'} /> */}
                                    <View style={[styles.flex_row_columncenter, { marginTop: 50 }]}>
                                        <View style={[styles.flex_row_columncenter, { flex: 0.6, paddingLeft: 15 }]}>
                                            <Image source={require('../constants/images/company.jpg')} style={styles.companyHome_head_avatar} />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={[styles.fontsize12, { color: '#fff' }]}>新昌咨询</Text>
                                                <WhiteSpace size={'xs'} />
                                                <Text style={[styles.fontsize10, { color: '#fff' }]}>无锡大东方百货B座11F</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.companyHome_head_foot}>
                                        <Text style={[styles.fontsize10, { color: '#fff' }]}>关注人数:2w</Text>
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
                                <Text style={[styles.fontsize16, { color: '#fff' }]}>新昌咨询</Text>
                            </View>
                        </View>
                    )}
                >
                    <View style={styles.companyHome_content_synopsis_body}>
                        <View style={styles.companyHome_content_synopsis_content}>
                            <Text style={[styles.fontsize10]}>我是公司简介balabala</Text>
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
                    <WhiteSpace size={'sm'} />
                    <View style={{ backgroundColor: '#fff', }}>
                        <View style={[styles.flex_row_between, styles.companyHome_content_activity_header]}>
                            <View style={styles.flex_row_between}>
                                <WingBlank size={'sm'}><Icon type={'\uE604'} color={'#4EC9B0'} size={12} /></WingBlank>
                                <Text style={styles.fontsize12}>公司活动</Text>
                            </View>
                            <TouchableOpacity style={styles.flex_row_columncenter} activeOpacity={1} onPress={() => alert('查看更多')}>
                                <Text style={styles.fontsize10}>更多</Text>
                                <WingBlank size={'sm'}><Icon type={'right'} size={10} /></WingBlank>
                            </TouchableOpacity>
                        </View>
                        {this.renderActivityList()}
                    </View>
                </ParallaxScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)" size={30} offsetX={20}>
                    <ActionButton.Item buttonColor='#9b59b6' title="联系客服" onPress={() => console.log("notes tapped!")} >
                        <Icons name={'comments-o'} size={20} color={'#fff'}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="提交申请" onPress={() => { }}>
                        <Icons name={'pencil-square-o'} size={20} color={'#fff'} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#996600' title="预约见面" onPress={() => { }}>
                        <Icons name={'taxi'} size={18} color={'#fff'}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="收藏公司" onPress={() => { }}>
                        <Icons name={'star-o'} size={20} color={'#fff'}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

export default CompanyHome;