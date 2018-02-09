import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, StatusBar, Platform, BackHandler, TouchableOpacity, Linking } from 'react-native';
import { Grid, WhiteSpace, Carousel, Flex, WingBlank, Icon, Button } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import Notices from '../components/notices';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import * as Types from "../actions/actionTypes";
import { Toast } from 'teaset';
import Icons from 'react-native-vector-icons/Ionicons';

class Home extends Component {
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {

    }

    renderCarouselItem = () => {
        const { top_banner } = this.props.home.data;
        const items = top_banner.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => {
                        switch (item.type) {
                            case 1:
                                console.log(item.gourl, item.params)
                                this.props.navigation.navigate(item.gourl, item.params)
                                break;
                            case 2:
                                Linking.openURL(item.gourl)
                                break;
                            default:
                                break;
                        }

                    }}
                >
                    <Image resizeMode={'cover'} source={{ uri: item.banner_url }} style={{ width: ScreenWidth, height: 180 }} />
                </TouchableOpacity>

            )
        })
        return items
    }

    renderServeFlatListItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1 }}
                onPress={() => alert('服务')}
            >
                <Flex direction={'row'} align={'center'} style={styles.home_serve_title_item}>
                    <Flex direction={'column'} align={'center'} style={{ flex: 0.7 }}>
                        <Text numberOfLines={1} style={[styles.fontsize12, { color: '#000' }]}>{item.title}</Text>
                        <Text numberOfLines={1} style={styles.fontsize10}>{item.content}</Text>
                    </Flex>
                    <Flex justify={'center'} align={'center'} style={{ flex: 0.3 }}>
                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </Flex>
                </Flex>
            </TouchableOpacity>

        )
    }

    renderFlatListItem = ({ item }) => {
        const { dispatch } = this.props;
        const { isLogin, info } = this.props.userInfo;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.home_activity_title_item}
                onPress={() => this.props.navigation.navigate('CompanyHome', { cid: item.id, staff: false })}
            >
                <View style={styles.home_activity_title_item_top}></View>
                <View style={[styles.flex_center]}>
                    <View style={styles.home_activity_title_item_img_container}>
                        <Image source={{ uri: item.company_home.company_avatar }} style={styles.home_activity_title_item_img_img} />
                    </View>
                    <Text numberOfLines={1} style={[styles.fontsize12, { color: '#000' }]}>{item.company_name}</Text>
                    {/* <Text numberOfLines={1} style={styles.fontsize10}>{item.address}</Text> */}
                    <WhiteSpace size={'sm'} />
                    <TouchableOpacity style={[styles.home_activity_title_item_btn, { backgroundColor: isLogin && (info.follow.indexOf(item.id) >= 0) ? '#FD7D7C' : '#40a9ff' }]}
                        activeOpacity={1}
                        onPress={() => {
                            if (isLogin) {
                                Util.post(Urls.FollowCompany_url + `/${item.id}`, {},
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
                        <Text style={[styles.fontsize12, { color: '#fff' }]}>{isLogin && (info.follow.indexOf(item.id) >= 0) ? '已关注' : '关注'} </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    numToMoney(sum) {
        if (sum >= 10000) {
            sum = (sum / 10000).toFixed(2);
            return `${sum}万`;
        } else {
            return `${sum}元`;
        }
    }

    renderActivityList = ({ item }) => {
        // console.log(item)
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('CompanyHome', { cid: item.id, staff: false })}
                style={[styles.flex_row_columncenter, styles.companyHome_content_activity_listItem_body]}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.flex_center, { flex: 0.4 }]}>
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 5 }}
                            source={{ uri: item.company_home.company_avatar }}
                        />
                    </View>
                    <View style={[{ flex: 0.6, paddingRight: 10 }]}>
                        <View style={[styles.flex_column_columncenter, { flex: 0.2 }]}>
                            <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={1}>{item.company_name}</Text>
                            <Text style={styles.fontsize12} numberOfLines={1}>{item.address}</Text>
                        </View>
                        <View style={[styles.flex_column_columncenter, { flex: 0.5 }]}>
                            <Text style={styles.fontsize10} numberOfLines={3}>{item.company_home.company_about}</Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                        <View style={[styles.flex_column_end, { flex: 0.2 }]}>
                            <View style={[styles.flex_row_between]}>
                                {item.appointment ? <Button type="ghost" size={'small'} disabled style={{ borderColor: '#39B07E' }}>
                                    <Text style={[styles.fontsize10, { color: '#39B07E' }]}>预约</Text>
                                </Button>
                                    : null}
                                <View style={styles.flex_row_columncenter}>
                                    <Icon type={'\uE66F'} color={'#ccc'} size={12} />
                                    <Text style={[styles.fontsize10, { color: '#ccc', marginLeft: 5 }]}>{item.orders_count + item.pre_count}</Text>
                                </View>
                                <View style={styles.flex_row_columncenter}>
                                    <Icon type={'\uE6A6'} color={'#ccc'} size={12} />
                                    <Text style={[styles.fontsize10, { color: '#ccc', marginLeft: 5 }]}>{this.numToMoney(item.orders_sum + item.pre_order_money)}</Text>
                                </View>
                                <View style={styles.flex_row_columncenter}>
                                    <Icon type={'\uE6A4'} color={'#ccc'} size={12} />
                                    <Text style={[styles.fontsize10, { color: '#ccc', marginLeft: 5 }]}>{item.follow_count + item.pre_follow}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    render() {
        const { modules, home, userInfo } = this.props;
        const { notices, activityData, home_activity, HomeInfo } = home.data;
        const isReady = home.isReady;
        // console.log(home)
        if (isReady) {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={true}
                        backgroundColor='rgba(0,0,0,0.3)'
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Carousel
                            dots={false}
                            autoplay={true}
                            infinite={true}
                            autoplayInterval={5000}
                        >
                            {this.renderCarouselItem()}
                        </Carousel>
                        <WhiteSpace size={'sm'} />
                        <View style={[styles.flex_row_columncenter, styles.home_activity_title, { borderBottomWidth: 0 }]}>
                            <View style={[styles.home_activity_title_View, { borderColor: '#FF4611' }]}>
                                <Text style={[styles.fontsize14, { fontWeight: 'bold' }]}>为您推荐</Text>
                            </View>
                        </View>
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 5 }}
                            data={home.data.recommend_companys}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => <View style={{ width: 5 }}></View>}
                            ListHeaderComponent={() => <View style={{ width: 5 }}></View>}
                            ListFooterComponent={() => <View style={{ width: 5 }}></View>}
                            renderItem={this.renderFlatListItem}
                        />
                        <WhiteSpace size={'sm'} />
                        <FlatList
                            style={{ backgroundColor: '#fff' }}
                            ListHeaderComponent={
                                <View style={[styles.flex_row_columncenter, styles.home_activity_title]}>
                                    <View style={styles.home_activity_title_View}>
                                        <Text style={[styles.fontsize14, { fontWeight: 'bold' }]}>生活服务</Text>
                                    </View>
                                </View>
                            }
                            data={[]}
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderServeFlatListItem}
                        />
                        <WhiteSpace size={'sm'} />
                        {/* <Notices data={notices} imageSize={30} callBack={(item) => { alert('我要去' + item.goUrl) }} /> */}
                        <WhiteSpace size={'sm'} />
                        <FlatList
                            style={{ backgroundColor: '#fff' }}
                            ListHeaderComponent={
                                <View style={[styles.flex_row_between, styles.home_activity_title]}>
                                    <View style={[styles.home_activity_title_View, { borderColor: '#CC0000' }]}>
                                        <Text style={[styles.fontsize14, { fontWeight: 'bold' }]}>最热</Text>
                                    </View>
                                    <TouchableOpacity style={styles.flex_row_columncenter} activeOpacity={1} onPress={() => { alert('换一批') }}>
                                        <Text style={styles.fontsize12}>换一批</Text>
                                        <WingBlank size={'sm'}><Icons name={'md-sync'} size={16} color={'#7A7A7A'} /></WingBlank>
                                    </TouchableOpacity>
                                </View>
                            }
                            data={home.data.company_list}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderActivityList}
                        />
                        <WhiteSpace size={'sm'} />
                        <TouchableOpacity style={[styles.flex_center, { height: 50, backgroundColor: '#fff' }]} onPress={() => this.props.navigation.navigate('CompanyList')}>
                            <Text>查看全部公司</Text>
                        </TouchableOpacity>
                        <WhiteSpace size={'sm'} />
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>

                </View>
            )
        }

    }
}


function mapStateToProps(state) {
    return {
        modules: state.localConfigReducer.modules,
        home: state.homeReducer,
        init: state.initReducer,
        userInfo: state.personalReducer
    }
}
export default connect(mapStateToProps)(Home);

