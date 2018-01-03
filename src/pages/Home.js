import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

class Home extends Component{
    render(){
        let {initData} = this.props;
        return (
            <View>
               <Text>{initData.text}</Text>    
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        initData:state.initReducer
    }
}
export default connect(mapStateToProps)(Home);