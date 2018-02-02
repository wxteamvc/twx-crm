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
import { List, InputItem, Toast, WhiteSpace, Button, Picker, WingBlank } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import moment from 'moment';

export default class OrderCycle extends Component {

    renderListItem = ({ item, index }) => {
        function renderCycleStasus() {
            if (item.repay_money == 0) {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize10]}>本期还款状态:</Text>
                        <WingBlank size={'sm'}><Image source={require('../constants/images/伤心.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize10]}>本期未还</Text>
                    </View>
                )
            } else if (item.repay_money > 0 && item.repay_money - item.cycle_money >= 0) {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize10]}>本期还款状态:</Text>
                        <WingBlank size={'sm'}><Image source={require('../constants/images/大笑.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize10]}>已还完</Text>
                    </View>
                )
            } else {
                return (
                    <View style={[styles.flex_row_end, styles.order_cycle_listItem_foot]}>
                        <Text style={[styles.fontsize10]}>本期还款状态:</Text>
                        <WingBlank size={'sm'}><Image source={require('../constants/images/微笑.png')} style={styles.order_cycle_listItem_foot_img} /></WingBlank>
                        <Text style={[styles.fontsize10]}>未还完</Text>
                    </View>
                )
            }
        }



        return (
            <View style={styles.order_cycle_listItem}>
                <View style={[styles.flex_row_between, styles.order_cycle_listItem_head]}>
                    <Text style={[styles.fontsize12]}>第{item.order_cycle}期</Text>
                    <Text style={[styles.fontsize10]}>周期开始:{moment(parseInt(item.start_time) * 1000).format('l')}</Text>
                    <Text style={[styles.fontsize10]}>周期结束:{moment(parseInt(item.end_time) * 1000).format('l')}</Text>
                </View>
                <View style={[styles.flex_row_columncenter, styles.order_cycle_listItem_body]}>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12]}>本期本金</Text>
                        <Text style={[styles.fontsize10]}>&yen;&nbsp;{item.cycle_principal}</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12]}>本期应还</Text>
                        <Text style={[styles.fontsize10]}>&yen;&nbsp;{item.cycle_money}</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12]}>已还金额</Text>
                        <Text style={[styles.fontsize10]}>&yen;&nbsp;{item.repay_money}</Text>
                    </View>
                    <View style={[styles.flex_column_rowcenter, { flex: 1 }]}>
                        <Text style={[styles.fontsize12]}>本期盈亏</Text>
                        <Text style={[styles.fontsize10]}>&yen;&nbsp;{item.profit}</Text>
                    </View>
                </View>
                {renderCycleStasus()}
            </View>
        )
    }


    render() {
        const {data} = this.props;
        return (
            <View style={styles.order_cycle_container}>
                <FlatList
                    data={data.order_cycle}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={styles.order_cycle_whitespace} />}
                    renderItem={this.renderListItem}
                    initialNumToRender={5}
                    ListFooterComponent={() => <WhiteSpace size={'sm'} />}
                    ListHeaderComponent={() => <WhiteSpace size={'sm'} />}

                />
            </View>
        )
    }
}