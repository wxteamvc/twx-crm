import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { styles } from '../constants/styles'
import { NavigationBar, Toast } from 'teaset';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Carousel, List, WhiteSpace, Icon, WingBlank, Popover } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import ActionButton from 'react-native-action-button';



export default class Test extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                        <Icon type={'right'} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
                        <Icon type={'right'} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
                        <Icon type={'right'} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}