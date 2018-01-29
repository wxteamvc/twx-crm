import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { NavigationBar,Toast } from 'teaset';
import { List,Button,WhiteSpace,Badge,Tabs } from 'antd-mobile';
import Empty from '../components/empty';
const Item = List.Item;
const Brief = Item.Brief;

class Tasks extends Component{
    render(){
        const {navigation} = this.props;
        const {data,title} = navigation.state.params;
        console.log(data)
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title={title} 
                    leftView={<NavigationBar.BackButton  onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <TouchableWithoutFeedback
                            onPress={()=>{
                                navigation.navigate('AssignedTask')
                            }}
                        >
                        <View>
                            <Text style={{color:'#fff',fontSize:14,marginRight:10}}>指派任务</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    }/>
                </View>
                {data.length == 0 ?
                <Empty/>:
                <ScrollView style={{flex:1,marginTop:68}}>
                    <List>
                         {data.map((v,index)=>
                             <Item
                                key={index}
                                multipleLine
                                thumb={
                                    <Image 
                                    source={v.user_from.avatar_path==null?
                                    require('../constants/images/头像.png'):
                                    {uri:v.user_from.avatar_path}
                                    } 
                                    style={{width:40,height:40,borderRadius:20,marginRight:10}}
                                    />}
                                >
                                <Text>指派人:{v.user_from.nickname}</Text>
                                <Text>被指派人:{v.user_to.nickname}</Text>
                                <Text>执行时间:{v.execution_time}</Text>
                                <Brief>任务详情:</Brief> 
                                <Brief>{v.task_mark}</Brief>
                            </Item>    
                        )} 
                    </List>
                </ScrollView>
                }
               
            </View>
        )
    }
}

export default Tasks;