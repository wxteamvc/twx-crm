import React, { Component } from 'react';
import { View,ScrollView,Text,StatusBar,Image,FlatList,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar,Toast,ListRow,ActionSheet} from 'teaset';
import { List,WhiteSpace,Icon } from 'antd-mobile';


class CompanyHomeSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                {title:'logo',
                detail:<Image
                    source={require('../constants/images/companyHome/默认logo.jpg')}
                    style={{ height: 80, width: 80 ,borderRadius:40 }}/>
                },
                {title:'背景',
                detail:<Image
                    source={require('../constants/images/companyHome/默认背景.jpg')}
                    style={{ height: 80, width: 200 }}/>
                },
                {title:'标题',
                detail:'新昌资讯有限公司'
                },
                {title:'公司介绍',
                titlePlace:'top',
                detail:'公司名称,公司名称,公司名称,公司名称,公司名称,公司名称公司名称公司名称公司名称公司名称,公司名称,公司名称公司名称公司名称,公司名称,公司名称,公司名称,公司名称,公司名称公司名称公司名称公司名称公司名称,公司名称,公司名称公司名称公司名称,公司名称,公司名称,公司名称,公司名称,公司名称公司名称公司名称公司名称公司名称,公司名称,公司名称公司名称'
                },
            ],
            carouselData:[
                {title:'轮播图1',
                title: '开借啦开借啦', 
                content: '免息开借啦免息开借啦' ,
                detail:require('../constants/images/companyHome/模板轮播图1.jpg')
                },
                {title:'轮播图2',
                title: '开借啦开借啦', 
                content: '免息开借啦免息开借啦' ,
                detail:require('../constants/images/companyHome/模板轮播图2.jpg')
                },
            ],
            extraData:[
                {title:'联系客服',ison:1},
                {title:'提交申请',ison:1},
                {title:'预约见面',ison:0},
                {title:'收藏公司',ison:0},
            ]
        }
    }
    componentWillMount() {
       
    }
    componentDidMount() {
       
    }
    _renderItem = ({item})=>{
        return (
            <ListRow title={item.title} accessory={'none'}
                icon={item.icon?item.icon:null}
                titlePlace={item.titlePlace ? item.titlePlace : 'left'}
                detail={item.detail ? item.detail : null} 
            />
        )
    }
    _renderCarouselItem = ({item,index})=>{
        return (
            <ListRow title={item.title} accessory={'none'}
            icon={item.icon?item.icon:null}
            detail={item.detail ? <Image
                    source={item.detail}
                    style={{ height: 80, width: 200 }}/> : null}
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
    _renderActionSheet = (index)=>{
        let items = [
            {title: '预览', onPress: ()=>{this.props.navigation.navigate('CompanyHome',{preview:this.state})}},
            {title: '保存', onPress: this.openCamera},
        ];
        let cancelItem = { title: `关闭` };
        ActionSheet.show(items, cancelItem);
    }
    render() {
        const { navigation,localConfigReducer,styles} = this.props;
        const { data, carouselData, extraData } = this.state;
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title={'公司主页设置'} leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <TouchableWithoutFeedback
                            onPress={this._renderActionSheet}
                        >
                        <View style={{marginRight:5}}>
                            <Icon type={'ellipsis'} size={30} color={"#ccc"}/>
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
                    <List renderHeader={'轮播广告 (最多5张)'}>
                        <FlatList
                            data={carouselData}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderCarouselItem}
                        />
                         <ListRow title={'添加轮播图'} accessory={'none'}
                        detail={
                            <TouchableWithoutFeedback onPress={()=>{alert('添加一张轮播图')}}>
                                <Image source={require('../constants/images/加号-1.png')}  style={{width:30,height:30}} />
                            </TouchableWithoutFeedback>
                            }
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

