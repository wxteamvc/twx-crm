import React, { Component } from 'react';
import { View, Text, StatusBar, Image,TouchableHighlight } from 'react-native';
import { styles } from '../constants/styles'
import { home_top, home_mid } from '../constants/mock'
import { WhiteSpace,Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import MenuItem from '../components/menuItem'
class Home extends Component {
    render() {
        const { home_top,modules,navigation } = this.props;
        const selectModules=[];
        modules.map(function(item){
            if(item.selected){
                selectModules.push(item)
            }
        })
        selectModules.push({
            name:'更多',
            icon:require('../constants/images/消息.png'),
            goUrl:'EditModules'
        })
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <View style={[styles.home_top, {justifyContent: 'flex-end',}]}>
                    <View style={[styles.home_top_content,{justifyContent: 'center',alignItems:'center'}]}>
                        <Grid data={home_top}
                            columnNum={4}
                            isCarousel={true}
                            carouselMaxRow={2}
                            hasLine={false}
                            onClick={(item,index)=>{
                                navigation.navigate(item.goUrl)
                            }}
                            itemStyle={{alignItems:"center",justifyContent:"center"}}
                            renderItem={(dataItem,index) => {
                                return (
                                    <View style={{alignItems:"center",justifyContent:"center"}}>
                                        <Image source={dataItem.icon} style={{ width: 30, height: 30 ,backgroundColor:'#000'}} />
                                        <Text>{dataItem.name}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
                <WhiteSpace size='md'/>
                <View  style={{ backgroundColor: '#fff' }}>
                    <Grid data={selectModules}
                        columnNum={4}
                        isCarousel={true}
                        carouselMaxRow={2}
                        hasLine={false}
                        onClick={(item,index)=>{
                                navigation.navigate(item.goUrl)
                            }}
                        itemStyle={{alignItems:"center",justifyContent:"center"}}
                        renderItem={(dataItem,index) => {
                            return (
                                <View style={{alignItems:"center",justifyContent:"center"}}>
                                    <Image source={dataItem.icon} style={{ width: 30, height: 30 ,backgroundColor:'#000'}} />
                                    <Text>{dataItem.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}


function mapStateToProps(state){
    return {
        home_top:state.localConfigReducer.home_top,
        modules:state.localConfigReducer.modules,
    }
}
export default connect(mapStateToProps)(Home);

