/**
 * 公司界面编辑页面
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
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, WhiteSpace, Button, Picker, Icon, Tabs, WingBlank, Carousel, ActionSheet, Modal, } from 'antd-mobile';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import OrderInfo from '../components/orderInfo';
import OrderCycle from '../components/orderCycle';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import { getOrderInfo } from '../actions/ordersAction';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationBar, Toast } from 'teaset';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Item } from 'antd-mobile/lib/tab-bar';

const size = {
    company_background: {
        width: 2048,
        height: parseInt(2048 / 3),
        // cropping: true
    },
    company_avatar: {
        width: 1024,
        height: 1024,
        // cropping: true,
        // cropperCircleOverlay: true
    }
}
class CompanyEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            introduce_modal: false,
            lunbo_modal: false,
            edit_introduce: '',  //编辑的简介数据
            edit_lunbo: [],      //编辑的轮播数据
            ...this.props.navigation.state.params.companyInfo.company_home
        }
    }


    submitEdit = () => {
        const { company_background, company_avatar, company_about, company_home_carousel } = this.state;
        let data = {};
        data.company_background = { uri: company_background, type: 'multipart/form-data', name: 'company_background' };
        data.company_avatar = { uri: company_avatar, type: 'multipart/form-data', name: 'company_avatar' };
        data.company_about = company_about;
        data.img = [];
        data.title = [];
        data.content = [];
        company_home_carousel.map((item, index) => {
            data.img.push({ uri: item.img, type: 'multipart/form-data', name: `company_home_carousel${index}` });
            data.title.push(item.title);
            data.content.push(item.content);
        })
        Util.post(Urls.SetCompanyHome, data,
            (respJson) => {
                console.log(respJson)
            },
            (error) => {
                console.log(error)
                Toast.fail(error.message);
            }
        )
    }



    renderLunbo() {
        const company_home_carousel = this.state.company_home_carousel;
        let list = [];
        for (const key in company_home_carousel) {
            list.push(
                <ImageBackground key={key} source={{ uri: company_home_carousel[key].img }} style={{ width: ScreenWidth, height: parseInt(ScreenWidth / 3) }}>
                    <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' }]}>
                        <View style={{ flex: 0.7, paddingLeft: 30, paddingTop: 20 }}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>{company_home_carousel[key].title ? company_home_carousel[key].title : null}</Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={[styles.fontsize12, { color: '#fff' }]} numberOfLines={2}>{company_home_carousel[key].content ? company_home_carousel[key].content : null}</Text>
                        </View>
                    </View>
                </ImageBackground>
            )

        }
        return list
    }


    chooseImg(key) {
        ImagePicker.openPicker(
            size[key]
        ).then(image => {
            let file = { uri: image.path, type: image.mime, name: 'image.jpg' };
            this.setState({
                [key]: image.path,
                form: {
                    ...this.state.form,
                    [key]: file
                }
            })
        });
    }

    takePhoto(key) {
        ImagePicker.openCamera(
            size[key]
        ).then(image => {
            let file = { uri: image.path, type: image.mime, name: 'image.jpg' };
            this.setState({
                [key]: image.path,
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
        const { company_background, company_avatar, company_about, company_home_carousel, introduce_modal, edit_introduce, lunbo_modal, edit_lunbo } = this.state;
        const { navigation } = this.props;
        console.log(company_home_carousel);
        console.log(this.lunboForm);
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor='#40A9FF'
                />
                <NavigationBar title='修改界面'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                    rightView={
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.submitEdit}
                        >
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                        </TouchableOpacity>}
                />
                <ScrollView style={{ marginTop: 68 }}>
                    <WhiteSpace size={'sm'} />
                    <View style={[styles.flex_center, { backgroundColor: '#FD7D7C', height: 50 }]}>
                        <View style={[styles.flex_column_columncenter,]}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>
                                点击对应部位以编辑内容
                        </Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.showActionSheet('company_background')}
                    >
                        <ImageBackground
                            source={{ uri: company_background }}
                            style={{ width: ScreenWidth, height: 130 }}
                        >
                            <View style={[styles.customerInfo_head_bg, { flex: 1 }]}>
                                <View style={[styles.flex_row_columncenter, { marginTop: 50 }]}>
                                    <View style={[styles.flex_row_columncenter, { flex: 0.6, paddingLeft: 15 }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => this.showActionSheet('company_avatar')}
                                        >
                                            <Image source={{ uri: company_avatar }} style={styles.companyHome_head_avatar} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.setState({ introduce_modal: true, edit_introduce: company_about })}
                        style={styles.companyHome_content_synopsis_body}>
                        <View style={styles.companyHome_content_synopsis_content}>
                            <Text style={[styles.fontsize12]}>{company_about}</Text>
                        </View>
                        <View style={styles.companyHome_content_synopsis_position}>
                            <View style={styles.companyHome_content_synopsis_position_title}>
                                <Text style={[styles.fontsize12, { color: '#fff' }]}>公司简介</Text>
                            </View>
                            <View style={styles.companyHome_content_synopsis_position_jiao}></View>
                        </View>
                    </TouchableOpacity>
                    <WhiteSpace size={'sm'} />
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                edit_lunbo: company_home_carousel.length > 0 ? company_home_carousel : [{}],
                                lunbo_modal: true
                            })
                            this.lunboForm = company_home_carousel.map((item,index)=>{
                                      return {}
                            })
                        }}
                    >
                        {company_home_carousel.length > 0 ?
                            <Carousel
                                autoplayInterval={5000}
                                autoplay
                                infinite
                                dots={false}
                            >
                                {this.renderLunbo()}
                            </Carousel> :
                            <View style={[styles.flex_center, { height: 100, backgroundColor: '#fff' }]}>
                                <Text style={styles.fontsize12}>
                                    点击添加轮播广告
                                </Text>
                            </View>

                        }
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    visible={introduce_modal}
                    maskClosable={false}
                    animationType="slide"
                    onClose={() => this.setState({ introduce_modal: false })}
                >
                    <View style={[styles.flex_row_between, { padding: 3, paddingTop: 10, paddingBottom: 10, backgroundColor: '#007ACC' }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { this.setState({ introduce_modal: false }) }}
                        >
                            <Icon type={'left'} color={'#fff'} size={25} />
                        </TouchableOpacity>
                        <Text style={[styles.fontsize18, { color: '#fff' }]}>编辑公司简介</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.setState({
                                company_about: edit_introduce,
                                introduce_modal: false,
                                form: {
                                    ...this.state.form,
                                    company_about: edit_introduce
                                }
                            })}
                            style={[styles.flex_center]}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <WhiteSpace size={'md'} /> */}
                    <View style={[{ height: ScreenHeight, width: ScreenWidth }]}>
                        <View style={{ padding: 10 }}>
                            <TextInput
                                multiline={true}
                                underlineColorAndroid="transparent"
                                style={{ minHeight: 200, maxHeight: 200, textAlignVertical: 'top', padding: 10, borderRadius: 10, backgroundColor: '#ccc' }}
                                value={edit_introduce}
                                onChangeText={(text) => this.setState({ edit_introduce: text })}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={lunbo_modal}
                    maskClosable={false}
                    animationType="slide-down"
                    onClose={() => this.setState({ introduce_modal: false })}
                >
                    <View style={{ backgroundColor: '#E9E9EF', height: ScreenHeight }}>
                        <View style={[styles.flex_row_between, { padding: 3, paddingTop: 10, paddingBottom: 10, backgroundColor: '#007ACC' }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => { this.setState({ lunbo_modal: false }) }}
                            >
                                <Icon type={'left'} color={'#fff'} size={25} />
                            </TouchableOpacity>
                            <Text style={[styles.fontsize18, { color: '#fff' }]}>轮播图编辑</Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    this.setState({
                                        company_home_carousel: edit_lunbo,
                                        lunbo_modal: false,
                                        form: {
                                            ...this.state.form,
                                            company_home_carousel: edit_lunbo
                                        }
                                    })
                                }}
                            >
                                <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                            </TouchableOpacity>
                        </View>
                        <WhiteSpace size={'md'} />
                        <FlatList
                            style={{ height: ScreenHeight }}
                            data={edit_lunbo}
                            renderItem={this.renderEditLunboItem}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => <WhiteSpace size={'md'} />}
                            ListFooterComponent={() => {
                                return (
                                    <View style={styles.flex_column_rowcenter}>
                                        <WhiteSpace size={'md'} />
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                if (edit_lunbo.length < 5) {
                                                    this.setState({ edit_lunbo: edit_lunbo.concat({}) })
                                                } else {
                                                    Toast.message('轮播图最多设置五张');
                                                }
                                            }}
                                            style={[styles.flex_center, { width: ScreenWidth / 2, height: 40, backgroundColor: '#fff' }]}>
                                            <Icon type={"\uE627"} color={'#ccc'} size={30} />
                                        </TouchableOpacity>
                                        <View style={{ height: 35 }}></View>
                                    </View>

                                )
                            }}
                        >
                        </FlatList>
                    </View>
                </Modal>
            </View>
        )
    }

    lunboChooseImg(key) {
        ImagePicker.openPicker(
            {
                width: 2048,
                height: parseInt(2048 / 3),
                // cropping: true
            }
        ).then(image => {
            // let file = { uri: image.path, type: image.mime, name: 'image.jpg' };
            this.setState({
                edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                    if (index == key) {
                        item.id = 1,
                            item.img = image.path
                    }
                    return item
                })
            })
        });
    }

    lunboTakePhoto(key) {
        ImagePicker.openCamera(
            {
                width: 2048,
                height: parseInt(2048 / 3),
                // cropping: true
            }
        ).then(image => {
            // let file = { uri: image.path, type: image.mime, name: 'image.jpg' };
            this.setState({
                edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                    if (index == key) {
                        item.id = 1,
                            item.img = image.path
                    }
                    return item
                })
            })
        });
    }

    lunboChangeText(text, key, type,id) {
        this.setState({
            edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                if (index == key) {
                    item.id = 1,
                        item[type] = text
                }
                return item
            })
        })
        this.lunboForm[key].id=id;
        this.lunboForm[key][type] = text;
    }

    lunboShowActionSheet(key) {
        const BUTTONS = ['拍照', '从本地选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
            (buttonIndex) => {
                if (BUTTONS[buttonIndex] == '拍照') {
                    this.lunboTakePhoto(key)
                } else if (BUTTONS[buttonIndex] == '从本地选择') {
                    this.lunboChooseImg(key)
                }
            }
        );
    }


    renderEditLunboItem = ({ item, index }) => {
        return (
            <View key={index} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.lunboShowActionSheet(index)}
                >
                    {item.img ?
                        <Image source={{ uri: item.img }} style={[{ width: ScreenWidth - 20, height: parseInt((ScreenWidth - 20) / 3), }]} /> :
                        <View style={[styles.flex_center, { width: ScreenWidth - 20, height: parseInt((ScreenWidth - 20) / 3), backgroundColor: '#fff' }]}>
                            <Icon type={'\uE625'} size={50} color={'#ccc'} />
                        </View>
                    }
                </TouchableOpacity>
                <WhiteSpace size={'sm'} />
                <View style={[styles.flex_row_columncenter, styles.CompanyAuthentication_input_container]}>
                    <View style={[{ flex: 0.2 }]}>
                        <Text numberOfLines={1} style={[styles.fontsize14]}>标题</Text>
                    </View>
                    <TextInput
                        style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.lunboChangeText(text, index, 'title',item.id)}
                        value={item.title}
                    />
                </View>
                <View style={[styles.CompanyAuthentication_input_container]}>
                    <WhiteSpace size={'sm'} />
                    <Text numberOfLines={1} style={[styles.fontsize14]}>内容</Text>
                    <TextInput
                        style={[styles.fontsize14, styles.CompanyAuthentication_input]}
                        underlineColorAndroid="transparent"
                        style={{ minHeight: 50, maxHeight: 50, textAlignVertical: 'top', padding: 10 }}
                        onChangeText={(text) => this.lunboChangeText(text, index, 'content',item.id)}
                        value={item.content}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            edit_lunbo: this.state.edit_lunbo.filter((item, k) => k !== index)
                        })
                    }}
                    style={{ position: 'absolute', top: 5, right: 15 }}>
                    <Icon type={'\uE622'} color='#ccc' size={15} />
                </TouchableOpacity>
            </View>
        )
    }




}


function mapStateToProps(state) {
    return {
        ordersInfo: state.ordersReducer.info,
    }
}

export default connect(mapStateToProps)(CompanyEdit);