import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { connect } from 'react-redux';


class Statistics extends Component {
    render() {
        let { initData } = this.props;
        return (
            <View style={{flex:1}}>
                <Text>我是统计</Text>
            </View>

        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}
export default connect(mapStateToProps)(Statistics);