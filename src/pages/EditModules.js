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
const topOffset = 50;
const itemHeight = 50;
class EditModules extends Component{
    constructor(...props){
        super(...props);
        this.modules = [...this.props.modules];
        this.items = [];
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
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
            },
            onPanResponderTerminate: (evt, gestureState) => {

            }
        });
    }
    _getIdByPosition(pageY){
        var id = -1;
        const modulesCount = this.modules.length;
        pageY = pageY-topOffset;
        for (let index = 0; index < modulesCount; index++) {
            if (pageY >= itemHeight*index && pageY < itemHeight*(index+1)){
                return index;
            }            
        }
        return id;
    }

    _getTopValueYById(id){
        return (id * itemHeight + topOffset);
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
                        style={[styles.item, {top: i*itemHeight + topOffset}]}
                    > 
                        <Text >{item.name}</Text>
                        <Switch 
                            onValueChange={(value)=>{
                                let newModules = [...modules];
                                newModules[i] = {
                                    ...item,
                                    selected:value
                                }
                                this.modules = [...newModules];
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
                <Button title='完成' 
                    onPress={() => {
                        dispatch({
                            type:'changeModules',
                            data:this.modules
                        })
                        this.props.navigation.navigate('Home');
                    }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        height: itemHeight,
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