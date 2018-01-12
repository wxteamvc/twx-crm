import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';
import { connect } from 'react-redux';
import { getCustomerList } from '../actions/customerAction';
import * as Animatable from 'react-native-animatable';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import InfoPage from '../components/customerInfo'
import Contacts from '../components/customerContacts'
import Orders from '../components/customerOrders'


class CustomerInfo extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <ImageBackground
                    source={require('../constants/images/infobackground.jpg')}
                    style={{ width: ScreenWidth, height: 150 }}
                >
                    <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                        <View style={{ marginTop: StatusBarHeight + 5, paddingLeft: 10 }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon type={'left'} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flex_center, { flex: 1 }]}>
                            <Text style={[styles.fontsize20, { color: '#fff' }]}>成龙</Text>
                        </View>
                        <View style={[styles.flex_row_center, { flex: 1, marginBottom: 10 }]}>
                            <View style={[styles.flex_row_between, { flex: 0.3, paddingLeft: 10, paddingRight: 10 }]}>
                                <TouchableOpacity
                                    style={[styles.customerInfo_head_btn, styles.flex_center]}
                                    activeOpacity={1}
                                    onPress={() => Linking.openURL('tel:10086')}
                                >
                                    <Image source={require('../constants/images/电话.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.customerInfo_head_btn, styles.flex_center]}
                                    activeOpacity={1}
                                    onPress={() => Linking.openURL('smsto:10086')}
                                >
                                    <Image source={require('../constants/images/短信.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollableTabView
                    initialPage={1}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={{ backgroundColor: '#40a9ff' }}
                    tabBarActiveTextColor={'#40a9ff'}
                    scrollWithoutAnimation={true}
                    tabBarBackgroundColor={'#fff'}
                >
                    <Orders tabLabel='所有订单' data={'我是列表'}></Orders>
                    <InfoPage tabLabel='详细资料' data={{card_id:'320555195507084569',income:1000000}}></InfoPage>
                    <Contacts tabLabel='联系人' data={'我是联系人'}></Contacts>
                </ScrollableTabView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        customerReducer: state.customerReducer,
        list: state.customerReducer.list,
    }
}
export default connect(mapStateToProps)(CustomerInfo);