import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

class Empty extends Component {

    render() {
        this.topHeight = this.props.topHeight?this.props.topHeight:200;
        this.text = this.props.text?this.props.text:'暂无内容';
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height:this.topHeight, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 18, color: '#cecece' }}>{this.text}</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <Image
                        source={require('../constants/images/暂无内容.png')}
                        style={{ height: 120, width: 120 }}
                    />
                </View>
            </View>
        )
    }
}

export default Empty;