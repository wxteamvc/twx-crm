import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, Toast, WhiteSpace, Button, Picker, Icon } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import OrderInfo from '../components/orderInfo';
import OrderCycle from '../components/orderCycle';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';

class OrderInfoView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'info',
            x1: new Animated.Value(1),
            x2: new Animated.Value(1),
            opacity1: new Animated.Value(1),
            opacity2: new Animated.Value(1),
        }
    }

    startAnimation = (type) => {
        if (type != this.state.type) {
            const speed = 300;
            this.state.x1.setValue(1);
            this.state.x2.setValue(1);
            this.state.opacity1.setValue(1);
            this.state.opacity2.setValue(1);
            // Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.x1,
                    {
                        toValue: 2,
                        duration: speed,
                        easing: Easing.out(Easing.quad),
                    }
                ),
                Animated.timing(
                    this.state.x2,
                    {
                        toValue: 0,
                        duration: speed,
                        easing: Easing.out(Easing.quad),
                    }
                ),
                Animated.timing(
                    this.state.opacity1,
                    {
                        toValue: 0,
                        duration: speed,
                        easing: Easing.out(Easing.quad),
                    }
                ),
                Animated.timing(
                    this.state.opacity2,
                    {
                        toValue: 0,
                        duration: speed,
                        easing: Easing.out(Easing.quad),
                    }
                ),
            ]).start(() => {
                this.setState({ type: type })
                this.state.x1.setValue(0);
                this.state.x2.setValue(2);
                this.state.opacity2.setValue(0.3);
                Animated.parallel([
                    Animated.timing(
                        this.state.x1,
                        {
                            toValue: 1,
                            duration: speed,
                            easing: Easing.out(Easing.quad),
                        }
                    ),
                    Animated.spring(
                        this.state.x2,
                        {
                            toValue: 1,
                            friction: 5,// 摩擦力，默认为7.
                            tension: 40,// 张力，默认40。
                        }
                    ),
                    Animated.timing(
                        this.state.opacity1,
                        {
                            toValue: 1,
                            duration: speed,
                            easing: Easing.out(Easing.quad),
                        }
                    ),
                    Animated.timing(
                        this.state.opacity2,
                        {
                            toValue: 1,
                            duration: speed,
                            easing: Easing.out(Easing.quad),
                        }
                    )
                ]).start()
            })
            // ]).start();
        }
    }


    renderContent = () => {
        if (this.state.type == 'info') {
            return <OrderInfo />
        } else {
            return <OrderCycle />
        }
    }

    render() {
        const { type } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <ParallaxScrollView
                    headerBackgroundColor="rbga(255,255,255,0.3)"
                    stickyHeaderHeight={50}
                    parallaxHeaderHeight={120}
                    backgroundSpeed={10}
                    backgroundColor={'#4B5DA2'}
                    contentBackgroundColor={'#F6F8FA'}
                    showsVerticalScrollIndicator={false}
                    renderForeground={
                        () =>
                            <View style={{ backgroundColor: '#000' }}>
                                <View style={[styles.OrderInfo_top]}>
                                    <TouchableOpacity
                                        style={[{ marginTop: StatusBarHeight + 20, marginLeft: 15 }]}
                                        activeOpacity={1}
                                        onPress={() => this.props.navigation.goBack()}
                                    >
                                        <Icon type={'left'} color={'#fff'} />
                                    </TouchableOpacity>
                                    <View style={[styles.flex_row_center]}>
                                        <Animatable.View animation="tada" iterationCount="infinite" duration={5000}>
                                            <Image
                                                source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516269211247&di=31c58fe59ef999bfd046b9ac948776b2&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F05%2F22%2FFhBrGtEEeTxximnAZTCud11rk6zU.jpg' }}
                                                style={styles.OrderInfo_top_img}
                                            />
                                        </Animatable.View>

                                        <Text style={[styles.fontsize16, { color: '#fff', marginLeft: 10 }]}>单号:100002018008160002</Text>
                                    </View>
                                </View>
                            </View>
                    }
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={[{ marginTop: StatusBarHeight }, styles.flex_row_columncenter]}>
                            <TouchableOpacity
                                style={[styles.flex_center, { flex: 0.1 }]}
                                activeOpacity={1}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon type={'left'} color={'#fff'} />
                            </TouchableOpacity>
                            <View style={[styles.flex_center, { flex: 0.8 }]}>
                                <Text style={[styles.fontsize16, { color: '#fff' }]}>单号:100002018008160002</Text>
                            </View>
                        </View>
                    )}
                >
                    <View style={[styles.flex_row_center, { marginTop: 10 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.setState({ type: 'info' });
                                this.startAnimation('info')
                            }}
                            activeOpacity={1}
                            style={[styles.OrderInfo_tab_btn, styles.OrderInfo_tab_Lbtn, { backgroundColor: type == 'info' ? '#2A3B61' : '#4B5DA2' }]} >
                            <Text style={[styles.fontsize12, { color: '#fff' }]}>订单详情</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // this.setState({ type: 'repay' });
                                this.startAnimation('repay')
                            }}
                            activeOpacity={1}
                            style={[styles.OrderInfo_tab_btn, styles.OrderInfo_tab_Rbtn, { backgroundColor: type == 'repay' ? '#2A3B61' : '#4B5DA2' }]}>
                            <Text style={[styles.fontsize12, { color: '#fff' }]}>还款详情</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={[styles.OrderInfo_content_header,
                        {
                            transform: [
                                {
                                    translateX: this.state.x1.interpolate({
                                        inputRange: [0, 2],
                                        outputRange: [-200, 200]
                                    })
                                }, // x轴移动
                            ],
                            opacity: this.state.opacity1
                        }]}>
                    </Animated.View>
                    <Animated.View style={[styles.OrderInfo_content_container,
                    {
                        transform: [
                            {
                                translateX: this.state.x2.interpolate({
                                    inputRange: [0, 2],
                                    outputRange: [-200, 200]
                                })
                            }, // x轴移动
                        ],
                        opacity: this.state.opacity2
                    }

                    ]}>
                        {this.renderContent()}
                    </Animated.View>
                </ParallaxScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}

export default connect(mapStateToProps)(OrderInfoView);