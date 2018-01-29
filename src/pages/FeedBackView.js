import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView
} from 'react-native';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { NavigationBar,Toast } from 'teaset';
import { List, TextareaItem,InputItem,Radio,Button,WhiteSpace } from 'antd-mobile';
const RadioItem = Radio.RadioItem;

class FeedBack extends Component{
    constructor(props){
        super(props);
        this.state={
            type:1,
            mark:'',
            contact:'',
        }
    }
    onChange = (value) => {
        this.setState({
          type:value,
        });
      };
      submitFeedBack = ()=>{
          if (global.token == ''){
            Toast.fail('请登陆后提交反馈意见')
            return false;
          }
          Util.post(Urls.Submit_feed_back,this.state,
            (respJson) =>{
                if (respJson.code == 1){
                    Toast.success(respJson.msg);
                    this.props.navigation.goBack();
                }else{
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                Toast.fail(respJson.msg);
            }
        )
      }
    render(){
        const {navigation} = this.props;
        const { type } = this.state;
        let data = [
            {value:1,label:'UI界面'},
            {value:2,label:'功能完善'},
            {value:3,label:'BUG提交'},
            {value:4,label:'其他问题'}
        ];
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='意见反馈' leftView={<NavigationBar.BackButton  onPress={()=>{navigation.goBack()}}/>} rightView={<Text style={{color:'#fff',fontSize:14,marginRight:10}}>常见问题</Text>}/>
                </View>
                <ScrollView style={{flex:1,marginTop:68}}>
                    <List renderHeader={() => '反馈类型'}>
                        {data.map(i => (
                            <RadioItem key={i.value} checked={type === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                            </RadioItem>
                        ))}
                    </List>
                    <List renderHeader={() => '问题和意见'}>
                        <TextareaItem
                            rows={5}
                            count={200}
                            onChange={value=>{
                                this.setState({
                                    mark:value
                                })
                            }}
                        />
                    </List>
                    <List renderHeader={() => '联系方式（选填）'}>
                    <InputItem
                        placeholder={"电话/微信/邮箱"}
                        onChange={value=>{
                                this.setState({
                                    contact:value
                                })
                            }}
                    />
                    </List>
                    <WhiteSpace size="lg"/>
                    <Button style={{height:40,marginLeft:10,marginRight:10}} type="primary" 
                        onClick={this.submitFeedBack}
                    >
                    <Text style={{fontSize:14}}>提交反馈</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}

export default FeedBack;