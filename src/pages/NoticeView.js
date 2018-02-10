import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global'
import { TextField } from 'react-native-material-textfield';
import { NavigationBar, Toast } from 'teaset';
import { List, InputItem, WhiteSpace, Button, Picker, Icon, Tabs, WingBlank, Carousel, ActionSheet, Modal, Grid, Badge } from 'antd-mobile';
import moment from 'moment';
import Empty from '../components/empty'


class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    renderGrid = (dataItem) => {
        return (
            <View style={[styles.flex_center, { flex: 1 }]}>
                {dataItem.type_count ? <Badge text={dataItem.type_count}>
                    <View style={[styles.flex_center, { width: 45, height: 45, backgroundColor: dataItem.color, borderRadius: 5 }]}>
                        <Image source={dataItem.icon} style={{ width: 35, height: 35 }} />
                    </View>
                </Badge> :
                    <View style={[styles.flex_center, { width: 45, height: 45, backgroundColor: dataItem.color, borderRadius: 5 }]}>
                        <Image source={dataItem.icon} style={{ width: 35, height: 35 }} />
                    </View>
                }
                <WhiteSpace size={'sm'} />
                <Text style={styles.fontsize10}>{dataItem.title}</Text>
            </View>
        )
    }

    renderLastChat(item) {
        switch (item.message_type) {
            case 'text':
                return item.message
                break;
            case 'image':
                return '[ 图片 ]'
                break;
            case 'vedio':
                return '[ 视频 ]'
                break;
            case 'voice':
                return '[ 语音 ]'
                break;
            default:
                break;
        }
    }

    renderChat = ({ item, index }) => {
        console.log(item.last_chat.create_time)
        return (
            <TouchableOpacity style={[{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, paddingLeft: 0 }]}>
                <View style={[styles.flex_center, { flex: 0.2 }]}>
                    {item.chat_count > 0 ?
                        <Badge text={item.chat_count} >
                            <Image source={item.avatar_path ? { uri: item.avatar_path } : require('../constants/images/头像.png')} style={{ width: 50, height: 50 }} />
                        </Badge> :
                        <Image source={item.avatar_path ? { uri: item.avatar_path } : require('../constants/images/头像.png')} style={{ width: 50, height: 50 }} />}
                </View>
                <View style={[{ flex: 0.5, paddingLeft: 10 }]}>
                    <Text numberOfLines={1} style={[styles.fontsize14]}>{item.nickname}&nbsp;{item.company ? `(${item.company.company_name})` : null}</Text>
                    <View style={[styles.flex_column_columncenter, { flex: 1 }]}>
                        <Text numberOfLines={1} style={[styles.fontsize12]}>{this.renderLastChat(item.last_chat)}</Text>
                    </View>
                </View>
                <View style={[{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', }]}>
                    <Text numberOfLines={1} style={[styles.fontsize10, { color: '#ccc' }]}>{moment(parseInt(item.last_chat.time) * 1000).format('ll')}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    checkTypeCount(data, type) {
        let count = null;
        data.map((item, index) => {
            if (item.type == type) {
                count = item.type_count;
            }
        })
        return count;
    }


    render() {
        const { navigation } = this.props;
        const { notice_group, chat_notice } = navigation.state.params.notice;
        console.log(chat_notice)
        const menuList = [
            { title: '系统通知', icon: require('../constants/images/系统通知.png'), color: '#CC6666', type_count: notice_group.system },
            { title: '订单消息', icon: require('../constants/images/订单消息.png'), color: '#CCCC33', type_count: notice_group.order },
            { title: '个人消息', icon: require('../constants/images/消息.png'), color: '#FF66CC', type_count: notice_group.other },
        ]
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar title='个人消息'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                />
                {/* <WhiteSpace size={'md'}/> */}
                <View style={{ backgroundColor: '#fff', marginTop: 68 }}>
                    <Grid data={menuList}
                        columnNum={3}
                        carouselMaxRow={1}
                        renderItem={this.renderGrid}
                        hasLine={false}
                        onClick={(dataItem, index) => {
                            // navigation.navigate(dataItem.gourl, dataItem.extra)\
                            alert('跳转')
                        }}
                    />
                </View>
                <WhiteSpace size={'md'} />
                <FlatList
                    data={chat_notice}
                    renderItem={this.renderChat}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={{ borderColor: '#ccc', borderBottomWidth: 0.5 }}></View>}
                    ListEmptyComponent={() => <Empty topHeight={100} />}
                />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        initInfo: state.initReducer,
        userInfo: state.personalReducer,
        localConfigReducer: state.localConfigReducer,
    }
}

export default connect(mapStateToProps)(Notice);

