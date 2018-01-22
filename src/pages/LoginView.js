import React, { Component } from 'react';
import { View, Text,Image,TouchableWithoutFeedback,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global'
import { Isao } from 'react-native-textinput-effects';
import { NavigationBar } from 'teaset';
import { Button } from 'antd-mobile';
import { login } from '../actions/personalAction';


class Login extends Component {
    constructor(props){
        super(props);
        state={
            uname:'',
            upassword:''
        }
    }

    submit = ()=>{
        //这边写简单的验证
        this.props.dispatch(login(this.state))
    }

    componentWillUpdate(nextProps,nextState) {
        const {userInfo,navigation } = this.props;
        if (userInfo.isLogin !== nextProps.userInfo.isLogin && nextProps.userInfo.isLogin == true){
            navigation.goBack()
        }
    }

    render() {
        const {initInfo,userInfo} = this.props;
        return (
            <View style={{flex:1,backgroundColor:'#fff', alignItems: 'center'}}>
            <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
            />
            <NavigationBar title='用户登陆' leftView={<NavigationBar.BackButton title='Back' />} />
            <View style={{width:ScreenWidth-40,marginTop:80}}>
                <Text style={[styles.fontsize22,{fontWeight: '500'}]}>登 录</Text>
                <Text style={[styles.fontsize12,{ color: '#ccc'}]}>使用此账号登录以使用更多服务</Text>
            </View>
            <View
                style={{width:ScreenWidth-40,marginTop:10}}
            >
                <Isao
                label={'账号'}
                // this is applied as active border and label color
                activeColor={'#40a9ff'}
                // this is applied as passive border and label color
                passiveColor={'#dadada'}
                onChangeText={(text) => {
                    this.setState({
                        uname:text
                    });
                }}
                />
                <Isao
                label={'密码'}
                // this is applied as active border and label color
                activeColor={'#40a9ff'}
                // this is applied as passive border and label color
                passiveColor={'#dadada'}
                secureTextEntry={true}
                onChangeText={(text) => {
                    this.setState({
                        upassword:text
                    });
                }}
                />
            </View>
            <View
                style={{width:ScreenWidth-40,marginTop:10}}
            >
                <Button type="primary"
                    onClick={this.submit}
                >登陆</Button>
            </View>
            
            <View 
            style={{width:ScreenWidth-40,marginTop:30,flexDirection: 'row',alignItems: 'flex-start'}}
            >
            <TouchableWithoutFeedback
                    onPress={()=>{
                        alert('验证码登陆')
                    }}
                >
                <View style={{flex:1,alignItems:'flex-start'}}>
                    <Text style={[styles.fontsize14]}>手机验证登陆</Text>
                </View>
            </TouchableWithoutFeedback>  
            <TouchableWithoutFeedback
                onPress={()=>{
                     alert('找回密码')
                }}
            >
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={[styles.fontsize14]}>忘记了?找回密码</Text>    
                </View>
                </TouchableWithoutFeedback>  
            </View>
            <View style={{alignItems: 'flex-start',justifyContent:'center',height:100}}>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        this.props.navigation.navigate('Agreement')
                    }}
                >
                <View>
                    <Text style={[styles.fontsize10,{color:'#ccc'}]}>登陆/注册即视为同意用户服务协议</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={[styles.flex_row_columncenter,{height:50}]}>
                <View style={{flex:1,backgroundColor:'gray',height:1,marginLeft:10 ,opacity:0.1}}></View>
                <View style={{flex:1,alignItems: 'center',opacity:0.5}}><Text>快捷登陆</Text></View>
                <View style={{flex:1,backgroundColor:'gray',height:1,marginRight:10,opacity:0.1}}></View>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <View style={{flex:0.25,alignItems:'center'}}>
                    <Image 
                        source={require('../constants/images/微信.png')}
                        style={{width:35,height:35}}
                    />
                </View>
                <View style={{flex:0.25,alignItems:'center'}}>
                    <Image 
                        source={require('../constants/images/qq.png')}
                        style={{width:35,height:35}}
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
    }
}

export default connect(mapStateToProps)(Login);

