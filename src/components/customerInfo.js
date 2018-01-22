/***
 * 
 * 客户信息渲染页面
 * 
***/

import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, ProgressBarAndroid, TouchableOpacity, StatusBar, ImageBackground, Linking } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Accordion from '../components/Accordion/Accordion';
import { styles } from '../constants/styles'
import { ScreenWidth, StatusBarHeight } from '../constants/global';

export default class InfoPage extends Component {


    renderListItem = ({ item, index }) => {
        return (
            <View style={[styles.flex_row_columncenter, styles.InfoPage_item_body]}>
                <View style={[{ flex: 0.3 }, styles.flex_row_columncenter]}>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>{item.title}</Text>
                </View>
                <View style={[{ flex: 0.7 }, styles.flex_row_columncenter]}>
                    <Text style={styles.fontsize12}>{item.value}</Text>
                </View>
            </View>
        )
    }


    render() {
        const { data } = this.props;

        const sexInfo={1:'男',2:'女'} ;

        function renderMarriage_status(status) {
            switch (status) {
                case 1:
                    return '已婚有子女'
                    break;
                case 2:
                    return '已婚无子女'
                    break;
                case 3:
                    return '未婚'
                    break;
                case 4:
                    return '离异'
                    break;
                default:
                    return ''
                    break;
            }
        }

        function renderLiving_status(status) {
            switch (status) {
                case 1:
                    return '商品房无贷'
                    break;
                case 2:
                    return '商品房有贷'
                    break;
                case 3:
                    return '租房'
                    break;
                case 4:
                    return '与亲属同住'
                    break;
                case 5:
                    return '集体宿舍'
                    break;
                case 6:
                    return '安置房'
                    break;
                case 7:
                    return '其他'
                    break;
                default:
                    return ''
                    break;
            }
        }

        const infoData = data ?
            [
                { title: '性别', value: data.sex?sexInfo[data.sex]:''},
                { title: '身份证', value: data.card_id?data.card_id:'' },
                { title: '手机号码', value: data.phone? data.phone:''},
                { title: '家庭地址', value: data.province ? data.province + data.city + data.area + data.home_address : '' },
                { title: '籍贯地址', value: data.household_address?data.household_address:'' },
                { title: '婚姻状况', value: data.marriage_status?renderMarriage_status(data.marriage_status):''},
                { title: '居住情况', value: data.living_status?renderLiving_status(data.living_status):''},
                { title: '居住情况备注', value: data.living_mark?data.living_mark:'' },
                { title: '有无汽车', value: data.car_status == 1 ? '有车' : '没车' },
                { title: '汽车品牌', value: data.car_brand ?data.car_brand:''},
                { title: '车牌号码', value: data.car_code ?data.car_code:''},
                { title: '车龄', value: data.car_age ? data.car_age:'' },
                { title: '任职公司', value: data.company?data.company:'' },
                { title: '所属行业', value: data.industry?data.industry:'' },
                { title: '公司地址', value: data.company_address?data.company_address:'' },
                { title: '公司电话', value: data.company_tel?data.company_tel:'' },
                { title: '职务', value: data.job?data.job :'' },
                { title: '现职年限', value: data.job_age? data.job_age:'' },
                { title: '月收入', value: data.income ? '￥' + data.income :''},
                { title: '社保账号', value: data.social_security?data.social_security:'' },
                { title: '社保密码', value: data.social_password?data.social_password:'' },
                { title: '公积金号码', value: data.accumulation_fund?data.accumulation_fund:'' },
                { title: '公积金密码', value: data.accumulation_password?data.accumulation_password:'' },
                { title: '零用贷申请记录', value: data.loan_record?data.loan_record:'' },
                { title: '客户备注', value: data.mark? data.mark:'' },
            ]
            : []
        return (
            <View style={{ flex: 1 }}>
                <WhiteSpace size={'sm'} />
                <FlatList
                    data={infoData}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderListItem}
                    style={{ backgroundColor: '#fff' }}
                />
            </View>
        )
    }
}