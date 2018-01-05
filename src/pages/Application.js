import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { connect } from 'react-redux';

class Application extends Component{
    render(){
        let {initData} = this.props;
        return (
            <View>
               <Text>我是申请</Text>   
            </View>

        )
    }
}


function mapStateToProps(state){
    return {
        initData:state.initReducer
    }
}
export default connect(mapStateToProps)(Application);