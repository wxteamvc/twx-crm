/************
 * 折叠面板组件
 * 
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing, findNodeHandle, UIManager } from 'react-native';
import { styles } from '../constants/styles'
import { Icon, WhiteSpace } from 'antd-mobile';


export default class FoldingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            animation : new Animated.Value(),
            
        };
    }



    toggle=()=>{ //Step 1 
        let initialValue = this.state.expanded? this.state.maxHeight : 0,
            finalValue = this.state.expanded? 0 : this.state.maxHeight; 
        this.setState({ 
          expanded : !this.state.expanded //Step 2 
        }); 
      
        this.state.animation.setValue(initialValue); //Step 3 
        Animated.spring( //Step 4 
          this.state.animation, 
          { 
            toValue: finalValue ,
            duration:300,
            easing:Easing.linear
          } 
        ).start(); //Step 5
      }


      setMaxHeight=(event)=>{ 
        this.setState({ 
          maxHeight : event.nativeEvent.layout.height 
        });
      }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.flex_center}
                    onPress={this.toggle}
                >
                    {this.state.expanded ? <Icon type="up" /> : <Icon type="down" />}
                </TouchableOpacity>

                <Animated.View
                onLayout={this.setMaxHeight}
                style={{height:this.state.animation}}
                >
                    <Text>123456789</Text>
                    <Text>123456789</Text>
                    <Text>123456789</Text>
                    <Text>123456789</Text>
                    <Text>123456789</Text>
                </Animated.View>

            </View>
        )
    }


} 