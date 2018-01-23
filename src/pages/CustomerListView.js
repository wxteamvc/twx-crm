import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { getCustomerList } from '../actions/customerAction';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

class CustomerList extends Component {
    constructor(props) {
        super(props)
    }
 
   
   componentWillMount() {
    // if (this.props.isLogin) {
        this.props.dispatch(
            getCustomerList()
        )
    // } else {
    //     const resetAction = NavigationActions.reset({
    //         index: 1,
    //         actions: [
    //             NavigationActions.navigate({ routeName: 'HomeTab'}),
    //             NavigationActions.navigate({ routeName: 'Login' }),
               
    //         ]
    //     })
    //     this.props.navigation.dispatch(resetAction);
    // }
   }
   

    renderBody = (item, key) => {
        return (
            <TouchableOpacity
                style={styles.item_body}
                activeOpacity={1}
                onPress={() => {
                    this.props.navigation.navigate('CustomerInfo', { id: item.id })
                }}>
                <View style={[styles.flex_row_between, styles.item_header]}>
                    <View style={styles.flex_row_columncenter}>
                        <Animatable.View animation="rubberBand" iterationCount="infinite" duration={5000} >
                            {item.sex == 1 ? <Image source={require('../constants/images/客户男.png')} style={styles.item_header_img} /> : <Image source={require('../constants/images/客户女.png')} style={styles.item_header_img} />}
                        </Animatable.View>
                        <Text style={[styles.fontsize14, { marginLeft: 5, color: '#fff' }]}>{item.cname}</Text>
                    </View>
                    <Text style={[styles.fontsize12, { color: '#fff' }]}>身份证号 : {item.card_id}</Text>
                </View>
                <View style={[{ paddingLeft: 20, paddingRight: 20 }]}>
                    <WhiteSpace size={'sm'} />
                    <View style={[styles.flex_row_columncenter]}>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize12}>
                                就职公司 : {item.company ? item.company : '未填写'}
                            </Text>
                        </View>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize12}>
                                公司职务 : {item.job ? item.job : '未填写'}
                            </Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <Text numberOfLines={2} style={styles.fontsize12}>
                        备注 : {item.mark ? <Text style={[styles.fontsize12, { color: 'red' }]}>{item.mark}</Text> : <Text style={[styles.fontsize12]}>未填写</Text>}
                    </Text>
                </View>
                <WhiteSpace size={'sm'} />
                <View style={[styles.flex_row_between]}>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>所属公司 : 新昌咨询(死数据)</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>贷款总额 : &yen; 5000&nbsp;&nbsp;&nbsp;&nbsp;回款总额 : &yen; 5000(死数据)</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.props.list.status == 'done'&&this.props.list.data.length!=0) {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor='#40a9ff'
                    />
                    <WhiteSpace />
                    <Accordion
                        sections={this.props.list.data}
                        renderMainBody={this.renderBody}
                        renderHeader={(section, key, isShow) => (
                            <View style={[styles.flex_center, { padding: 10 }]}>
                                {isShow ? <Icon type={'up'} size={15} color={'#ccc'} /> : <Icon type={'down'} size={15} color={'#ccc'} />}
                            </View>
                        )}
                        renderContent={(section) => (
                            <View>
                                <Text>我是内容</Text>
                            </View>
                        )}
                    />
                </View>
            )
        } else {
            return (
                <View style={[{ flex: 1 }, styles.flex_center]}>
                    <StatusBar
                        translucent={false}
                        backgroundColor='#40a9ff'
                    />
                    <ProgressBarAndroid styleAttr="Inverse" />
                </View>
            )
        }
    }
}




function mapStateToProps(state) {
    return {
        isLogin: state.personalReducer.isLogin,
        list: state.customerReducer.list,
    }
}
export default connect(mapStateToProps)(CustomerList);