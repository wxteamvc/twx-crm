import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { getTaskList } from '../actions/tasksAction';
import { connect } from 'react-redux';
import { NavigationBar,Toast } from 'teaset';
import Spinner from'react-native-spinkit';
import { List,Button,WhiteSpace,Badge,Tabs } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Tasks extends Component{
    componentDidMount(){
        this.props.dispatch(getTaskList());
    }
    render(){
        const {navigation,tasks} = this.props;
        const data = [
        { title: '我的任务' ,icon:require('../constants/images/task/接受指派.png'),count_key:'from_count',key:'from'},
        { title: '指派的任务',icon:require('../constants/images/task/指派任务.png'),count_key:'to_count',key:'to'},
        { title: '已完成任务',icon:require('../constants/images/task/完成.png'),count_key:'finish_count',key:'finish'},
        ];
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='我的任务' 
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
                {!tasks.list_loading && tasks.list_status?
                <ScrollView style={{flex:1,marginTop:68}}>
                    <List>
                        {data.map((v,index)=>
                             <Item
                                key={index}
                                extra={<Badge text={tasks.list[v.count_key]} overflowCount={9} style={{marginRight:20}}/>}
                                arrow="horizontal"
                                thumb={<Image source={v.icon} style={{width:40,height:40,marginRight:10}}/>}
                                multipleLine
                                onClick={() => {navigation.navigate('TaskList',{data:tasks.list[v.key],title:v.title})}}
                                >
                                {v.title}<Brief>subtitle</Brief>
                            </Item>    
                        )}
                    </List>
                </ScrollView> :
                <View style={{flex:1,marginTop:68,justifyContent:'center',alignItems:'center'}}>
                    <Spinner size={70} isVisible={true}
                    color={'#40A9FF'}
                    type={'9CubeGrid'}
                    />
                </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        localConfigReducer: state.localConfigReducer,
        tasks: state.tasksReducer,
    }
}
export default connect(mapStateToProps)(Tasks);