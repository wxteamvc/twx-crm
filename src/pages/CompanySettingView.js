import React, { Component } from 'react';
import { View, Text,StatusBar,FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar,Toast,ListRow} from 'teaset';
import { List } from 'antd-mobile';

class CompanySetting extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
       
    }
    componentDidMount() {
       
    }
    _renderItem = ({item})=>{
        return (
            <ListRow title={item.title} accessory={'indicator'}
            icon={item.icon?item.icon:null}
            onPress={()=>{
                item.gourl ? this.props.navigation.navigate(item.gourl):false;
            }}
            />
        )
    }
    render() {
        const { navigation,localConfigReducer,styles} = this.props;
        const data = [
            {title:'员工管理',gourl:'Staff'},
            {title:'设置主页',gourl:'CompanyHomeSetting'},
        ]
        const authData = [
            {title:'公司认证',icon:require('../constants/images/认证.png')}
        ]
        const extraData = [
            {title:'操作指南',icon:require('../constants/images/问题.png')}
        ]
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='公司设置' leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <NavigationBar.IconButton icon={require('../constants/images/分享.png')} />
                    }
                    />
                </View>
                <View  style={{flex:1,marginTop:68}}>
                    <List renderHeader={'基本设置'}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />
                    </List>
                    <List renderHeader={'认证服务'}>
                        <FlatList
                            data={authData}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />
                    </List>
                    <List renderHeader={'其他'}>
                        <FlatList
                            data={extraData}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />
                    </List>
                </View>    
                
            </View>

        )
    }
}


function mapStateToProps(state) {
    return {
        localConfigReducer:state.localConfigReducer,
        styles:state.localConfigReducer.stylesMode
    }
}

export default connect(mapStateToProps)(CompanySetting);

