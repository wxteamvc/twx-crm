import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, Toast, WhiteSpace, Button, Picker ,WingBlank} from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';


export default class OrderCycle extends Component {

    renderListItem = ({ item, index }) => {
        const color = this.color;

        function renderCycleStasus() {
            if (item.repay_money == 0) {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期还款状态:</Text>
                        <WingBlank><Image source={require('../constants/images/伤心.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize12, { color: color }]}>本期未还</Text>
                    </View>
                )
            } else if (item.repay_money > 0 && item.repay_money - item.cycle_money >= 0) {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期还款状态:</Text>
                        <WingBlank><Image source={require('../constants/images/大笑.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize12, { color: color }]}>已还完</Text>
                    </View>
                )
            } else {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期还款状态:</Text>
                        <WingBlank><Image source={require('../constants/images/微笑.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize12, { color: color }]}>未还完</Text>
                    </View>
                )
            }
        }



        return (
            <View style={styles.order_cycle_listItem}>
                <View style={[styles.flex_row_between, styles.order_cycle_listItem_head]}>
                    <Text style={[styles.fontsize14, { color: color }]}>第{index}期</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>周期开始:2018-1-10</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>周期结束:2018-1-15</Text>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_cycle_listItem_body]}>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期本金</Text>
                        <Text style={[styles.fontsize10, { color: color }]}>400</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期应还</Text>
                        <Text style={[styles.fontsize10, { color: color }]}>450</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>已还金额</Text>
                        <Text style={[styles.fontsize10, { color: color }]}>450</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12, { color: color }]}>本期盈亏</Text>
                        <Text style={[styles.fontsize10, { color: color }]}>50</Text>
                    </View>
                </View>
                {renderCycleStasus()}
            </View>
        )
    }


    render() {
        this.color = this.props.color ? this.props.color : '#fff';
        return (
            <View style={styles.order_cycle_container}>
                <FlatList
                    data={[{ repay_money: 0, cycle_money: 450 }, { repay_money: 450, cycle_money: 450 }, { repay_money: 400, cycle_money: 450 }, { repay_money: 500, cycle_money: 450 }, { repay_money: 0, cycle_money: 450 }, { repay_money: 450, cycle_money: 450 }, { repay_money: 400, cycle_money: 450 }, { repay_money: 500, cycle_money: 450 }, { repay_money: 0, cycle_money: 450 }, { repay_money: 450, cycle_money: 450 }, { repay_money: 400, cycle_money: 450 }, { repay_money: 500, cycle_money: 450 }]}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={styles.order_cycle_whitespace} />}
                    renderItem={this.renderListItem}
                    initialNumToRender={5}
                />
            </View>
        )
    }
}