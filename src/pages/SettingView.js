import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { NavigationBar,ListRow,Toast} from 'teaset';
import * as CacheManager from 'react-native-http-cache';

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
        console.log(localConfigReducer)
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='设置' leftView={<NavigationBar.BackButton title='Back' onPress={()=>{navigation.goBack()}}/>} />
                </View>
                <View style={{flex:1,marginTop:68}}>
                    <ListRow title='夜间模式' 
                        detail={
                            <ToggleSwitch
                            isOn={this.isOn}
                            onColor='#4CD662'
                            size='small'
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
                    <ListRow title='清理缓存' 
                    detail={<Text>{setting.cacheSize}</Text>} 
                    onPress={this.clearCache}
                    />
                    <ListRow title='意见反馈' 
                    onPress={()=>{}}
                    />
                    <ListRow title='关于我们' 
                    onPress={()=>{}}
                    />
                </View>
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

