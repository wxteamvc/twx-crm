import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { styles } from '../constants/styles'
import { NavigationBar,Toast } from 'teaset';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Carousel,List,WhiteSpace} from 'antd-mobile';
const window = Dimensions.get('window');

class CompanyHome extends Component{
    renderBackground = ()=>{
        return (
            <ImageBackground source={{ uri: `https://placekitten.com/414/350`}}
            style={{width: window.width, height: 150}}
            >
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:0.3,alignItems:'center'}}>
                            <Image
                                source={{uri:'https://placekitten.com/414/350'}}
                                style={{width:80,height:80}}
                            />
                        </View>
                        <View style={{flex:0.5}}>
                            <Text>123</Text>
                        </View>
                         <View style={{flex:0.2,justifyContent:'flex-end'}}>
                            <Text>已关注</Text>
                            <Text>2万人</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    renderFixedHeader = ()=>{
        return (
            <Text style={{ textAlign: 'center', color: 'white', padding: 15, fontSize: 20 }}>Hello</Text>
        )
    }
    renderCarouselItem = ()=>{
        const banner = [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153670945&di=c738cb8388b3a3a67831b0969534e88d&imgtype=0&src=http%3A%2F%2Fwww.bjzfyr.com%2Fuploads%2Fallimg%2F160303%2F1-160303150U6361.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153700130&di=0b346abd8593cdfbd0954124e18c0a65&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F71%2F16%2F00m58PICphT_1024.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515153732575&di=8b43e1bd98ac25b4ec10a6f48a5b0513&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcc11728b4710b912159922dbc9fdfc03924522bf.jpg'
        ]
        const items = banner.map((item, index) => {
            return (
                <Image resizeMode={'cover'} source={{ uri: item }} style={{ width: window.width, height: 150 }} key={index} />
            )
        })
        return items
    }
    render(){
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <ParallaxScrollView
                    style={{ flex: 1, backgroundColor: 'hotpink', overflow: 'hidden' }}
                    renderBackground={this.renderBackground}
                    renderFixedHeader={this.renderFixedHeader}
                    parallaxHeaderHeight={ 150 }
                >
                    <View>
                    <Carousel
                        dots={false}
                        autoplay={true}
                        infinite={true}
                        autoplayInterval={5000}
                    >
                        {this.renderCarouselItem()}
                    </Carousel>
                    <List renderHeader={
                        <View style={styles.home_activity_title_View}>
                        <Text style={{fontSize:16,fontWeight:'500'}}>产品介绍</Text>
                        </View>}
                    >


                    </List>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

export default CompanyHome;