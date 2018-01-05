import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { styles } from '../constants/styles'
import { home_top, home_mid } from '../constants/mock'

import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import MenuItem from '../components/menuItem'
class Home extends Component {


      


    render() {
        const { home_top,modules } = this.props;
        const selectModules=[];
        modules.map(function(item){
            if(item.selected){
                selectModules.push(item)
            }
        })
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <View style={[styles.home_top, styles.flex_column_end]}>
                    <View style={[styles.home_top_content, styles.flex_row_center]}>
                        <MenuItem data={home_top} />
                    </View>
                </View>
                <View style={{ margin: 10,marginBottom:20, backgroundColor: '#ccc', flex: 1 }}>
                    <MenuItem data={selectModules}  
                    extraData={{  name:'更多',selected:true,icon:require('../constants/images/更多.png'),goUrl:'EditModules'}} 
                    callBack = {
                        ({goUrl})=>{
                             this.props.navigation.navigate(goUrl);
                        }
                    }
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

