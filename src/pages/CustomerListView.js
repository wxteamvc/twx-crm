import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';

import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
// alert(Accordion)
class CustomerList extends Component {
    constructor(props) {
        super(props)
    }


    renderFlatListItem = ({ item, index }) => {
        return (
            <View style={styles.item_body}>
                <View style={[styles.flex_row_between, styles.item_header]}>
                    <View style={styles.flex_row_columncenter}>
                        <Icon type={"\uE66A"} size={15} color={'#40a9ff'} />
                        <Text style={[styles.fontsize10, { marginLeft: 5 }]}>张飞</Text>
                    </View>
                    <Text style={styles.fontsize10}>身份证号 : 320288195507254256</Text>
                </View>
                <View style={[{ paddingLeft: 20, paddingRight: 20 }]}>
                    <WhiteSpace size={'sm'} />
                    <View style={[styles.flex_row_columncenter]}>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize10}>
                                所属行业 : 制造业
                            </Text>
                        </View>
                        <View style={[{ flex: 1 }, styles.flex_row_columncenter]}>
                            <Text numberOfLines={1} style={styles.fontsize10}>
                                公司职务 : 主管
                            </Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <Text numberOfLines={2} style={styles.fontsize10}>
                        备注 : <Text style={[styles.fontsize10, { color: 'red' }]}>欠钱不还</Text>
                    </Text>
                </View>
                <WhiteSpace size={'sm'} />
                <View style={[styles.flex_row_between]}>
                    <Text style={styles.fontsize8}>所属公司 : 新昌咨询</Text>
                    <Text style={styles.fontsize8}>贷款总额 : &yen; 5000&nbsp;&nbsp;&nbsp;&nbsp;回款总额 : &yen; 5000</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WhiteSpace />
                <FlatList
                    data={[1, 2]}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderFlatListItem}
                />
            </View>
        )
    }
}




function mapStateToProps(state) {
    return {
        modules: state.localConfigReducer.modules,
        home: state.homeReducer,
    }
}
export default connect(mapStateToProps)(CustomerList);