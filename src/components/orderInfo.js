import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, Toast, WhiteSpace, Button, Picker } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';


export default class OrderInfo extends Component {

    render() {
        this.color = this.props.color ? this.props.color : '#fff';
        const color = this.color;
        return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.order_info_head}>
                    <Text style={[styles.fontsize16, { color: color }]}>订单状态:还款中</Text>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.fontsize12, { color: color }]}>实际放款:1800</Text>
                    </View>
                    <View style={[{ flex: 0.5, }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>返点:200</Text>
                    </View>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                    <View style={[{ flex: 0.5, }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>周期天数:1天</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.fontsize12, { color: color }]}>放款周期:5期</Text>
                    </View>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                    <View style={[{ flex: 0.5, }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>每期该还:450</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.fontsize12, { color: color }]}>放款日期:2018-1-05</Text>
                    </View>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_info_rowItem_body]}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.fontsize12, { color: color }]}>业务员:王允</Text>
                    </View>
                    <View style={[{ flex: 0.5, }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>家访员:王司徒</Text>
                    </View>
                </View>
            </View>
        )
    }
}