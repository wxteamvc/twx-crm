import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { NavigationBar,Toast } from 'teaset';
import { List,InputItem,Button,WhiteSpace } from 'antd-mobile';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { connect } from 'react-redux';

class changePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            newPassword:'',
            confirmation:'',
            newPasswordIsPassword:true,
            confirmationIsPassword:true
        }
    }
    sendPassword = ()=>{
        const { newPassword, confirmation } = this.state;
        if (newPassword == ''){
            Toast.fail('请输入新密码')
            return false;
        }
        if (confirmation == ''){
            Toast.fail('请输入确认密码')
            return false;
        }
        if (confirmation === newPassword){

        }else{
            Toast.fail('密码不一致')
        }
        
    }
    render(){
        const { navigation } = this.props;
        const { newPasswordIsPassword , confirmationIsPassword} = this.state;
        let newPasswordImage = newPasswordIsPassword ? require('../constants/images/闭眼.png'):require('../constants/images/眼睛.png');
        let confirmationImage = confirmationIsPassword ? require('../constants/images/闭眼.png'):require('../constants/images/眼睛.png');
        return (
        <View style={{flex:1}}>
            <StatusBar
            translucent={false}
            backgroundColor='#40a9ff'
            />
            <View>
                <NavigationBar title='重置密码' leftView={<NavigationBar.BackButton  onPress={()=>{navigation.goBack()}}/>} />
            </View>
            <View style={{flex:1,marginTop:68}}>
                <List renderHeader={() =>'重置密码后下一次登陆生效'}>
                <InputItem type={newPasswordIsPassword ? 'password': null}
                    extra={
                    <TouchableWithoutFeedback
                        onPress={()=>this.setState({
                            newPasswordIsPassword:!this.state.newPasswordIsPassword
                        })}
                    >
                        <Image 
                            source={newPasswordImage}
                            style={{height:25,width:25}}
                        />
                    </TouchableWithoutFeedback>
                    }
                    placeholder="密码不能是纯数字"
                    onChange={(value)=>{
                        this.setState({
                            newPassword:value
                        })
                    }}
                >新的密码</InputItem>
                <InputItem type={confirmationIsPassword ? 'password':null}
                    extra={
                    <TouchableWithoutFeedback 
                        onPress={()=>this.setState({
                            confirmationIsPassword:!this.state.confirmationIsPassword
                        })}
                    >
                        <Image 
                            source={confirmationImage}
                            style={{height:25,width:25}}
                        />
                    </TouchableWithoutFeedback>
                    }
                    placeholder="重复输入新的密码"
                    onChange={(value)=>{
                        this.setState({
                            confirmation:value
                        })
                    }}
                >确认密码</InputItem>
                </List>
                <WhiteSpace size="xl"/>
                <Button style={{height:40,marginLeft:10,marginRight:10}} type="primary" 
                    onClick={this.sendPassword}
                >
                <Text style={{fontSize:16}}>提交</Text>
                </Button>
            </View>
        </View>
       )
    }
}

export default changePassword;
