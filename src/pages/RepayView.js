/*
 * 
 * 客户汇款页面
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
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button, Tabs } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import { createForm } from 'rc-form';
import TabsScrollView from '../components/tabsScrollView'

class RepayView extends Component {
    constructor(props) {
        super(props)

    }
    tabs = [
        { title: '本周待还' },
        { title: '搜索还款' },
        { title: '全部订单' }
    ];

    data ={
        Monday:[1,2,3],
        Tuesday:[1,2,3],
        Wednesday:[1,2,3],
        Thursday:[1,2,3],
        Friday:[1,2,3],
        Saturday:[1,2,3],
        Sunday:[1,2,3],
    }
        
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs tabs={this.tabs}
                    initalPage={0}
                >
                    <TabsScrollView data={this.data} {...this.props}/>
                    <View>
                        <Text>我是第二页</Text>
                    </View>
                    <View>
                        <Text>我是第三页</Text>
                    </View>
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