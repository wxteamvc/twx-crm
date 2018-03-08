/**
 * 认证服务页面
 * 
 */

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
import { List, InputItem, Toast, WhiteSpace, Button, Picker, Icon, Tabs, WingBlank } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import OrderInfo from '../components/orderInfo';
import OrderCycle from '../components/orderCycle';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import { getOrderInfo } from '../actions/ordersAction';
import { NavigationBar } from 'teaset';

class Authentication extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }


    render() {
        const { navigation, userInfo } = this.props;
        const { info } = userInfo;
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar title='认证服务'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                />
                <View style={[{ flexDirection: 'row', backgroundColor: '#FD7D7C', height: 100, marginTop: 68 }]}>
                    <View style={[styles.flex_center, { flex: 0.3 }]}>
                        <Image source={require('../constants/images/认证.png')} style={{ width: 50, height: 50 }} />
                    </View>
                    <View style={[styles.flex_column_columncenter, { flex: 0.6 }]}>
                        <Text style={[styles.fontsize14, { color: '#fff' }]}>
                            证件仅用于身份认证,保障安全,不对外公开。资料清晰齐全,24小时内完成审核。
                        </Text>
                    </View>
                </View>
                <WhiteSpace size={'md'} />
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ borderColor: '#ccc', borderBottomWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15 }}>
                        <Text style={styles.fontsize12}>企业机构认证</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (info.rid >= 100) {
                                this.props.navigation.navigate('CompanyAuthentication')
                            }
                        }}
                        style={[styles.flex_row_columncenter, { paddingTop: 20, paddingBottom: 20 }]}
                        activeOpacity={1}
                    >
                        <View style={[styles.flex_center, { flex: 0.2, }]}>
                            <Image source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517890912775&di=f17a6e3f55b5162f9c98f31228f64f74&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D33144356%2C2570624297%26fm%3D214%26gp%3D0.jpg' }} style={{ width: 40, height: 40 }} />
                        </View>
                        <View style={{ flex: 0.6, paddingRight: 20 }}>
                            <Text style={styles.fontsize14}>企业机构认证</Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={[styles.fontsize10, { color: '#ccc' }]}>工商营业执照或者组织机构代码证,法人身份证正反面</Text>
                        </View>
                        <View style={[styles.flex_row_end, { flex: 0.2 }]}>
                            <Text style={styles.fontsize12}>{info.rid < 100 ? '已认证' : '未认证'}</Text>
                            <WingBlank size={'sm'}>
                                <Icon type={'right'} size={12} color={'#ccc'} />
                            </WingBlank>

                        </View>
                    </TouchableOpacity>
                </View>
                <WhiteSpace size={'md'} />
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ borderColor: '#ccc', borderBottomWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 15 }}>
                        <Text style={styles.fontsize12}>个人实名认证</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (info.is_auth == 0) {
                                this.props.navigation.navigate('PersonalAuthentication')
                            }
                        }}
                        style={[styles.flex_row_columncenter, { paddingTop: 20, paddingBottom: 20 }]}
                        activeOpacity={1}
                    >
                        <View style={[styles.flex_center, { flex: 0.2, }]}>
                            <Image source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517890912775&di=f17a6e3f55b5162f9c98f31228f64f74&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D33144356%2C2570624297%26fm%3D214%26gp%3D0.jpg' }} style={{ width: 40, height: 40 }} />
                        </View>
                        <View style={{ flex: 0.6, paddingRight: 20 }}>
                            <Text style={styles.fontsize14}>个人认证</Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={[styles.fontsize10, { color: '#ccc' }]}>个人身份证正反面</Text>
                        </View>
                        <View style={[styles.flex_row_end, { flex: 0.2 }]}>
                            <Text style={styles.fontsize12}>{info.is_auth == 1 ? '已认证' : '未认证'}</Text>
                            <WingBlank size={'sm'}>
                                <Icon type={'right'} size={12} color={'#ccc'} />
                            </WingBlank>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


}


function mapStateToProps(state) {
    return {
        userInfo: state.personalReducer,
    }
}

export default connect(mapStateToProps)(Authentication);