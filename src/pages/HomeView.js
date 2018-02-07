import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, StatusBar, Platform, BackHandler, TouchableOpacity } from 'react-native';
import { Grid, WhiteSpace, Carousel, Flex, WingBlank, Icon } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import Notices from '../components/notices';

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
        const { banner } = this.props.home.data;
        const items = banner.map((item, index) => {
            return (
                <Image resizeMode={'cover'} source={{ uri: item }} style={{ width: ScreenWidth, height: 180 }} key={index} />
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
        return (
            <View style={styles.home_activity_title_item}>
                <View style={styles.home_activity_title_item_top}></View>
                <View style={[styles.flex_center]}>
                    <View style={styles.home_activity_title_item_img_container}>
                        <Image source={item.image ? { uri: item.image } : { uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517573585242&di=5101bfa7a38cb2a0920e70feb9bcd2be&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Fgm%2F2015%2F0325%2FU11755P115DT20150325134658.jpg' }} style={styles.home_activity_title_item_img_img} />
                    </View>
                    <Text numberOfLines={1} style={[styles.fontsize12, { color: '#000' }]}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.fontsize10}>{item.content}</Text>
                    <WhiteSpace size={'sm'} />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.home_activity_title_item_btn}
                        onPress={() => { alert('关注') }}
                    >
                        <Text style={[styles.fontsize10, { color: '#fff' }]}>关注</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderActivityList = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('CompanyHome')}
                style={[styles.flex_row_columncenter, styles.companyHome_content_activity_listItem_body]}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.flex_center, { flex: 0.5 }]}>
                        <Image
                            style={{ height: 100, width: 150, borderRadius: 5 }}
                            source={item.img ? { uri: item.img } : require('../constants/images/activity.png')}
                        />
                    </View>
                    <View style={[{ flex: 0.5, paddingRight: 10 }]}>

                        <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={1}>{item.name}</Text>
                        <WhiteSpace size={'xs'} />
                        <Text style={styles.fontsize12} numberOfLines={1}>{item.address}</Text>
                        <WhiteSpace size={'sm'} />
                        <Text style={styles.fontsize10} numberOfLines={3}>我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala我是公司简介balabala
                        </Text>
                        <WhiteSpace size={'sm'} />
                        <View style={[styles.flex_row_end, { position: 'absolute', bottom: 0, right: 10, }]}>
                            <WingBlank size={'sm'}><Icon type={'\uE6A4'} size={12} color={'#ccc'} /></WingBlank>
                            <Text style={[styles.fontsize10, { color: '#ccc' }]}>2456</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.flex_row_columncenter, { position: 'absolute', top: 10, right: 10, }]}>
                    <Text style={[styles.fontsize10]}>{item.range}米</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { modules, home, isLogin } = this.props;
        const { notices, activityData, home_activity, HomeInfo } = home.data;
        const isReady = home.isReady;
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
                                <Text style={styles.fontsize12}>为您推荐</Text>
                            </View>
                        </View>
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 5 }}
                            data={HomeInfo}
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
                                        <Text style={styles.fontsize12}>生活服务</Text>
                                    </View>
                                </View>
                            }
                            data={home_activity}
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderServeFlatListItem}
                        />
                        <WhiteSpace size={'sm'} />
                        <Notices data={notices} imageSize={30} callBack={(item) => { alert('我要去' + item.goUrl) }} />
                        <WhiteSpace size={'sm'} />
                        <FlatList
                            style={{ backgroundColor: '#fff' }}
                            ListHeaderComponent={
                                <View style={[styles.flex_row_between, styles.home_activity_title]}>
                                    <View style={[styles.home_activity_title_View, { borderColor: '#CC0000' }]}>
                                        <Text style={styles.fontsize12}>离我最近</Text>
                                    </View>
                                    <TouchableOpacity style={styles.flex_row_columncenter} activeOpacity={1} onPress={() => this.props.navigation.navigate('CompanyList')}>
                                        <Text style={styles.fontsize10}>更多</Text>
                                        <WingBlank size={'sm'}><Icon type={'right'} size={10} color={'#ccc'} /></WingBlank>
                                    </TouchableOpacity>
                                </View>
                            }
                            data={activityData}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderActivityList}
                            ListFooterComponent={
                                <View style={[styles.flex_center, { paddingTop: 5, paddingBottom: 5,backgroundColor:'#fff' }]}>
                                    <Text style={styles.fontsize10}>已经到底了哦~~~</Text>
                                </View>
                            }
                        />

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
        isLogin: state.personalReducer.isLogin,
    }
}
export default connect(mapStateToProps)(Home);

