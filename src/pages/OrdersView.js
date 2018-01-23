import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, } from 'antd-mobile';
import { styles } from '../constants/styles';



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
        }
    }

    data = [
        { value: 0, label: '被驳回的订单' },
        { value: 1, label: '待审核的订单' },
        { value: 2, label: '已通过的订单' },
        { value: 3, label: '还款中的订单' },
        { value: 4, label: '已完成的订单' },
        { value: 5, label: '已还账的订单' },
    ];


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
        Animated.timing(this.state[key], {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,// 线性的渐变函数
        }).start();
    }

    render() {
        const { is_get_typeHeight, is_get_searchHeight } = this.state;
        const typeViewStyles = {
            height: this.state.typeHeight
        };
        const searchViewStyles = {
            height: this.state.searchHeight
        };
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={[styles.flex_row_columncenter]}>
                        <TouchableOpacity
                            onPress={() =>{ 
                                this.state.searchHeight.setValue(0)
                                this.setState({showSearch:true})
                                this.menuButtonOnPress('showType', 'typeHeight')
                            }}
                            style={[styles.flex_center, { flex: 1 }]}
                        >
                            <Text>菜单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.state.typeHeight.setValue(0)
                                this.setState({showType:true})
                                this.menuButtonOnPress('showSearch', 'searchHeight')
                            }}
                            style={[styles.flex_center, { flex: 1 }]}
                        >
                            <Text>搜索</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View onLayout={({ nativeEvent: e }) => this.getHeight(e, 'typeHeight')}
                        style={is_get_typeHeight ? typeViewStyles : null}
                    >
                        {this.data.map((item, index) => {
                            return (
                                <Text key={index}>{item.label}</Text>
                            )
                        })}
                    </Animated.View>
                    <Animated.View onLayout={({ nativeEvent: e }) => this.getHeight(e, 'searchHeight')}
                        style={is_get_searchHeight ? searchViewStyles : null}
                    >
                        <Text>请输入要搜索的名字</Text>
                        <Text>请输入要搜索的身份证</Text>
                        <Text>请输入要搜索的订单号</Text>
                    </Animated.View>
                </View>

            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}
export default connect(mapStateToProps)(OrdersView);