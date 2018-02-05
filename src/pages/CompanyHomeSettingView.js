import React, { Component } from 'react';
import { View,ScrollView,Text,StatusBar,Image,FlatList,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar,Toast,ListRow} from 'teaset';
import { List,WhiteSpace } from 'antd-mobile';

class CompanyHomeSetting extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
       
    }
    componentDidMount() {
       
    }
    _renderItem = ({item})=>{
        return (
            <ListRow title={item.title} accessory={'indicator'}
            icon={item.icon?item.icon:null}
            />
        )
    }
    _renderCarouselItem = ({item})=>{
        return (
            <ListRow title={item.title} accessory={'none'}
            icon={item.icon?item.icon:null}
            detail={
                item.detail == 'push' ? 
                <Image source={require('../constants/images/加号-1.png')}  style={{width:30,height:30}} />:
                null
            }
            />
        )
    }
    _renderExtraItem = ({item})=>{
        return (
            <ListRow title={item.title} accessory={'indicator'}
            icon={item.icon?item.icon:null}
            detail={
              item.ison == 1 ? <Text style={{color:"#2AA515"}}>已开启</Text> : <Text>未开启</Text>
            } 
            />
        )
    }
    render() {
        const { navigation,localConfigReducer,styles} = this.props;
        const data = [
            {title:'logo'},
            {title:'背景'},
            {title:'标题'},
            {title:'介绍'},
        ]
        const carouselData = [
            {title:'轮播图1'},
            {title:'轮播图2'},
            {title:'轮播图3'},
            {title:'添加轮播图',detail:'push'},
        ]
        const extraData = [
            {title:'联系客服',ison:1},
            {title:'提交申请',ison:1},
            {title:'预约见面',ison:0},
            {title:'收藏公司',ison:0},
        ]
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='公司首页设置' leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <TouchableWithoutFeedback
                            onPress={()=>{}}
                        >
                        <View>
                            <Text style={{color:'#fff',fontSize:14,marginRight:10}}>预览</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    }
                    />
                </View>
                <ScrollView  style={{flex:1,marginTop:68}}>
                    <List renderHeader={'基本设置'}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />
                    </List>
                    <List renderHeader={'轮播广告'}>
                        <FlatList
                            data={carouselData}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderCarouselItem}
                        />
                    </List>
                    <List renderHeader={'扩展功能'}>
                        <FlatList
                            data={extraData}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderExtraItem}
                        />
                    </List>
                    <WhiteSpace size={'lg'}/>
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

export default connect(mapStateToProps)(CompanyHomeSetting);

