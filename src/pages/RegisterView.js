import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global'
import { TextField } from 'react-native-material-textfield';
import { NavigationBar, Toast } from 'teaset';
import { Button } from 'antd-mobile';
import { register, loginWithWechat } from '../actions/personalAction';
import { NavigationActions } from 'react-navigation';
import * as WeChat from 'react-native-wechat';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            upassword: ''
        }
    }

    submit = () => {
        //这边写简单的验证
        this.props.dispatch(register(this.state))
    }

    // loginWithWechat = () => {
    //     WeChat.isWXAppInstalled()
    //         .then((isInstalled) => {
    //             if (isInstalled) {
    //                 let scope = 'snsapi_userinfo';
    //                 let state = 'wechat_sdk_demo';
    //                 WeChat.sendAuthRequest(scope, state)
    //                     .then(responseCode => {
    //                         if (responseCode.code) {
    //                             this.props.dispatch(loginWithWechat(responseCode.code));
    //                         } else {
    //                             Toast.fail('登录授权发生错误')
    //                         }
    //                     })
    //                     .catch(err => {
    //                         Toast.fail('登录授权发生错误:' + err.message)
    //                     })
    //             } else {
    //                 Toast.fail('没有安装微信软件，请您安装微信之后再试')
    //             }
    //         });
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     const { userInfo, navigation } = this.props;
    //     const { localConfigReducer } = nextProps;
    //     if (nextProps.userInfo.isLogin == true && localConfigReducer.token != '') {
    //         if (navigation.state.params) {
    //             if (navigation.state.params.jumpwhere) {
    //                 const resetAction = NavigationActions.reset({
    //                     index: 1,
    //                     actions: [
    //                         NavigationActions.navigate({ routeName: 'HomeTab' }),
    //                         NavigationActions.navigate({ routeName: navigation.state.params.jumpwhere }),
    //                     ]
    //                 })
    //                 this.props.navigation.dispatch(resetAction);
    //             } else {
    //                 navigation.goBack()
    //             }
    //         } else {
    //             navigation.goBack()
    //         }

    //     }
    // }

    render() {
        const { initInfo, userInfo, navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                <StatusBar
                    translucent={false}
                    backgroundColor='#40a9ff'
                />
                <NavigationBar title='用户注册'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                />
                <View style={{ width: ScreenWidth - 40, marginTop: 80 }}>
                    <Text style={[styles.fontsize22, { fontWeight: '500' }]}>注册</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>注册账号以使用更多服务</Text>
                </View>
                <View
                    style={{ width: ScreenWidth - 40, marginTop: 10 }}
                >
                    <TextField
                        label='账号'
                        value={this.state.uname}
                        onChangeText={(value) => this.setState({ uname: value })}
                    />
                    <TextField
                        secureTextEntry={true}
                        label='密码'
                        value={this.state.upassword}
                        onChangeText={(value) => this.setState({ upassword: value })}
                    />
                    <View
                        style={{ width: ScreenWidth - 40, marginTop: 10 }}
                    >
                        <Button type="primary"
                            onClick={this.submit}
                        >注册</Button>
                    </View>

                    <View
                        style={{ width: ScreenWidth - 40, marginTop: 30, flexDirection: 'row', alignItems: 'flex-start' }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                alert('验证码登陆')
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[styles.fontsize14]}>手机号注册</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', height: 100 }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.navigate('Agreement')
                            }}
                        >
                            <View>
                                <Text style={[styles.fontsize10, { color: '#ccc' }]}>登陆/注册即视为同意用户服务协议</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={[styles.flex_row_columncenter, { height: 50 }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginLeft: 10, opacity: 0.1 }}></View>
                        <View style={{ flex: 1, alignItems: 'center', opacity: 0.5 }}><Text>快捷注册</Text></View>
                        <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginRight: 10, opacity: 0.1 }}></View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.25, alignItems: 'center' }}>
                        <TouchableWithoutFeedback
                            onPress={this.loginWithWechat}
                        >
                            <Image
                                source={require('../constants/images/微信.png')}
                                style={{ width: 35, height: 35 }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 0.25, alignItems: 'center' }}>
                        <Image
                            source={require('../constants/images/qq.png')}
                            style={{ width: 35, height: 35 }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        initInfo: state.initReducer,
        userInfo: state.personalReducer,
        localConfigReducer: state.localConfigReducer,
    }
}

export default connect(mapStateToProps)(Register);

