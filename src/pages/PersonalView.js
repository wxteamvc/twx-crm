import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    SectionList,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar,ListRow  } from 'teaset';
import { Card, WingBlank, WhiteSpace,Grid, Accordion,List } from 'antd-mobile';
import { PullView } from 'react-native-pull';
import { initPersonal } from '../actions/personalAction';
import Loading from '../components/loading'; 
import Collapsible from 'react-native-collapsible';

class Personal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isCollapsed:true,
        };
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    componentWillMount() {
       let { token } = this.props.localConfigReducer;
       global.token = token;
       if (token){
           console.log('执行请求');
           this.props.dispatch(initPersonal());
       }
    }
    onPullRelease = (resolve)=>{
        //do something
        this.props.dispatch(initPersonal());
        setTimeout(() => {
            resolve();
        }, 2000);
      }

    topIndicatorRender(pulling, pullok, pullrelease,gesturePosition) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);

		return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新pulling...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>松开刷新pullok......</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>玩命刷新中pullrelease......</Text>
    		</View>
        );
    }

    render(){
        let {initData,userInfo} = this.props;
        const rightView = (
            <NavigationBar.LinkButton
            onPress={()=>{
                this.setState({
                    isCollapsed:!this.state.isCollapsed
                })
            }}
                title="设置"
            />
        )
        const data = [
            {name:'订单管理'},
            {name:'客户管理'},
            {name:'还款管理'},
            {name:'过账管理'},
            {name:'通知管理'},
        ];
        if (userInfo.status == 'done' || userInfo.info !== null){
            return (
                <View style={{flex:1}}>
                    <Collapsible collapsed={this.state.isCollapsed}>
                        <View>
                            <Text>123123</Text>
                            <Text>123123</Text>
                            <Text>123123</Text>
                            <Text>123123</Text>
                        </View>
                    </Collapsible>


                    {/* <Accordion
                        sections={[
                            {
                                title:'first',
                                content:'Accordion'
                            }
                        ]}
                        renderHeader={(section)=>(
                            <View>
                            <Text style={styles.headerText}>{section.title}</Text>
                            </View>
                        )}
                        renderContent={(section)=>(
                            <View>
                            <Text>{section.content}</Text>
                            </View>
                        )}
                    /> */}



                    <View style={{height:66,backgroundColor:"#337AB7",padding:0,margin:0}}>
                        <NavigationBar title='我的' 
                        ref={(ref)=>this.navBar = ref}
                        rightView={rightView}
                        />
                    </View>
                    <PullView
                    style={{top:-1,backgroundColor:"#337AB7"}}
                    showsVerticalScrollIndicator={false}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender} 
                    topIndicatorHeight={60}
                    isPullEnd={true}
                    >
                        <Card full
                            style={{borderWidth:0,backgroundColor:"#337AB7"}}
                        >
                            <Card.Header
                                title="This is title"
                                thumb={<Image
                                    source={{uri:"http://www.wxdevelop.com/xc-cms/public/avatar/20180102/16b76ea61a3b26e1f590f72699868d15.jpg"}}
                                    style={{height:80,width:80}}
                                />}
                                extra={<Text>this is extra</Text>}
                            />
                        </Card>
                        <Card full
                            style={{borderWidth:0,backgroundColor:"#fff"}}
                        >
                            <Card.Header
                                title="个人信息"
                                thumb={<Image
                                    source={require('../constants/images/个人消息.png')}
                                    style={{height:20,width:20}}
                                    />}
                            />
                        </Card>
                        <WhiteSpace size="lg" style={{backgroundColor:"#E9E9EF"}}/>
                        <View style={{backgroundColor:"#fff"}}>
                            <Grid data={data}
                                columnNum={3}
                                renderItem={dataItem => (
                                    <Text>{dataItem.name}</Text>
                                )}
                            />
                        </View>
                        <WhiteSpace size="lg" style={{backgroundColor:"#E9E9EF"}}/>
                        <Card full>
                            <Card.Body>
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" style={{backgroundColor:"#E9E9EF"}}/>
                        <Card full>
                            <Card.Body>
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            <ListRow title='Title' detail='Detail' 
                            icon={require('../constants/images/个人消息.png')}
                            accessory='indicator'
                            />
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" style={{backgroundColor:"#E9E9EF"}}/>
                    </PullView>
                </View>
            )
        }
        return <Loading />  
    }

}


function mapStateToProps(state){
    return {
        initData:state.initReducer,
        localConfigReducer:state.localConfigReducer,
        userInfo:state.personalReducer,
    }
}
export default connect(mapStateToProps)(Personal);