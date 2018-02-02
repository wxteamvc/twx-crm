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
import { List, InputItem, Toast, WhiteSpace, Button, Picker, Icon, Tabs } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import OrderInfo from '../components/orderInfo';
import OrderCycle from '../components/orderCycle';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import { getOrderInfo } from '../actions/ordersAction';

class OrderInfoView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'info',
            // opacity: new Animated.Value(1),
        }
    }

    componentWillMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(getOrderInfo(id))
    }

    startAnimation = (type) => {
        this.setState({ type: type });
        // if (type != this.state.type) {
        //     const speed = 300;
        //     this.state.opacity.setValue(1);
        //     Animated.timing(
        //         this.state.opacity,
        //         {
        //             toValue: 0,
        //             duration: speed,
        //             easing: Easing.out(Easing.quad),
        //         }
        //     ).start(() => {
        //         this.setState({ type: type });
        //         this.state.opacity.setValue(0);
        //         Animated.timing(
        //             this.state.opacity,
        //             {
        //                 toValue:1,
        //                 duration: speed,
        //                 easing: Easing.out(Easing.quad),
        //             }
        //         ).start()
        //     })
        // }
    }


    renderContent = (data) => {
        if (this.state.type == 'info') {
            return <OrderInfo {...this.props} data={data}/>
        } else {
            return <OrderCycle {...this.props} data={data}/>
        }
    }

    render() {
        const { type } = this.state;
        const { data ,isReady} = this.props.ordersInfo;
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
                    backgroundColor={'#000'}
                    contentBackgroundColor={'#E9E9EF'}
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

                                        <Text style={[styles.fontsize16, { color: '#fff', marginLeft: 10 }]}>单号:{data.order_id}</Text>
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
                                <Text style={[styles.fontsize16, { color: '#fff' }]}>单号:{data.order_id}</Text>
                            </View>
                        </View>
                    )}
                >
                    <View style={[styles.flex_row_center, { backgroundColor: '#fff' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.startAnimation('info')
                            }}
                            activeOpacity={1}
                            style={[styles.OrderInfo_tab_btn, styles.OrderInfo_tab_Lbtn, styles.flex_center, { borderBottomWidth: 2, borderColor: this.state.type == 'info' ? '#40A9FF' : 'transparent' }]}>
                            <Text style={[styles.fontsize12, this.state.type == 'info' ? { color: '#40A9FF' } : null]}>订单详情</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.startAnimation('repay')
                            }}
                            activeOpacity={1}
                            style={[styles.OrderInfo_tab_btn, styles.flex_center, { borderBottomWidth: 2, borderColor: this.state.type == 'repay' ? '#40A9FF' : 'transparent' }]}>
                            <Text style={[styles.fontsize12, this.state.type == 'repay' ? { color: '#40A9FF' } : null]}>还款详情</Text>
                        </TouchableOpacity>
                    </View>
                    {isReady?this.renderContent(data):null}
                </ParallaxScrollView>
            </View>
        )
    }


}


function mapStateToProps(state) {
    return {
        ordersInfo: state.ordersReducer.info,
    }
}

export default connect(mapStateToProps)(OrderInfoView);