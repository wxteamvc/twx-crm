import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { styles } from '../constants/styles'
import { home_top, home_mid } from '../constants/mock'
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import MenuItem from '../components/menuItem'
class Home extends Component {


    render() {
        let { initData } = this.props;
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
                    <MenuItem data={home_mid}  />
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}
export default connect(mapStateToProps)(Home);