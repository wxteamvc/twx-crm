/*
*查看大图页面
*/
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
    Dimensions,
    Modal
} from 'react-native';
import { styles } from '../constants/styles'
import { NavigationBar, Toast } from 'teaset';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Carousel, List, WhiteSpace, Icon, WingBlank, Popover } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import ActionButton from 'react-native-action-button';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageView extends Component {
    render() {
        const { data, foot, num } = this.props.navigation.state.params;
        return (
            <View style={{flex:1}}>
                <ImageViewer imageUrls={data}
                    onClick={() => {
                        this.props.navigation.goBack()
                    }}
                    menuContext = {{
                        saveToLocal:'保存到本地',
                        cancel:'关闭'
                    }}
                    enableImageZoom={true} // 是否开启手势缩放
                    index={num ? num : 0}
                    onSave={()=>alert('保存到本地')}
                    renderFooter={foot ? (currentIndex) => {
                        return (
                            <ScrollView style={{ height: 20, marginTop: -20 }}>
                                <Text style={{ color: '#fff', paddingLeft: 10, paddingRight: 10 ,textAlign:'center'}}>{foot[currentIndex]}</Text>
                            </ScrollView>
                        );
                    } : null}
                />
            </View>


        )
    }
}