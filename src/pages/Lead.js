import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class Lead extends Component{
    state = {
        seconds:3
    }
    leadTime = ()=>{
        this.setState({
            seconds:--this.state.seconds,
        })
        if (this.state.seconds <= 0){
            const resetAction = NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})
                ]
            })
            this.timer && clearTimeout(this.timer)
            this.props.navigation.dispatch(resetAction);
        }
    }
    componentDidMount(){
        this.timer = setInterval(this.leadTime,1000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render(){
        let {initData} = this.props;
        return (
            <View>
               <Text>引导页</Text>
               <Text>{this.state.seconds}秒后跳转</Text>
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        initData:state.initReducer
    }
}
export default connect(mapStateToProps)(Lead);