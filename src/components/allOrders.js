/*
 * 订单搜索组件
 * 
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    FlatList,
    Image,
    Keyboard,
    ScrollView,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { WhiteSpace, Icon, InputItem, Button, Tabs } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import Collapsible from './Accordion/Collapsible';
import MyButton from './myButton';



export default class allOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideSearch: true,
            searchType: 'none',
            searchText: '',
        }
    }
    getText = (text) => {
        this.setState({
            searchText: text,
        })
    }

    jump = () => {
        if (this.state.searchText) {
            alert(this.state.searchType+':'+this.state.searchText)
        } else {
            alert('请输入搜索条件')
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('OrderInfo')}
                style={{ padding: 10, backgroundColor: '#fff' }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.flex_center, { flex: 0.2 }]}>
                        <Image source={require('../constants/images/订单.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <View style={{ flex: 0.8, padding: 5, paddingLeft: 15 }}>
                        <Text style={[styles.fontsize12, { color: '#000' }]}>单号:10000201801250001</Text>
                        <WhiteSpace size="xs" />
                        <Text style={styles.fontsize10}>客户姓名:冠希</Text>
                        <WhiteSpace size="xs" />
                        <Text style={styles.fontsize10}>身份证号:320555196605054562</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    rendersearchText = () => {
        switch (this.state.searchType) {
            case 'none':
                return '全部订单'
                break;
            case 'cname':
                return '客户姓名'
                break;
            case 'phone':
                return '联系电话'
                break;
            case 'card_id':
                return '身份证号'
                break;
            case 'order_id':
                return '订单号码'
                break;
            default:
                break;
        }
    }  


    changeSearchType=(type)=>{
            this.setState({
                searchType:type,
                hideSearch:!this.state.hideSearch
            })
            if(this.state.searchText){
                alert('我要按照'+type+':'+this.state.searchText+'去搜索啦')
            }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[1, 2, 3, 4]}
                    ListHeaderComponent={() => <View style={{ height: 40 }}></View>}
                    ItemSeparatorComponent={() => <WhiteSpace size={'sm'} />}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                />
                <View style={{ position: 'absolute', width: ScreenWidth, zIndex: 88 }}>
                    <View style={[styles.flex_row_columncenter, { backgroundColor: 'rgba(0,0,0,0.5)', height: 40 }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.flex_row_columncenter, { padding: 5,backgroundColor:'#666666',height:40 }]}
                            onPress={() => { this.setState({ hideSearch: !this.state.hideSearch }) }}
                        >
                            <Text style={[styles.fontsize12, { marginRight: 5, color: '#fff' }]}>{this.rendersearchText()}</Text>
                            {this.state.hideSearch ? <Icon type={"\uE606"} size={10} color={'#fff'} /> : <Icon type={"\uE607"} size={10} color={'#fff'} />}
                        </TouchableOpacity>
                        <TextInput
                            style={{ flex: 1, padding: 0, marginLeft: 10, color: '#fff' }}
                            underlineColorAndroid='transparent'
                            onChangeText={this.getText}
                            returnKeyType='search'
                            onSubmitEditing={this.jump}
                        />
                    </View>
                    <Collapsible
                        collapsed={this.state.hideSearch}
                    >
                        <View style={{ width: ScreenWidth, backgroundColor: '#fff' }}>
                            <WhiteSpace size={'xl'} />
                            <View style={styles.flex_row_columncenter}>
                                <View style={[styles.flex_center, { flex: 1 / 3 }]}>
                                    <MyButton lable="全部订单" active={this.state.searchType == 'none' ? true : false}
                                        onPress={() => this.changeSearchType('none')}
                                    />
                                </View>
                                <View style={[styles.flex_center, { flex: 1 / 3 }]}>
                                    <MyButton lable="客户姓名" active={this.state.searchType == 'cname' ? true : false}
                                       onPress={() => this.changeSearchType('cname')}
                                    />
                                </View>
                                <View style={[styles.flex_center, { flex: 1 / 3 }]}>
                                    <MyButton lable="联系电话" active={this.state.searchType == 'phone' ? true : false}
                                      onPress={() => this.changeSearchType('phone')}
                                    />
                                </View>
                            </View>
                            <WhiteSpace size={'xl'} />
                            <View style={styles.flex_row_columncenter}>
                                <View style={[styles.flex_center, { flex: 1 / 3 }]}>
                                    <MyButton lable="身份证号" active={this.state.searchType == 'card_id' ? true : false}
                                       onPress={() => this.changeSearchType('card_id')}
                                    />
                                </View>
                                <View style={[styles.flex_center, { flex: 1 / 3 }]}>
                                    <MyButton lable="订单号码" active={this.state.searchType == 'order_id' ? true : false}
                                       onPress={() => this.changeSearchType('order_id')}
                                    />
                                </View>
                            </View>
                            <WhiteSpace size={'xl'} />
                        </View>
                    </Collapsible>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: this.state.hideSearch ? 0 : ScreenHeight }}
                        onPress={() => this.setState({ hideSearch: !this.state.hideSearch })}
                    >
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}