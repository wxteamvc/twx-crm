import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../constants/styles'
import { Icon, WhiteSpace } from 'antd-mobile';


export default class Notices extends Component {


    renderContent = () => {
        const { data } = this.props;
        let content = data.content.map((item, index) => {
            return (
                <View style={[styles.flex_row_columncenter,{flex:1}]} key={index}>
                    <Text numberOfLines={1} style={[styles.fontsize10,{flex:0.8}]} >{item.text}</Text>
                    <Text numberOfLines={1} style={[styles.fontsize8,{flex:0.2,textAlign:'center'}]}>{item.time}</Text>
                </View>
            )
        })
        return (
            <View style={{ marginLeft: 10 }}>
                {content}
            </View>
        )
    }



    render() {
        this.imageSize = this.props.imageSize ? this.props.imageSize : 40; //设置图片大小 默认为40
        this.callBack = this.props.callBack ? this.props.callBack : () => { };    //回调函数
        const { data } = this.props;
        return (
            <TouchableOpacity style={[styles.flex_row_columncenter, styles.notices_body]} onPress={() => { this.callBack(data) }} activeOpacity={1}>
                <View style={[styles.flex_center,{flex:0.1}]} >
                    <Image source={data.icon} style={{ height: this.imageSize, width: this.imageSize }} />
                </View>
                <View style={{flex:0.8}}>
                    {this.renderContent()}
                </View>
                <View style={[styles.flex_row_end,{flex:0.1}]}>
                    <Icon type={'right'} color={'#ccc'} size={10}/>
                </View>
            </TouchableOpacity>
        )
    }
}


