import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex, Tabs, Badge } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';
import { connect } from 'react-redux';
import { getCustomerInfo } from '../actions/customerAction';
import * as Animatable from 'react-native-animatable';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import InfoPage from '../components/customerInfo'
import Contacts from '../components/customerContacts'
import Orders from '../components/customerOrders'




class CustomerInfo extends Component {
    componentWillMount() {
        console.log(this.props.navigation.state.params.id)
        this.props.dispatch(getCustomerInfo(this.props.navigation.state.params.id));
    }
    
    render() {
        const{data} =this.props.info;
        console.log(data)
        const tabs = [
            { title: <Text>所有订单</Text> },
            { title: <Text>详细资料</Text> },
            { title: <Text>联系人</Text> },
        ];

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <ParallaxScrollView
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={50}
                    parallaxHeaderHeight={150}
                    backgroundSpeed={10}
                    // showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                    renderForeground={
                        () =>
                            <ImageBackground
                                source={require('../constants/images/infobackground.jpg')}
                                style={{ width: ScreenWidth, height: 150 }}
                            >
                                <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                                    <View style={{ marginTop:50 }}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <Icon type={'left'} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.flex_center, { flex: 1 }]}>
                                        <Text style={[styles.fontsize20, { color: '#fff' }]}>{data.cname}</Text>
                                    </View>
                                    <View style={[styles.flex_row_center, { flex: 1, marginBottom: 10 }]}>
                                        <View style={[styles.flex_row_between, { flex: 0.3, paddingLeft: 10, paddingRight: 10 }]}>
                                            <TouchableOpacity
                                                style={[styles.customerInfo_head_btn, styles.flex_center]}
                                                activeOpacity={1}
                                                onPress={() => Linking.openURL(`tel:${data.phone}`)}
                                            >
                                                <Image source={require('../constants/images/电话.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.customerInfo_head_btn, styles.flex_center]}
                                                activeOpacity={1}
                                                onPress={() => Linking.openURL(`smsto:${data.phone}`)}
                                            >
                                                <Image source={require('../constants/images/短信.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                    }
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={[{ marginTop: StatusBarHeight},styles.flex_row_columncenter]}>
                            <TouchableOpacity
                            style={[styles.flex_center,{flex:0.1}]}
                                activeOpacity={1}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon type={'left'} color={'#fff'} />
                            </TouchableOpacity>
                            <View style={[styles.flex_center,{flex:0.8}]}>
                                <Text style={[styles.fontsize16, { color: '#fff' }]}>{data.cname}</Text>
                            </View>
                        </View>
                    )}
                >
                    <Tabs tabs={tabs}
                        initialPage={1}
                    >
                        <Orders {...this.props} data={data.orders}></Orders>
                        <InfoPage {...this.props} data={data}></InfoPage>
                        <Contacts {...this.props} data={data.customer_relation}></Contacts>
                    </Tabs>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        info: state.customerReducer.info,
    }
}
export default connect(mapStateToProps)(CustomerInfo);