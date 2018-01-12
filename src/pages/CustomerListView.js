import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity,StatusBar } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { getCustomerList } from '../actions/customerAction';
import * as Animatable from 'react-native-animatable';

class CustomerList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(
            getCustomerList()
        )
    }


    renderBody = (item, key) => {
        return (
            <TouchableOpacity
                style={styles.item_body}
                activeOpacity={1}
                onPress={() => {
                    this.props.navigation.navigate('CustomerInfo')
                }}>
                <View style={[styles.flex_row_between, styles.item_header]}>
                    <View style={styles.flex_row_columncenter}>
                        <Animatable.Text animation="rubberBand" iterationCount="infinite" duration={5000} >
                            {item.sex == 1 ? <Icon type={"\uE66A"} size={15} color={'#40a9ff'} /> : <Icon type={"\uE66A"} size={15} color={'#FF0033'} />}
                        </Animatable.Text>
                        <Text style={[styles.fontsize12, { marginLeft: 5 }]}>{item.cname}</Text>
                    </View>
                    <Text style={styles.fontsize10}>身份证号 : {item.card_id}</Text>
                </View>
                <View style={[{ paddingLeft: 20, paddingRight: 20 }]}>
                    <WhiteSpace size={'sm'} />
                    <View style={[styles.flex_row_columncenter]}>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize10}>
                                就职公司 : {item.company ? item.company : '未填写'}
                            </Text>
                        </View>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize10}>
                                公司职务 : {item.job ? item.job : '未填写'}
                            </Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <Text numberOfLines={2} style={styles.fontsize10}>
                        备注 : {item.mark ? <Text style={[styles.fontsize10, { color: 'red' }]}>{item.mark}</Text> : <Text style={[styles.fontsize10]}>未填写</Text>}
                    </Text>
                </View>
                <WhiteSpace size={'sm'} />
                <View style={[styles.flex_row_between]}>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>所属公司 : 新昌咨询</Text>
                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>贷款总额 : &yen; 5000&nbsp;&nbsp;&nbsp;&nbsp;回款总额 : &yen; 5000</Text>
                </View>

            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.props.list)
        if (this.props.customerReducer.status == 'done') {
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
        customerReducer: state.customerReducer,
        list: state.customerReducer.list,
    }
}
export default connect(mapStateToProps)(CustomerList);