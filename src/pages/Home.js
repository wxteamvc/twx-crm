import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { ListRow } from 'teaset';
import { Icon } from 'antd-mobile';
import { connect } from 'react-redux';

class Home extends Component{

    render(){
        const selectModules=[];
        this.props.modules.map(function(item){
            if(item.selected){
                selectModules.push(item)
            }
       })
        let {initData} = this.props;
        return (
            <View>
               <Text>{initData.text}</Text>
               <Text>可用模块</Text>
               {selectModules.map((item,i)=>{
                   return <ListRow title={item.name} key={i} />
               })}
               <Button
                    onPress={() => this.props.navigation.navigate('EditModules')}
                    title="编辑模块"
                />  
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        initData:state.initReducer,
        modules:state.localConfigReducer.modules,
    }
}
export default connect(mapStateToProps)(Home);