import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleSheet } from 'react-native';
import { getHomeInfo } from '../actions/homeAction';



const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});
class Lead extends Component {
  
    componentDidMount() {
        this.props.dispatch(getHomeInfo())
    } 

    // state = {
    //     seconds: 1
    // }
    // leadTime = () => {
    //     this.setState({
    //         seconds: --this.state.seconds,
    //     })
    //     if (this.state.seconds <= 0) {
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //                 NavigationActions.navigate({ routeName: 'HomeTab' })
    //             ]
    //         })
    //         this.timer && clearTimeout(this.timer)
    //         this.props.navigation.dispatch(resetAction);
    //     }
    // }

    // componentDidMount(){
    //     this.timer = setInterval(this.leadTime,1000);
    // }
    // componentWillUnmount() {
    //     this.timer && clearTimeout(this.timer)
    // }
    _onDone = ()=>{
         const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeTab' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }
    render(){
        const slides = [
        {
            key: 'somethun1',
            title: '第一页介绍',
            text: 'Description.\nSay something cool',
            image: require('../constants/images/intro/1.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#59b2ab',
        },
        {
            key: 'somethun2',
            title: '第二页介绍',
            text: 'Other cool stuff',
            image: require('../constants/images/intro/2.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#febe29',
        },
        {
            key: 'somethun3',
            title: '第三页介绍',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            image: require('../constants/images/intro/3.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#22bcb5',
        }
        ];
        return (
            <AppIntroSlider
                slides={slides}
                onDone={this._onDone}
                nextLabel={'下一页'}
                doneLabel={'开启'}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        localConfigReducer: state.localConfigReducer,
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(Lead);