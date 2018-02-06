import React, { Component } from 'react';
import { View, Text,Image,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles'
import { Button, Modal } from 'antd-mobile';
import { logout,uploadAvatar,bindWechat,unbindWeChat } from '../actions/personalAction';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { NavigationBar, ListRow,ActionSheet } from 'teaset';
import ImagePicker from 'react-native-image-crop-picker';
import * as WeChat from 'react-native-wechat';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
moment.updateLocale('zh-cn',momentLocale);
const antdAlert = Modal.alert;


class SetUserInfo extends Component {


    componentDidMount() {
        WeChat.registerApp('wxc32a13394d875338');
    }

    logout = ()=>{
        const { dispatch,navigation } = this.props;
        navigation.goBack();
        dispatch(logout());
        
    }
    _renderActionSheet = ()=>{
        let items = [
            {title: '从相册中选择', onPress: this.openImages},
            {title: '拍照', onPress: this.openCamera},
        ];
        let cancelItem = { title: '关闭' };
        ActionSheet.show(items, cancelItem);
    }
    openImages = ()=>{
        ImagePicker.openPicker({  
            width: 300,  
            height: 400,  
            cropping: true,
            cropperCircleOverlay:true,
            showCropGuidelines:false
          }).then(image => {  
            let file = {uri: image.path, type: image.mime, name: 'avatar.jpg'};
            this.props.dispatch(uploadAvatar({'avatar':file}));
          }); 
     }
     openCamera = ()=>{
        ImagePicker.openCamera({  
         width: 300,  
         height: 300,  
         cropping: true,
         cropperCircleOverlay:true,
         showCropGuidelines:false
       }).then(image => {  
        let file = {uri: image.path, type: image.mime, name: 'avatar.jpg'};
        this.props.dispatch(uploadAvatar({'avatar':file}));
       });
     }

     openConfirm = ({title,msg,callBack})=>{
        antdAlert(title, msg , [
            { text: '取消'},
            { text: '解除', onPress: callBack },
          ])
     }
     unbindWechat = ()=>{
         this.props.dispatch(unbindWeChat());
     }
     bindWechat = ()=>{
        if (this.props.userInfo.info.user_wechat_id !== null){
           this.openConfirm({title:'解除微信绑定',msg:'解除绑定后将无法使用微信登陆，确认要这么做吗？',callBack:this.unbindWechat});
        }else{
            WeChat.isWXAppInstalled()
            .then(( isInstalled ) => {
                if (isInstalled){
                    let scope = 'snsapi_userinfo';
                    let state = 'wechat_sdk_demo';
                    WeChat.sendAuthRequest(scope,state)
                    .then(responseCode =>{
                        if (responseCode.code){
                            this.props.dispatch(bindWechat(responseCode.code));
                        }else{
                            Toast.fail('登录授权发生错误')
                        }
                    })
                    .catch(err=>{
                        Toast.fail('登录授权发生错误:'+ err.message)
                    })
                }else{
                    Toast.fail('没有安装微信软件，请您安装微信之后再试')
                }
            });
        }
     }
    render() {
        const {userInfo,navigation} = this.props;
        if (!userInfo.isLogin) return <View></View>
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='个人信息' leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} />
                </View>
                <View style={{flex:1,marginTop:68}}>
                <GiftedForm
                    formName='userInfo'
                    openModal={(router) => {
                       this.props.navigation.navigate('Modal',
                       { renderContent: router.renderScene,
                         onClose: router.onClose,
                         getTitle: router.getTitle
                       });
                    }}
                    defaults={{
                        nickname:userInfo.info.nickname,
                        tel:userInfo.info.tel,
                        sex:'男',
                        province_city:'江苏-无锡'
                    }}
                    clearOnClose={false}
                >
                <ListRow title='头像' 
                detail={<Image
                            source={{ uri: userInfo.info.avatar_path }}
                            style={{ height: 60, width: 60,borderRadius:30 }}
                        />} 
                onPress={this._renderActionSheet}
                />
                <GiftedForm.SeparatorWidget />
                <GiftedForm.ModalWidget
                    title='昵称'
                    displayValue='nickname'
                >
                <GiftedForm.SeparatorWidget />
                <GiftedForm.TextInputWidget
                    name='nickname' // mandatory
                    clearButtonMode='while-editing'
                />
                </GiftedForm.ModalWidget>
                <GiftedForm.RowValueWidget  
                    title='手机'
                    value={userInfo.info.tel}
                    onPress={()=>{
                        navigation.navigate('BindTel');
                    }}
                />
                <GiftedForm.ModalWidget
                    title='性别'
                    displayValue='sex'
                >
                <GiftedForm.SeparatorWidget />
                <GiftedForm.SelectWidget name='sex' multiple={false}>
                    <GiftedForm.OptionWidget image={require('../constants/images/性别男.png')} title='男' value='男'/>
                    <GiftedForm.OptionWidget image={require('../constants/images/性别女.png')} title='女' value='女'/>
                </GiftedForm.SelectWidget>
                </GiftedForm.ModalWidget>

                <GiftedForm.ModalWidget
                    title='来自'
                    displayValue='province_city'
                >
                <GiftedForm.SeparatorWidget />
                <GiftedForm.SelectWidget name='province_city' multiple={false}>
                    <GiftedForm.ModalWidget
                        title='江苏'
                        displayValue='city'
                    >
                    <GiftedForm.SelectWidget name='city' multiple={false}>
                        <GiftedForm.OptionWidget title='无锡' value='无锡'/>
                        <GiftedForm.OptionWidget title='南京' value='南京'/>
                        <GiftedForm.OptionWidget title='苏州' value='苏州'/>
                    </GiftedForm.SelectWidget>
                    </GiftedForm.ModalWidget>
                </GiftedForm.SelectWidget>
                </GiftedForm.ModalWidget>
                <GiftedForm.SeparatorWidget />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/创建时间.png')}
                    title='注册时间'
                    value={moment(parseInt(userInfo.info.create_time)*1000).format('LL')}
                />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/更新时间.png')}
                    title='上次登录'
                    value={moment(parseInt(userInfo.info.update_time)*1000).format('LL')}
                />
                <GiftedForm.SeparatorWidget />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/微信.png')}
                    title='绑定微信'
                    value={userInfo.info.user_wechat_id == null ? "未绑定" : "已绑定"}
                    onPress={this.bindWechat}
                />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/qq.png')}
                    title='绑定QQ'
                    value="绑定"
                />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/微博.png')}
                    title='绑定微博'
                    value="未绑定"
                />
                <GiftedForm.SeparatorWidget />
                <GiftedForm.RowWidget  
                    image={require('../constants/images/密码.png')}
                    title='重置密码'
                    onPress={()=>{
                        navigation.navigate('ChangePassword');
                    }}
                />
                <GiftedForm.SeparatorWidget />
                <Button 
                    onClick={this.logout}
                >安全退出</Button>
                <GiftedForm.SeparatorWidget />
                </GiftedForm>
                
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

export default connect(mapStateToProps)(SetUserInfo);

