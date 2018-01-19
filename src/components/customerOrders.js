/***
 * 
 * 客户订单列表渲染页面
 * 
***/

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';
import { Item } from 'antd-mobile/lib/tab-bar';

export default class OrderListPage extends Component {




    renderListItem = ({ item, index }) => {
        const images = [
            require('../constants/images/审核驳回.png'),
            require('../constants/images/待审核.png'),
            require('../constants/images/审核通过.png'),
            require('../constants/images/开始还款.png'),
            require('../constants/images/订单完成.png'),
            require('../constants/images/坏账.png')
        ]

        const status = [
            '被驳回', '待审核', '审核通过', '还款中', '订单完成', '已坏账'
        ]
        const color = [
            '#f50', '#FAAD14', '#52C41A', '#52C41A', '#108ee9', '#f50'
        ]
        return (
            <TouchableOpacity 
            style={[styles.OrderListPage_item_body,{backgroundColor: '#fff'}]}
            activeOpacity ={1}
            onPress={()=>this.props.navigation.navigate('OrderInfo',{order_id:item.order_id})}
            >
                <View style={[styles.flex_row_between, styles.OrderListPage_item_header]}>
                    <View style={styles.flex_row_columncenter}>
                        <Image source={require('../constants/images/单号.jpg')} style={styles.OrderListPage_item_header_img} />
                        <Text style={styles.fontsize12}>单号 : {item.order_id}</Text>
                    </View>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>放款时间 : {item.loan_time}</Text>
                </View>
                <View style={[styles.flex_row_between, styles.OrderListPage_item_content]}>
                    <View style={styles.flex_row_columncenter}>
                        <Image source={images[item.steps]} style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={[styles.fontsize12, { color: color[item.steps] }]}>{status[item.steps]}</Text>
                    </View>
                    <Text style={[styles.fontsize10, { flex: 0.4 }]} numberOfLines={1}>放款金额:￥{item.loan}</Text>
                    <Text style={[styles.fontsize10, { flex: 0.4 }]} numberOfLines={1}>已还金额:￥{item.balance}</Text>
                </View>
                <View style={[styles.flex_row_between,styles.OrderListPage_item_footer]}>
                    <Text style={[styles.fontsize10,{color:'#ccc'}]}>所属公司:新昌咨询(还是死数据 等后台传回)</Text>
                    <Text style={[styles.fontsize10,{color:'#ccc'}]}>录入人:{item.input_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }




    render() {
    
        const { data } = this.props
        return (
            <View style={{ flex: 1 }}>
                <WhiteSpace size={'sm'} />
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderListItem}
                    style={{ backgroundColor: '#E9E9EF' }}
                    ItemSeparatorComponent={()=><WhiteSpace size={'sm'}/>}
                />
            </View>
        )

    }


}