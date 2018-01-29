import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

class Empty extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{height:200,alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{fontSize:18,color:'#cecece'}}>暂无内容</Text>
                </View>
                <View style={{flex:0.5,alignItems:'center'}}>
                    <Image
                        source={require('../constants/images/暂无内容.png')}
                        style={{height:120,width:120}}
                    />
                </View>
            </View>   
        )
    }
}

export default Empty;