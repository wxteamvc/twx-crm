/***
 * 
 * 客户联系人渲染页面
 * 
***/

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';

export default class ContactsPage extends Component{

    render(){
        const {data} = this.props
        return(
            <View>
                <Text>{data}</Text>
            </View>
        )

    }


}