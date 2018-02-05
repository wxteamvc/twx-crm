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

    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { params } = this.props.navigation.state;
        if (params){

        }
    }

    pageData = {
        topData:{
            background:require('../constants/images/companyHome/默认背景.jpg'),
            logo:require('../constants/images/companyHome/默认logo.jpg'),
            title:'XX公司',
            address:'XXX市XXX路XXX号',
            about:'公司介绍...'
        },
        carouselData:[
            { img: require('../constants/images/companyHome/模板轮播图1.jpg'), title: '开借啦开借啦', content: '免息开借啦免息开借啦' },
            { img: require('../constants/images/companyHome/模板轮播图2.jpg'), title: '开借啦开借啦', content: '免息开借啦免息开借啦免息开借啦' },
        ],
        extraData:[
            {title:'联系客服',ison:1,icon:'comments-o',color:'#9b59b6'},
            {title:'提交申请',ison:1,icon:'pencil-square-o',color:'#3498db'},
            {title:'预约见面',ison:1,icon:'taxi',color:'#996600'},
            {title:'收藏公司',ison:1,icon:'star-o',color:'#1abc9c'},
        ]
    }


    activityData = [
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
        { title: '佛门法器知多少', content: '法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼,法器是天龙耳目,大家共同遵循的规则,法器是天龙耳目,大家共同遵循的规则', count: 2000 },
        { title: '初学佛时,我们如何发心', content: '发乎心止乎礼', count: 2000 },
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
        const data = this.pageData.carouselData;
        let list = [];
        for (const key in data) {
            list.push(
                <TouchableOpacity key={key} activeOpacity={1} onPress={() => alert('我要跳去别的页面咯')}>
                    <ImageBackground source={data[key].img} style={{ width: ScreenWidth, height: ScreenWidth/2 }}>
                        <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', flexDirection: 'row' }]}>
                            <View style={{position:'absolute', bottom: 30, left: 20 }}>
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
        const { topData,extraData } = this.pageData;
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
                                source={topData.background}
                                style={{ width: ScreenWidth, height: 130}}
                            >
                                <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                                    <View style={[styles.flex_row_columncenter, { marginTop: 50 }]}>
                                        <View style={[styles.flex_row_columncenter, { flex: 0.6, paddingLeft: 15 }]}>
                                            <Image source={topData.logo} style={styles.companyHome_head_avatar} />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={[styles.fontsize12, { color: '#fff' }]}>{topData.title}</Text>
                                                <WhiteSpace size={'xs'} />
                                                <Text style={[styles.fontsize10, { color: '#fff' }]}>{topData.address}</Text>
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
                                <Text style={[styles.fontsize16, { color: '#fff' }]}>{topData.title}</Text>
                            </View>
                        </View>
                    )}
                >
                {topData.about ? 
                    <View style={styles.companyHome_content_synopsis_body}>
                        <View style={styles.companyHome_content_synopsis_content}>
                            <Text style={[styles.fontsize10]}>{topData.about}</Text>
                        </View>
                        <View style={styles.companyHome_content_synopsis_position}>
                            <View style={styles.companyHome_content_synopsis_position_title}>
                                <Text style={[styles.fontsize12, { color: '#fff' }]}>公司简介</Text>
                            </View>
                            <View style={styles.companyHome_content_synopsis_position_jiao}></View>
                        </View>
                    </View>:null
                }

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
                 {this._renderActionButton(extraData)}
                {/* <ActionButton buttonColor="rgba(231,76,60,1)" size={30} offsetX={20}>
                    <ActionButton.Item buttonColor='#9b59b6' title={item.title}
                        key={index}
                        onPress={()=>{}}>
                        <Icons name={item.icon} size={18} color={'#fff'}/>
                    </ActionButton.Item>
                </ActionButton> */}

            </View>
        )
    }
    _renderActionButton = (extraData)=>{
        let ActionButtonlist = [];
        if (extraData){
            extraData.map((item,index)=>{
                if (item.ison == 1){
                    ActionButtonlist.push(
                        <ActionButton.Item buttonColor={item.color} title={item.title}
                            key={index}
                            onPress={()=>{}}>
                            <Icons name={item.icon} size={18} color={'#fff'}/>
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

export default CompanyHome;