import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, FlatList, ProgressBarAndroid, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { getCompanyList } from '../actions/companyAction';
import * as Types from "../actions/actionTypes";
import { Card } from 'antd-mobile';
import { ListRow, Label, ActionSheet, Button, } from 'teaset';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnd:false,
        }
    }

    componentDidMount() {
        this.getCompanyList();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: Types.CompanyList_FAILED
        })
    }

    getCompanyList = ()=>{
        const { geolocation } = this.props.init.listeners;
        const { list, status } = this.props.companyReducer;
        let geo = geolocation.coords ? { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude } : {};
        let nextUrl = list.hasOwnProperty("next_page_url") ? list.next_page_url:false;
        if (nextUrl !== null){
            this.props.dispatch(
                getCompanyList(geo,nextUrl)
            )
        }else{
            this.setState({
                isEnd:true
            })
        }
    }

    _renderActionSheet = (contacts) => {
        let item = [];
        function workTime(item){
            let week = ['周日','周一','周二','周三','周四','周五','周六'];
            return `${week[item.weekday.substr(0, 1)]} ~ ${week[item.weekday.substr(-1)]} ( ${item.start_time}:00 至 ${item.end_time}:00 )`;
        }
        if(contacts.length == 0){
            items= [{
                title:<View style={[styles.flex_row_columncenter,{justifyContent: 'center'}]}>
                        <Image
                            source={require('../constants/images/睡觉.png')}
                            style={{ height: 40, width: 40,marginRight:10 }}
                        />
                        <Text style={styles.fontsize16}>这个公司很懒，还没有添加联系人</Text>
                    </View>
            }]
        }else{
            items = contacts.map((item, index) => {
                let flag = item.disturb == 0 ? false : true;
                if (flag){
                    let date = new Date();
                    let hour = date.getHours();
                    let weekday = date.getDay();
                    flag = !(item.weekday.indexOf(weekday) && item.start_time <= hour && hour <= item.end_time);
                }
                let url = `tel:${item.contact_tel}`;
                return {
                    title:
                    <View style={[styles.flex_row_columncenter,{justifyContent: 'center'}]}>
                        <View style={{flex:0.2,alignItems:'center'}}>
                            <Image
                                source={require('../constants/images/客服.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </View>
                        <View style={{flex:0.6,alignItems: 'flex-start'}}>
                            <Text style={styles.fontsize16}>{item.contact_name}: {flag ? item.disturb_mark:item.contact_tel}</Text>
                            <Text style={[styles.fontsize10,{color: '#ccc'}]}>工作时间: {
                                item.disturb == 0 ? '全时间段':
                                workTime(item)
                            }</Text>
                        </View>
                        <View style={{flex:0.2,alignItems: 'center'}}>
                        {flag ?
                        <Image
                            source={require('../constants/images/免打扰.png')}
                            style={{ height: 25, width: 25 }}
                        />:
                        <Image
                            source={require('../constants/images/电话-1.png')}
                            style={{ height: 20, width: 20 }}
                        />
                        }
                        </View>
                    </View>,
                    onPress: () => {
                        flag ? false:
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                console.log('Can\'t handle url: ' + url);
                            } else {
                                return Linking.openURL(url);
                            }
                        }).catch(err => console.error('An error occurred', err));
                    }
                }
            })
        }
        let cancelItem = { title: '关闭' };
        ActionSheet.show(items, cancelItem);
    }

    _renderItem = ({ item, index }) => {
        function numToMoney(){
            let sum = item.pre_count*item.pre_order_money + item.orders_sum;
            if (sum >= 50000){
                sum = (sum/10000).toFixed(2); 
                return `累计${sum}万元`;
            }else{
                return `累计${sum}元`;
            }
        }
        return (
            <Card full>
                <Card.Header
                    title={
                        <ListRow
                            title={
                                <View style={{ width: ScreenWidth * 0.4, marginRight: 20 }}>
                                    <View>
                                        <Text>
                                            {item.company_name}
                                            {item.recommend ?
                                                <Image
                                                    source={require('../constants/images/推荐.png')}
                                                    style={{ height: 50, width: 50 }}
                                                /> : null
                                            }
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.fontsize12}>{item.address}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.fontsize10}>共借出{item.pre_count + item.orders_count}笔|{numToMoney()}</Text>
                                    </View>
                                </View>
                            }
                            detail={item.distance && item.duration ?
                                <Text style={styles.fontsize10}>{item.distance.text}|{item.duration.text}</Text> :
                                null
                            }
                        />
                    }
                    thumb={item.image ?
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 80, width: 80 }}
                        /> :
                        <Image
                            source={require('../constants/images/公司.png')}
                            style={{ height: 80, width: 80 }}
                        />
                    }

                />
                <Card.Footer
                    style={{ flexDirection: 'column' }}
                    extra={
                        <View style={styles.flex_row_end}>
                            <View style={[styles.flex_row_columncenter, { flex: 0.7 }]}>
                                <View style={[styles.flex_center, { flex: 1 }]}>
                                    <Button title='联系我们' onPress={() => this._renderActionSheet(item.company_contacts)} />
                                </View>
                                {item.appointment ?
                                    <View style={[styles.flex_center, { flex: 1 }]}>
                                        <Button title='预约' onPress={() => alert('预约')} />
                                    </View>
                                    : null
                                }
                            </View>
                        </View>
                    }
                />
            </Card>
        )
    }
    _renderFoot = ()=>{
        if (this.state.isEnd){
            return (<View style={[styles.flex_row_columncenter,{height:50}]}>
            <View style={{flex:1,backgroundColor:'gray',height:1,marginLeft:10 ,opacity:0.1}}></View>
            <View style={{flex:1,alignItems: 'center',opacity:0.5}}><Text>我是有底线的</Text></View>
            <View style={{flex:1,backgroundColor:'gray',height:1,marginRight:10,opacity:0.1}}></View>
        </View>)
        }else{
            if (this.props.companyReducer.status == 'doing'){
                return (<View style={{height:50,justifyContent: 'center',}}>
                <ProgressBarAndroid styleAttr="SmallInverse" />
            </View>)
            }else{
                return null;
            }
        }
    }
    render() {
        const { list, status } = this.props.companyReducer;
        console.log(list)
        return (
            <View style={{ flex: 1 }}>                    
                <StatusBar
                    translucent={false}
                    backgroundColor='#40a9ff'
                />

                <FlatList
                    ListFooterComponent={this._renderFoot()}
                    initialNumToRender={5}
                    data={list.data}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    onEndReached={this.getCompanyList}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}




function mapStateToProps(state) {
    return {
        init: state.initReducer,
        companyReducer: state.companyReducer,
    }
}
export default connect(mapStateToProps)(CustomerList);