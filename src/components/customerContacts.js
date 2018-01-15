/***
 * 
 * 客户联系人渲染页面
 * 
***/

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex, WingBlank } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';

export default class CustomerContacts extends Component {

    renderListItem = ({ item, index }) => {
        return (
            <View style={[styles.flex_row_columncenter, styles.CustomerContacts_item_body]}>
                <View style={[styles.flex_center, { flex: 0.15 }]}>
                    <Image source={require('../constants/images/联系人头像.png')} style={styles.CustomerContacts_item_image} />
                </View>
                <WingBlank size={'sm'} />
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.fontsize14}>房祖名</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc', marginTop: 5 }]}>关系:儿子</Text>
                </View>
                <WingBlank size={'sm'} />
                <View style={[styles.flex_row_between, { flex: 0.2 }]}>
                    <TouchableOpacity
                        style={[styles.customerInfo_head_btn, styles.flex_center]}
                        activeOpacity={1}
                        onPress={() => Linking.openURL('tel:10086')}
                    >
                        <Image source={require('../constants/images/电话-1.png')} style={styles.CustomerContacts_item_rightImg} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.customerInfo_head_btn, styles.flex_center]}
                        activeOpacity={1}
                        onPress={() => Linking.openURL('smsto:10086')}
                    >
                        <Image source={require('../constants/images/短信(绿色).png')} style={styles.CustomerContacts_item_rightImg} />
                    </TouchableOpacity>
                   
                </View>
            </View>
        )
    }

    render() {

        const { data } = this.props
        return (
            <View style={{ flex: 1 }}>
                <WhiteSpace size={'sm'} />
                <FlatList
                    data={[1, 2, 3]}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderListItem}
                    style={{ backgroundColor: '#E9E9EF' }}
                    ItemSeparatorComponent={() => <WhiteSpace size={'sm'} />}
                />
            </View>
        )

    }


}