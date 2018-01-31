/*
 * 
 * 客户还款页面
 * 
 * 
 */


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
    ScrollView,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button, Tabs } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import { createForm } from 'rc-form';
import TabsScrollView from '../components/tabsScrollView';
import AllOrders from '../components/allOrders';
import Collapsible from '../components/Accordion/Collapsible';

class RepayView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideSearch: true,
        }
    }


    tabs = [
        { title: '本周待还' },
        { title: '全部订单' }
    ];

    data = [
        { key: '星期一', data: [1, 2, 3] },
        { key: '星期二', data: [1, 2, 3] },
        { key: '星期三', data: [1, 2, 3] },
        { key: '星期四', data: [1, 2, 3] },
        { key: '星期五', data: [1, 2, 3] },
        { key: '星期六', data: [1, 2, 3] },
        { key: '星期天', data: [1, 2, 3] },
    ]

    getText = (text) => {
        this.setState({
            searchText: text,
        })
    }

    jump = () => {
        if (this.state.searchText) {
            alert('我是搜索')
        } else {
            alert('请输入搜索条件')
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs
                    tabs={this.tabs}
                    initalPage={0}
                >
                    <TabsScrollView data={this.data} {...this.props} />
                    <AllOrders {...this.props} />
                </Tabs>
            </View>
        )
    }

}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}

const FormRepayView = createForm()(RepayView)
export default connect(mapStateToProps)(FormRepayView);