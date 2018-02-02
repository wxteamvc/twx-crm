import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, Toast, WhiteSpace, Button, Picker } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

export default class OrderInfo extends Component {



    renderOrderStatus = (steps) => {
        switch (steps) {
            case 0:
                return '被驳回'
                break;
            case 1:
                return '待审核'
                break;
            case 2:
                return '已通过'
                break;
            case 3:
                return '还款中'
                break;
            case 4:
                return '已完成'
                break;
            case 5:
                return '已坏账'
                break;
            default:
                return ''
                break;
        }
    }

    color = [
        '#f50', '#FAAD14', '#52C41A', '#52C41A', '#108ee9', '#f50'
    ]

    jiaoColor = [
        '#F22F11', '#D2691E', '#228B22', '#228B22', '#0000CD', '#F22F11'
    ]

    render() {
        const { data } = this.props;
        return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.companyHome_content_synopsis_body}>
                    <View style={styles.companyHome_content_synopsis_content}>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>客户姓名:&nbsp;{data.customer.cname}</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>性别:&nbsp;{data.customer.sex == 1 ? '男' : '女'}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={[{ flex: 1 }]}>
                                <Text style={[styles.fontsize12]}>身份证号:&nbsp;{data.customer.card_id}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>电话号码:&nbsp;{data.customer.phone}</Text>
                            </View>
                            <View style={[styles.flex_row_columncenter, { flex: 0.5 }]}>
                                <TouchableOpacity
                                    style={[styles.flex_center, { marginRight: 20 }]}
                                    activeOpacity={1}
                                    onPress={() => Linking.openURL(`tel:${data.customer.phone}`)}
                                >
                                    <Animatable.View animation="tada" iterationCount="infinite" duration={5000}>
                                        <Image source={require('../constants/images/电话-1.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.flex_center]}
                                    activeOpacity={1}
                                    onPress={() => Linking.openURL(`smsto:${data.customer.phone}`)}
                                >
                                    <Animatable.View animation="tada" iterationCount="infinite" duration={9000}>
                                        <Image source={require('../constants/images/短信(绿色).png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    </Animatable.View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>实际放款:&nbsp;&yen;&nbsp;{data.loan}</Text>
                            </View>
                            <View style={[{ flex: 0.5, }]}>
                                <Text style={[styles.fontsize12]}>返点:&nbsp;&yen;&nbsp;{data.rebate}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={[{ flex: 0.5, }]}>
                                <Text style={[styles.fontsize12]}>周期天数:&nbsp;{data.cycle_interval}&nbsp;天</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>放款周期:&nbsp;{data.total_cycle}&nbsp;期</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={[{ flex: 0.5, }]}>
                                <Text style={[styles.fontsize12]}>每期该还:&nbsp;&yen;&nbsp;{data.cycle_total}</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>放款日期:&nbsp;{moment(parseInt(data.loan_time) * 1000).format('l')}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.fontsize12]}>业务员:{data.salesman}</Text>
                            </View>
                            <View style={[{ flex: 0.5, }]}>
                                <Text style={[styles.fontsize12]}>家访员:{data.home_visitor}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.companyHome_content_synopsis_position}>
                        <View style={[styles.companyHome_content_synopsis_position_title, { backgroundColor: this.color[data.steps] }]}>
                            <Text style={[styles.fontsize12, { color: '#fff' }]}>订单状态:{this.renderOrderStatus(data.steps)}</Text>
                        </View>
                        <View style={[styles.companyHome_content_synopsis_position_jiao, { borderBottomColor: this.jiaoColor[data.steps] }]}></View>
                    </View>
                </View>

            </View>
        )
    }
}