/*
 * 订单搜索组件
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
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button, Tabs } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import Collapsible from './Accordion/Collapsible';



export default class SearchOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideSearch: true,
            searchType: 'none'
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ position: 'absolute', width: ScreenWidth }}>
                    <View style={[styles.flex_row_columncenter, { backgroundColor: 'rgba(98, 174, 228,0.5)' }]}>
                        <TouchableOpacity
                            style={[styles.flex_row_columncenter, { padding: 5 }]}
                            onPress={() => { this.setState({ hideSearch: !this.state.hideSearch }) }}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5 }]}>打开搜索栏</Text>
                            {this.state.hideSearch ? <Icon type={"\uE606"} size={10} color={'#ccc'} /> : <Icon type={"\uE607"} size={10} color={'#ccc'} />}
                        </TouchableOpacity>
                        <TextInput
                            style={{ flex: 1, padding: 0, marginLeft: 10 }}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Collapsible
                        collapsed={this.state.hideSearch}
                    >
                        <View style={{ width: ScreenWidth, height: 200, backgroundColor: '#000' }}></View>
                    </Collapsible>
                </View>
            </View>
        )
    }
}