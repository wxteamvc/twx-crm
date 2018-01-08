import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';

class CustomerList extends Component {

    render() {
        return (
               <View>
                   <Text>
                       我是客户列表
                   </Text>
               </View>
        )
    }



}




function mapStateToProps(state) {
    return {
        modules: state.localConfigReducer.modules,
        home: state.homeReducer,
    }
}
export default connect(mapStateToProps)(CustomerList);