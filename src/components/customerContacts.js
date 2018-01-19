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
import Item from 'antd-mobile/lib/popover/Item';

export default class CustomerContacts extends Component {

    renderListItem = ({ item, index }) => {
        return (
            <View style={[styles.flex_row_columncenter, styles.CustomerContacts_item_body]}>
                <View style={[styles.flex_center, { flex: 0.15 }]}>
                    <Image source={require('../constants/images/客户联系人.png')} style={styles.CustomerContacts_item_image} />
                </View>
                <WingBlank size={'sm'} />
                <WingBlank size={'sm'} />
                <WingBlank size={'sm'} />
                <View style={{ flex: 0.4 }}>
                    <Text style={styles.fontsize16}>{item.contact_name}</Text>
                    <Text style={[styles.fontsize14, { color: '#ccc', marginTop: 5 }]}>关系:{item.contact_relation}</Text>
                </View>
                <WingBlank size={'sm'} />
                <View style={[styles.flex_row_between, { flex: 0.3 }]}>
                    <TouchableOpacity
                        style={[styles.customerInfo_head_btn, styles.flex_center]}
                        activeOpacity={1}
                        onPress={() => Linking.openURL(`tel:${item.contact_phone}`)}
                    >
                        <Image source={require('../constants/images/电话-1.png')} style={styles.CustomerContacts_item_rightImg} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.customerInfo_head_btn, styles.flex_center]}
                        activeOpacity={1}
                        onPress={() => Linking.openURL(`smsto:${item.contact_phone}`)}
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
                    data={data}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderListItem}
                    style={{ backgroundColor: '#E9E9EF' }}
                    ItemSeparatorComponent={() => <WhiteSpace size={'sm'} />}
                />
            </View>
        )

    }


}