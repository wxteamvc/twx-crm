import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    FlatList,
    Image,
    Keyboard,
    ProgressBarAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button } from 'antd-mobile';
import moment from 'moment';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import { createForm } from 'rc-form';
import { getOrderList } from '../actions/ordersAction';
import * as Types from "../actions/actionTypes";
import Collapsible from '../components/Accordion/Collapsible';


class OrdersView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '全部订单',
            showCollapsible: null
        }
    }

    componentDidMount() {
        this.props.dispatch(getOrderList())

    }

    componentWillUnmount() {
        const { resetFields } = this.props.form
        this.props.dispatch({
            type: Types.OrderList_FAILED
        })
        resetFields()
    }

    setShowCollapsible = (key) => {
        const { showCollapsible } = this.state;
        if (showCollapsible == key) {
            return null;
        } else {
            return key;
        }
    }

    getElseList = () => {
        const { data } = this.props.ordersList;
        if (data.next_page_url) {
            this.props.dispatch(getOrderList(data.next_page_url))
        }
    }

    renderFaltListBottom = () => {
        const { ordersList } = this.props;
        if (ordersList.data.current_page == ordersList.data.last_page) {
            return (
                <View style={[styles.flex_center, { paddingTop: 5, paddingBottom: 5 }]}><Text style={styles.fontsize12}>已经到底了哦~~</Text></View>
            )
        } else {
            return (
                <View style={[styles.flex_center, { paddingTop: 5, paddingBottom: 5 }]}><Text style={styles.fontsize12}>加载中...</Text></View>
            )
        }
    }


    data = [
        { value: 100, label: '全部订单' },
        { value: 0, label: '被驳回的订单' },
        { value: 1, label: '待审核的订单' },
        { value: 2, label: '已通过的订单' },
        { value: 3, label: '还款中的订单' },
        { value: 4, label: '已完成的订单' },
        { value: 5, label: '已坏账的订单' },
    ];

    searchdata = [
        { key: 'cname', title: '客户姓名' },
        { key: 'card_id', title: '身份证号' },
        { key: 'phone', title: '手机号码', keyboard: 'number', },
        { key: 'order_id', title: '订单号码', keyboard: 'number', },
    ]



    submitSearch = () => {
        const { validateFields } = this.props.form;
        validateFields((error, value) => {
            console.log(error);
            console.log(value);
            if (error) return;
            alert('我去搜索啦')
        });
    }

    render() {
        const { showCollapsible, type } = this.state;
        const { getFieldProps, getFieldsValue } = this.props.form;
        const { ordersList } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.OrdersView_menu_container]}>
                    <View style={[styles.flex_row_columncenter, styles.OrdersView_menu_header]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({
                                    showCollapsible: this.setShowCollapsible('type')
                                })
                            }}
                            style={[styles.flex_row_center, styles.OrdersView_menu_left]}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5 }]}>{type}</Text>
                            {showCollapsible == 'type' ? <Icon type={"\uE607"} size={10} color={'#ccc'} /> : <Icon type={"\uE606"} size={10} color={'#ccc'} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({
                                    showCollapsible: this.setShowCollapsible('search')
                                })
                            }}
                            style={[styles.flex_row_center, { flex: 1 }]}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5 }]}>搜索</Text>
                            {showCollapsible == 'search' ? <Icon type={"\uE607"} size={10} color={'#ccc'} /> : <Icon type={"\uE606"} size={10} color={'#ccc'} />}
                        </TouchableOpacity>
                    </View>
                    <Collapsible
                        collapsed={this.state.showCollapsible !== 'type'}
                    >
                        <View style={{ width: ScreenWidth, backgroundColor: '#fff' }}>
                            {this.data.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.flex_row_columncenter, { backgroundColor: this.state.type == item.label ? '#E9E9EF' : '#fff' }]}>
                                        <TouchableOpacity
                                            style={[styles.flex_center, styles.OrdersView_menu_content_typeView_item]}
                                            onPress={() => this.setState({ type: item.label, showCollapsible: null })}
                                        >
                                            <Text style={styles.fontsize12}>{item.label}</Text>
                                        </TouchableOpacity>
                                    </View>

                                )
                            })}
                        </View>
                    </Collapsible>
                    <Collapsible
                        collapsed={this.state.showCollapsible !== 'search'}
                    >
                        <View style={{ width: ScreenWidth, backgroundColor: '#fff' }}>
                            {
                                this.searchdata.map((item, index) => {
                                    return (
                                        <InputItem
                                            key={index}
                                            {...getFieldProps(item.key) }
                                            type={item.keyboard ? item.keyboard : null}
                                        >
                                            <Text style={[styles.fontsize12]}>{item.title}</Text>
                                        </InputItem>
                                    )
                                })
                            }
                            <WhiteSpace />
                            <View style={[styles.flex_row_center, { paddingBottom: 5 }]}>
                                <Button type="primary" style={{ flex: 0.3 }} size={'small'}
                                    onClick={this.submitSearch}
                                >
                                    搜索
                                    </Button>
                            </View>
                        </View>
                    </Collapsible>
                    {showCollapsible != null ?
                        <TouchableOpacity
                            onPress={() => this.setState({ showCollapsible: null })}
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: ScreenHeight }}
                        ></TouchableOpacity> :
                        null}
                </View>
                <View style={styles.OrdersView_content_container}>
                    <FlatList
                        data={ordersList.data.data}
                        ListHeaderComponent={() => <WhiteSpace size="sm" />}
                        ListFooterComponent={ordersList.status=='done'?this.renderFaltListBottom:null}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <WhiteSpace size="sm" />}
                        onEndReached={this.getElseList}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        )


    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[styles.OrderListPage_item_body]}
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('OrderInfo', { order_id: item.order_id })}
            >
                <View style={[styles.flex_row_between, styles.OrderListPage_item_header]}>
                    <View style={[styles.flex_row_columncenter, styles.OrderListPage_item_header_left]}>
                        <Text style={styles.fontsize12}>单号 : {item.order_id}</Text>
                    </View>
                    {item.steps >= 2 ? <Text style={[styles.fontsize10, { color: '#ccc' }]}>放款时间 : {moment(parseInt(item.loan_time) * 1000).format('l')}</Text> : null}
                </View>
                <View style={[styles.OrderListPage_item_content]}>
                    <View style={[styles.flex_row_columncenter, { paddingLeft: 15, paddingRight: 15 }]}>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>客户姓名:{item.customer_cname}</Text>
                        </View>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>身份证号:{item.customer_card_id}</Text>
                        </View>
                    </View>
                    {item.steps >= 2 ?
                        <View style={[styles.flex_row_columncenter, { paddingLeft: 15, paddingRight: 15, marginTop: 10 }]}>
                            <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                                <Text style={[styles.fontsize10]} numberOfLines={1}>放款金额:￥{item.loan}</Text>
                            </View>
                            <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                                <Text style={[styles.fontsize10]} numberOfLines={1}>已还金额:￥{item.balance}</Text>
                            </View>
                        </View> : null}
                </View>
                <View style={[styles.flex_row_end, styles.OrderListPage_item_footer]}>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>录入人:{item.input_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state) {
    return {
        ordersList: state.ordersReducer.list,
    }
}

const FormOrdersView = createForm()(OrdersView)
export default connect(mapStateToProps)(FormOrdersView);