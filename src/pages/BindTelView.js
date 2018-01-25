import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import { NavigationBar,Toast } from 'teaset';
import { List,Picker,InputItem,Button,WhiteSpace } from 'antd-mobile';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { connect } from 'react-redux';
import * as Types from "../actions/actionTypes";

class BindTel extends Component{
    constructor(props){
        super(props);
        this.state = {
            tel:'',
            code:''
        }
    }
    componentDidMount() {
        const {captchaTime,dispatch} = this.props;
        if(captchaTime !== null){
            this.timer = setInterval(
            ()=>{
                dispatch({
                    type:'declineCaptchaTime'
                })
            },1000);
        }
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    
    componentWillUpdate() {
        const {captchaTime,dispatch} = this.props;
        if (captchaTime == null){
            this.timer && clearTimeout(this.timer);
        }
    }
    getCaptcha = ()=>{
        const { dispatch } = this.props;
        if (this.state.tel == ''){
            Toast.fail('请填写电话号码');
            return false 
        }
        Util.post(Urls.Get_captcha,{tel:this.state.tel},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:'setCaptchaTime',
                        data:respJson.data
                    })
                    this.timer = setInterval(
                        ()=>{
                            dispatch({
                                type:'declineCaptchaTime'
                            })
                        },1000);
                    Toast.success(respJson.msg);
                }else{
                    Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                Toast.fail(error.msg);
            }
        )
    }
    sendCaptcha = ()=>{
        const { dispatch,navigation } = this.props;
        if (this.state.tel == ''){
            Toast.fail('请填写电话号码');
            return false 
        }
        if (this.state.code == ''){
            Toast.fail('请填写验证码');
            return false 
        }
        Util.post(Urls.Bind_tel,this.state,
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Change_User_Info,
                        data:respJson.data
                    })
                    Toast.success(respJson.msg);
                    navigation.goBack();
                }else{
                    Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                console.log(error);
                Toast.fail(error.msg);
            }
        )
    }
    render(){
        const {navigation,captchaTime,dispatch} = this.props;
        const seasons = [
            {
            label: '中华人民共和国  +86',
            value: '+86',
            },
          ];
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='绑定手机' leftView={<NavigationBar.BackButton  onPress={()=>{navigation.goBack()}}/>} />
                </View>
                <View style={{flex:1,marginTop:68}}>
                <List renderHeader={() =>'绑定手机享受快捷登录'}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:0.3}}>
                            <Picker data={seasons} cols={1} extra={'+86'}>
                                <List.Item  extra="">区号</List.Item>
                            </Picker>
                        </View>
                        <View style={{flex:0.7}}>
                            <InputItem type="number" placeholder="输入手机号码" 
                            onChange={value=>{this.setState({tel:value})}}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:0.7}}>
                            <InputItem type="number" placeholder="输入验证码"
                                onChange={value=>{this.setState({code:value})}}
                            />  
                        </View>
                        <View style={{flex:0.3,justifyContent:'center'}}>
                            <Button type="primary" style={{height:36,marginRight:5}}
                                disabled={captchaTime == null ? false:true}
                                onClick={this.getCaptcha}
                            ><Text style={{fontSize:14,color:captchaTime == null ? '#fff':'#000'}}>{captchaTime == null ? '获取验证码': `${captchaTime}s后重发`}</Text></Button>
                        </View>
                    </View>
                </List>
                <WhiteSpace size="xl"/>
                <Button style={{height:40,marginLeft:10,marginRight:10}} type="primary" 
                    onClick={this.sendCaptcha}
                >
                <Text style={{fontSize:16}}>提交</Text>
                </Button>
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        captchaTime: state.localConfigReducer.captchaTime
    }
}
export default connect(mapStateToProps)(BindTel);
