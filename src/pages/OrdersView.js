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
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import { createForm } from 'rc-form';

class OrdersView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_get_typeHeight: false,
            is_get_searchHeight: false,
            typeHeight: new Animated.Value(0),
            searchHeight: new Animated.Value(0),
            showType: true,
            showSearch: true,
            type: '已通过的订单'
        }
    }

    data = [
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


    getHeight = (e, key) => {
        if (!this.state['is_get_' + key]) {
            this[key] = e.layout.height;
            this.setState({ ['is_get_' + key]: true })
        }
    }

    menuButtonOnPress = (key1, key2) => {
        if (this.state[key1]) {
            this.showView(key2)
        } else {
            this.hideView(key2)
        }
        this.setState({ [key1]: !this.state[key1] });
    }

    showView = (key) => {
        Animated.timing(this.state[key], {
            toValue: this[key],
            duration: 300,
            easing: Easing.linear,// 线性的渐变函数
        }).start();
    }

    hideView = (key) => {
        const { resetFields } = this.props.form;
        Animated.timing(this.state[key], {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,// 线性的渐变函数
        }).start(() => {
            resetFields();
            Keyboard.dismiss()
        });
    }

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
        const { is_get_typeHeight, is_get_searchHeight, showType, showSearch, type } = this.state;
        const { getFieldProps, getFieldsValue } = this.props.form;
        const typeViewStyles = {
            height: this.state.typeHeight,
        };
        const searchViewStyles = {
            height: this.state.searchHeight
        };

        return (
            <View style={{ flex: 1  }}>
                <View style={[styles.OrdersView_menu_container]}>
                    <View style={[styles.flex_row_columncenter, styles.OrdersView_menu_header]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.state.searchHeight.setValue(0)
                                this.setState({ showSearch: true })
                                this.menuButtonOnPress('showType', 'typeHeight')
                            }}
                            style={[styles.flex_row_center, styles.OrdersView_menu_left]}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5 }]}>{type}</Text>
                            {showType ? <Icon type={"\uE606"} size={10} color={'#ccc'} /> : <Icon type={"\uE607"} size={10} color={'#ccc'} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.state.typeHeight.setValue(0)
                                this.setState({ showType: true })
                                this.menuButtonOnPress('showSearch', 'searchHeight')
                            }}
                            style={[styles.flex_row_center, { flex: 1 }]}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5 }]}>搜索</Text>
                            {showSearch ? <Icon type={"\uE606"} size={10} color={'#ccc'} /> : <Icon type={"\uE607"} size={10} color={'#ccc'} />}
                        </TouchableOpacity>
                    </View>
                    <Animated.View onLayout={({ nativeEvent: e }) => this.getHeight(e, 'typeHeight')}
                        style={[is_get_typeHeight ? typeViewStyles : { opacity: 0 }, { backgroundColor: '#fff' }]}
                    >
                        {this.data.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.OrdersView_menu_content_typeView, styles.flex_row_columncenter, { backgroundColor: type == item.label ? '#ccc' : '#fff' }]}
                                    onPress={() => {
                                        this.hideView('typeHeight')
                                        this.setState({ type: item.label, showType: !this.state.showType })
                                    }}
                                >
                                    <View style={[styles.flex_center, { flex: 0.5, paddingRight: 15 }]}>
                                        <Text style={styles.fontsize12}>{item.label}</Text>
                                    </View>

                                    {type == item.label ?
                                        <View style={[styles.flex_row_end, { flex: 0.4 }]}>
                                            <Icon type={'\uE630'} color={'green'} size={15} />
                                        </View>
                                        : null}
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                    <Animated.View onLayout={({ nativeEvent: e }) => this.getHeight(e, 'searchHeight')}
                        style={[is_get_searchHeight ? searchViewStyles : { opacity: 0 }, { backgroundColor: '#fff' }]}
                    >
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
                        <View style={styles.flex_row_center}>
                            <Button type="primary" style={{ flex: 0.3 }} size={'small'} 
                            onClick={this.submitSearch}
                            >
                            搜索
                            </Button>
                        </View>
                        <WhiteSpace />
                    </Animated.View>
                    {showType == false || showSearch == false ?
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ height: ScreenHeight, width: ScreenWidth, backgroundColor: 'rgba(0,0,0,0.5)' }}
                            onPress={() => {
                                this.hideView('typeHeight');
                                this.hideView('searchHeight');
                                this.setState({ showType: true, showSearch: true })
                            }}
                        >
                        </TouchableOpacity> :
                        null}
                </View>
                <View style={styles.OrdersView_content_container}>
                    <WhiteSpace />
                    <FlatList
                        data={[1, 2, 3]}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <WhiteSpace size="lg" />}
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
                    <View style={[styles.flex_row_columncenter]}>
                        <Image source={require('../constants/images/单号.png')} style={styles.OrderListPage_item_header_img} />
                        <Text style={styles.fontsize12}>单号 : 1000201807070001</Text>
                    </View>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>放款时间 : 2017-12-25</Text>
                </View>
                <View style={[styles.OrderListPage_item_content]}>
                    <View style={styles.flex_row_columncenter}>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>客户姓名:冠希</Text>
                        </View>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>身份证号:320288196605054565</Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <View style={styles.flex_row_columncenter}>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>放款金额:￥10000</Text>
                        </View>
                        <View style={[styles.flex_row_columncenter, { flex: 1 }]}>
                            <Text style={[styles.fontsize10]} numberOfLines={1}>已还金额:￥2000</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.flex_row_between, styles.OrderListPage_item_footer]}>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>所属公司:新昌咨询(还是死数据 等后台传回)</Text>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>录入人:冰魂ex</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}

const FormOrdersView = createForm()(OrdersView)
export default connect(mapStateToProps)(FormOrdersView);