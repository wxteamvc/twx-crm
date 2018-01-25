import React, { Component } from 'react';
import { View, Text,StatusBar,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { NavigationBar,ListRow,Toast} from 'teaset';
import * as CacheManager from 'react-native-http-cache';
import { List } from 'antd-mobile';



class Setting extends Component {
    constructor(props){
        super(props);
    }
    clearCache = ()=>{
        CacheManager.clearCache().then(e=>{
            this.getCacheSize()
            Toast.success('清理成功')
        }).catch(error=>{
            Toast.fail('清理失败')
        });
        
        
    }
    getCacheSize = ()=>{
        CacheManager.getCacheSize().then(v=>{
            let cacheSize = (v/1024/1024).toFixed(2); 
            this.props.dispatch({
                type:'changeSetting',
                data:{
                    key:'cacheSize',
                    value:cacheSize+'M'
                }
            })
        })
    }
    componentWillMount() {
        this.isOn = this.props.localConfigReducer.setting.nightMode;
    }
    componentDidMount() {
        this.getCacheSize();
    }
    render() {
        const { navigation,localConfigReducer,styles} = this.props;
        const { setting } = localConfigReducer;
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='设置' leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <NavigationBar.IconButton icon={require('../constants/images/分享.png')} />
                    }
                    />
                </View>
                <ScrollView style={{flex:1,marginTop:68}}>
                <List renderHeader={() => '偏好设置'}>
                    <ListRow title='字体大小' 
                        icon={require('../constants/images/setting/字体大小.png')}
                        onPress={()=>{}}
                    />
                    <ListRow title='夜间模式' 
                        icon={require('../constants/images/setting/夜间模式.png')}
                        detail={
                            <ToggleSwitch
                            isOn={this.isOn}
                            onColor='#4CD662'
                            onToggle={(isOn) => {
                                this.props.dispatch({
                                    type:'changeSetting',
                                    data:{
                                        key:'nightMode',
                                        value:isOn
                                    }
                                })
                                this.props.dispatch({
                                    type:'changeStyles',
                                    data:isOn
                                })
                            }}
                          />
                        } 
                    />
                    <ListRow title='推送设置' 
                        icon={require('../constants/images/setting/推送.png')}
                        detail={
                            <ToggleSwitch
                            isOn={this.isOn}
                            onColor='#4CD662'
                            onToggle={(isOn) => {
                              
                            }}
                          />
                        } 
                    />
                    <ListRow title='移动网络不下载图片' 
                        icon={require('../constants/images/setting/无图模式.png')}
                        detail={
                            <ToggleSwitch
                            isOn={this.isOn}
                            onColor='#4CD662'
                            onToggle={(isOn) => {
                              
                            }}
                          />
                        } 
                    />
                    
                </List>
                <List renderHeader={() => '分享'}>
                    <ListRow title='分享应用给好友' 
                        onPress={()=>{}}
                    />
                </List>
                <List renderHeader={() => '通用设置'}>
                    <ListRow title='清理缓存' 
                    detail={<Text>{setting.cacheSize}</Text>} 
                    onPress={this.clearCache}
                    />
                    <ListRow title='意见反馈' 
                    onPress={()=>{navigation.navigate('FeedBack')}}
                    />
                    <ListRow title='关于我们' 
                    onPress={()=>{}}
                    />
                </List>
                </ScrollView>
            </View>

        )
    }
}


function mapStateToProps(state) {
    return {
        localConfigReducer:state.localConfigReducer,
        styles:state.localConfigReducer.stylesMode
    }
}

export default connect(mapStateToProps)(Setting);

