import React, { Component } from 'react';
import { View, Text,Image,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles'
import { Button } from 'antd-mobile';
import { logout } from '../actions/personalAction';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { NavigationBar, ListRow,ActionSheet } from 'teaset';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
moment.updateLocale('zh-cn',momentLocale);

class Setting extends Component {
    constructor(props){
        super(props);

    }
    state = {
        changeAvatar:false,
        avatarSource:null,
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
            cropping: true  
          }).then(image => {  
            let source = { uri: image.path };
            this.setState({
                changeAvatar:true,
                avatarSource: source
            })
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
         let source = { uri: image.path };
         this.setState({
             changeAvatar:true,
             avatarSource: source
         });
       });
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
                    <NavigationBar title='个人信息' leftView={<NavigationBar.BackButton title='Back' onPress={()=>{navigation.goBack()}}/>} />
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
                detail={this.state.changeAvatar ?
                    <Image
                    source={this.state.avatarSource}
                    style={{ height: 60, width: 60,borderRadius:30 }}
                    /> 
                    :
                    <Image
                    source={{ uri: "http://www.wxdevelop.com/xc-cms/public/"+userInfo.info.avatar_url }}
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
                <GiftedForm.ModalWidget
                    title='电话'
                    displayValue='tel'
                >
                <GiftedForm.SeparatorWidget />
                <GiftedForm.TextInputWidget
                    name='tel' // mandatory
                    clearButtonMode='while-editing'
                />
                </GiftedForm.ModalWidget>
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
                    value="未绑定"
                />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/qq.png')}
                    title='绑定QQ'
                    value="绑定"
                />
                <GiftedForm.RowValueWidget  
                    image={require('../constants/images/支付宝.png')}
                    title='绑定支付宝'
                    value="未绑定"
                />
                <GiftedForm.SeparatorWidget />
                <Button 
                    onClick={this.logout}
                >登出</Button>
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

export default connect(mapStateToProps)(Setting);

