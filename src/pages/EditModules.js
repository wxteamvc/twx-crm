import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Switch,
    PanResponder,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
const {height, width} = Dimensions.get('window');

class EditModules extends Component{
    constructor(...props){
        super(...props);
        this.modules = this.props.modules;
        this.items = [];
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const {pageY, locationY} = evt.nativeEvent;
                this.index = this._getIdByPosition(pageY);
                this.preY = pageY - locationY;
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {
                        shadowColor: "#000",
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: {height: 0, width: 2},
                        elevation: 5
                    }
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                let top = this.preY + gestureState.dy;
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {top: top}
                });

                let collideIndex = this._getIdByPosition(evt.nativeEvent.pageY);
                if(collideIndex !== this.index && collideIndex !== -1) {
                    let collideItem = this.items[collideIndex];
                    collideItem.setNativeProps({
                        style: {top: this._getTopValueYById(this.index)}
                    });
                    
                    [this.items[this.index], this.items[collideIndex]] = [this.items[collideIndex], this.items[this.index]];
                    [this.modules[this.index], this.modules[collideIndex]] = [this.modules[collideIndex], this.modules[this.index]];
                    this.index = collideIndex;
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const shadowStyle = {
                    shadowColor: "#000",
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: {height: 0, width: 0,},
                    elevation: 0
                };
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {...shadowStyle, top: this._getTopValueYById(this.index)}
                });
                console.log('发送新状态');
                this.props.dispatch({
                    type:'changeModules',
                    data:this.modules
                })
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            }
        });
    }
    _getIdByPosition(pageY){
        var id = -1;
        const height =49;
        if(pageY >= height && pageY < height*2)
            id = 0;
        else if(pageY >= height*2 && pageY < height*3)
            id = 1;
        else if(pageY >= height*3 && pageY < height*4)
            id = 2;
        else if(pageY >= height*4 && pageY < height*5)
            id = 3;
        else if(pageY >= height*5 && pageY < height*6)
            id = 4;
        return id;
    }

    _getTopValueYById(id){
        const height = 49;
        return (id + 1) * height;
    }
    render(){
        const { modules,dispatch } = this.props;
        return (
            <View style={styles.container}>
                {modules.map((item,i)=>{
                    return (
                    <View 
                        {...this._panResponder.panHandlers} 
                        key={i} 
                        ref={(ref) => this.items[i] = ref}
                        style={[styles.item, {top: (i+1)*49}]}
                    > 
                        <Text >{item.name}</Text>
                        <Switch 
                            onValueChange={(value)=>{
                                let newModules = [...modules];
                                newModules[i] = {
                                    ...item,
                                    selected:value
                                }
                                dispatch({
                                    type:'changeModules',
                                    data:newModules
                                })
                            }} 
                            value={item.selected}
                        />
                    </View>  
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
        height: 49,
        width:width,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#e9e9ef',
        borderBottomWidth: 1,
        paddingLeft: 20,
        position: 'absolute',
    },
});

function mapStateToProps(state){
    return {
        modules:state.localConfigReducer.modules,
    }
}

export default connect(mapStateToProps)(EditModules);