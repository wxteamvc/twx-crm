/**
 * 公司认证页面
 * 
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Easing,
    TextInput,
    ProgressBarAndroid,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, WhiteSpace, Button, Picker, Icon, Tabs, WingBlank, ActionSheet, } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import OrderInfo from '../components/orderInfo';
import OrderCycle from '../components/orderCycle';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import { getOrderInfo } from '../actions/ordersAction';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { NavigationBar, Toast } from 'teaset';
import Util from "../constants/util";
import * as Urls from "../constants/urls";


class CompanyAuthentication extends Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {},
            isAgree: true,
            loading: false
        }
    }


    submit = () => {
        this.setState({ loading: true })
        Util.post(Urls.Company_authentication_url, this.state.form,
            (respJson) => {
                if (respJson.code == 1) {
                    Toast.message(respJson.msg);
                    this.props.navigation.goBack();
                } else {
                    Toast.message(respJson.msg);
                }
                this.setState({ loading: false });
            },
            (error) => {
                Toast.message(error.message);
                this.setState({ loading: false });
            }
        )
    }

    inputChange(val, key) {
        this.setState({
            form: {
                ...this.state.form,
                [key]: val
            }
        })
    }

    chooseImg(key) {
        ImagePicker.openPicker({
            width: 2048,
            height: 1024,
        }).then(image => {
            let file = { uri: image.path, type: image.mime, name: 'xx.jpg' };
            this.setState({
                form: {
                    ...this.state.form,
                    [key]: file
                }
            })
        });
    }

    takePhoto(key) {
        ImagePicker.openCamera({
            width: 2048,
            height: 1024,
        }).then(image => {
            let file = { uri: image.path, type: image.mime, name: 'xx.jpg' };
            this.setState({
                form: {
                    ...this.state.form,
                    [key]: file
                }
            })
        });
    }

    showActionSheet(key) {
        const BUTTONS = ['拍照', '从本地选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
            (buttonIndex) => {
                if (BUTTONS[buttonIndex] == '拍照') {
                    this.takePhoto(key)
                } else if (BUTTONS[buttonIndex] == '从本地选择') {
                    this.chooseImg(key)
                }
            }
        );
    }


    render() {
        console.log(this.state.form)
        const { navigation } = this.props;
        const { form, isAgree } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar
                    translucent={false}
                    backgroundColor='#40a9ff'
                /> */}
                <NavigationBar title='公司认证'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                    rightView={
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                if (isAgree) {
                                    this.submit()
                                } else {
                                    Toast.message('只有同意添维信客户管理协议才能提交')
                                }
                            }}
                        >
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>提交</Text>
                        </TouchableOpacity>
                    }
                />
                <ScrollView style={{ marginTop: 68 }}>
                    <WhiteSpace size={'md'} />
                    <View style={[styles.flex_row_columncenter, styles.CompanyAuthentication_input_container]}>
                        <Text numberOfLines={1} style={[styles.fontsize14, { flex: 0.4 }]}>企业或机构全称</Text>
                        <TextInput
                            style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                            underlineColorAndroid="transparent"
                            placeholder={'输入企业或机构全称'}
                            onChangeText={(val) => { this.inputChange(val, 'name') }}
                        />
                    </View>
                    <View style={[styles.flex_row_columncenter, styles.CompanyAuthentication_input_container]}>
                        <Text numberOfLines={1} style={[styles.fontsize14, { flex: 0.4 }]}>组织机构代码</Text>
                        <TextInput
                            style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                            underlineColorAndroid="transparent"
                            placeholder={'输入组织机构代码'}
                            onChangeText={(val) => { this.inputChange(val, 'code') }}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.fontsize14, { color: '#000' }]}>上传企业机构证件 (2选1即可)</Text>
                    </View>
                    <View style={[styles.flex_row, styles.CompanyAuthentication_upload_container]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.showActionSheet('code_image')}
                            style={[styles.flex_column_center, { flex: 1 }]}>
                            <View style={[styles.flex_center, styles.CompanyAuthentication_upload_img_container]}>
                                <Image source={form.code_image ? { uri: form.code_image.uri } : require('../constants/images/上传图片.png')} style={form.code_image ? styles.CompanyAuthentication_upload_img_photo : styles.CompanyAuthentication_upload_img_default} />
                            </View>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12}>组织机构代码证</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.showActionSheet('business_image')}
                            style={[styles.flex_column_center, { flex: 1 }]}>
                            <View style={[styles.flex_center, styles.CompanyAuthentication_upload_img_container]}>
                                <Image source={form.business_image ? { uri: form.business_image.uri } : require('../constants/images/上传图片.png')} style={form.business_image ? styles.CompanyAuthentication_upload_img_photo : styles.CompanyAuthentication_upload_img_default} />
                            </View>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12}>工商营业执照</Text>
                        </TouchableOpacity>
                    </View>
                    <WhiteSpace size={'md'} />
                    <View style={[styles.flex_row_columncenter, styles.CompanyAuthentication_input_container]}>
                        <Text numberOfLines={1} style={[styles.fontsize14, { flex: 0.4 }]}>法人真实姓名</Text>
                        <TextInput
                            style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                            underlineColorAndroid="transparent"
                            placeholder={'输入法人真实姓名'}
                            onChangeText={(val) => { this.inputChange(val, 'legal_person') }}
                        />
                    </View>
                    <View style={[styles.flex_row_columncenter, styles.CompanyAuthentication_input_container]}>
                        <Text numberOfLines={1} style={[styles.fontsize14, { flex: 0.4 }]}>法人身份证号</Text>
                        <TextInput
                            style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                            underlineColorAndroid="transparent"
                            placeholder={'输入法人身份证号'}
                            onChangeText={(val) => { this.inputChange(val, 'legal_person_code') }}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.fontsize14, { color: '#000' }]}>上传法人身份证(正反面各一张)</Text>
                    </View>
                    <View style={[styles.flex_row, styles.CompanyAuthentication_upload_container]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.showActionSheet('legal_person_card_front')}
                            style={[styles.flex_column_center, { flex: 1 }]}>
                            <View style={[styles.flex_center, styles.CompanyAuthentication_upload_img_container]}>
                                <Image source={form.legal_person_card_front ? { uri: form.legal_person_card_front.uri } : require('../constants/images/上传图片.png')} style={form.legal_person_card_front ? styles.CompanyAuthentication_upload_img_photo : styles.CompanyAuthentication_upload_img_default} />
                            </View>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12}>身份证正面</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.showActionSheet('legal_person_card_back')}
                            style={[styles.flex_column_center, { flex: 1 }]}>
                            <View style={[styles.flex_center, styles.CompanyAuthentication_upload_img_container]}>
                                <Image source={form.legal_person_card_back ? { uri: form.legal_person_card_back.uri } : require('../constants/images/上传图片.png')} style={form.legal_person_card_back ? styles.CompanyAuthentication_upload_img_photo : styles.CompanyAuthentication_upload_img_default} />
                            </View>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12}>身份证反面</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.fontsize14, { color: '#000' }]}>说明</Text>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#fff' }}>
                        <Text style={styles.fontsize12}>1.证件照片要求清晰可见,才能审核通过</Text>
                        <Text style={styles.fontsize12}>2.证件照片只用于认证神风,不会用于其他用途,请放心上传</Text>
                        <WhiteSpace size={'xs'} />
                        <View style={styles.flex_row_columncenter}>
                            <TouchableOpacity
                                style={{ marginRight: 5 }}
                                activeOpacity={1}
                                onPress={() => this.setState({ isAgree: !this.state.isAgree })}
                            >
                                {this.state.isAgree ? <Icons name={'check-circle'} size={15} color={'#40a9ff'} /> : <Icons name={'circle'} size={15} color={'#ccc'} />}
                            </TouchableOpacity>
                            <Text style={styles.fontsize12}>我同意</Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => alert('查看协议')}>
                                <Text style={[styles.fontsize12, { color: '#40a9ff' }]}>《添维信客户管理协议》</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
                <Modal
                    visible={this.state.loading}
                    transparent
                    animationType={'none'}
                    maskClosable={false}
                    onRequestClose={() => { }}

                >
                    <View style={[styles.flex_center, { flex: 1 }]}>
                        <View style={[styles.flex_center, { height: 100, width: 100, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                            <ProgressBarAndroid styleAttr="Inverse"  color ={'#fff'}/>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }

}


function mapStateToProps(state) {
    return {
        ordersInfo: state.ordersReducer.info,
    }
}

export default connect(mapStateToProps)(CompanyAuthentication);