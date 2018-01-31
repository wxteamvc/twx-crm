/**
 * 
 * 按钮组件
 * 
 * 
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from '../constants/styles';
import { WhiteSpace } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';


export default class Mybutton extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[{ padding: 3, paddingLeft: 10, paddingRight: 10 ,backgroundColor:this.props.active?'#E94F4F':'rgba(0,0,0,0.2)',borderRadius:5},this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={[styles.fontsize12, this.props.active ? { color: '#fff' } : null]}>{this.props.lable}</Text>
            </TouchableOpacity>
        )
    }
}