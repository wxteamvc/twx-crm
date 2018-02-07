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
import { Toast } from 'teaset';
import * as Urls from "../constants/urls";
import Util from "../constants/util";

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
            company_background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517916145875&di=9deac363e085fc4b55e7a99eaaac4bba&imgtype=0&src=http%3A%2F%2Fimg2.3lian.com%2F2014%2Ff2%2F188%2Fd%2F105.jpg',
            company_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517916766069&di=fb9972803485a532e99bd79e87e09737&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170706%2F71e32d56cdff4917b1aac3319ffe2713_th.png',
            company_about: '我是公司简介balala',
            banner: [
                { img: 'http://p.yjbys.com/image/20160919/1474284202349030.png', title: '开借啦开借啦', content: '免息开借啦免息开借啦' },
                { img: 'http://pic1.win4000.com/wallpaper/b/5881ae6e5e47b.jpg', title: '开借啦开借啦', content: '免息开借啦免息开借啦免息开借啦' },
                { img: 'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/01/a8e8afe94d0e1e912643537ad60dc540.jpg', title: '开借啦开借啦', content: '免息开借啦免息开借啦免息开借啦免息开借啦' },
            ]
        }
    }



    submitEdit = () => {
        const { company_background, company_avatar, company_about, banner } = this.state;
        let data = {};
        data.company_background = { uri: company_background, type: 'multipart/form-data', name: 'company_background' };
        data.company_avatar = { uri: company_avatar, type: 'multipart/form-data', name: 'company_avatar' };
        data.company_about = company_about;
        let list=[];
        // let list = {
        //     img: [],
        //     title: [],
        //     content: []
        // };
        banner.map((item, index) => {
            // list.push({uri:item.img,type: 'multipart/form-data', name:`banner${index}`});
            list.push({title:item.title});
            // list.content.push(item.content);
        })
        data['banner[]'] = list;
        console.log(data)
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
        const { banner } = this.state;
        let list = [];
        for (const key in banner) {
            list.push(
                <ImageBackground key={key} source={{ uri: banner[key].img }} style={{ width: ScreenWidth, height: parseInt(ScreenWidth / 3) }}>
                    <View style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' }]}>
                        <View style={{ flex: 0.7, paddingLeft: 30, paddingTop: 20 }}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>{banner[key].title}</Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={[styles.fontsize12, { color: '#fff' }]} numberOfLines={2}>{banner[key].content}</Text>
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
            let file = { uri: image.path, type: image.mime };
            this.setState({
                [key]: image.path,
            })
        });
    }

    takePhoto(key) {
        ImagePicker.openCamera(
            size[key]
        ).then(image => {
            let file = { uri: image.path, type: image.mime };
            this.setState({
                [key]: image.path,
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
        const { company_background, company_avatar, company_about, banner, introduce_modal, edit_introduce, lunbo_modal, edit_lunbo } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor='#40A9FF'
                />
                <ScrollView>
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
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ edit_lunbo: banner.length > 0 ? banner : [{}], lunbo_modal: true })}>
                        {banner.length > 0 ?
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
                <View style={[styles.flex_row_center, { padding: 10 }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.submitEdit}
                        style={[styles.flex_center, { backgroundColor: '#40a9ff', flex: 0.2, borderRadius: 5, padding: 2 }]}>

                        <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={introduce_modal}
                    maskClosable={false}
                    animationType="slide"
                    onClose={() => this.setState({ introduce_modal: false })}
                >
                    <View style={[styles.flex_row_between, { padding: 10 }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { this.setState({ introduce_modal: false }) }}
                        >
                            <Icon type={'\uE61C'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.setState({
                                company_about: edit_introduce,
                                introduce_modal: false,
                            })}
                            style={[styles.flex_center, { backgroundColor: '#40a9ff', flex: 0.2, borderRadius: 5, padding: 2 }]}>

                            <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <WhiteSpace size={'md'} /> */}
                    <View style={[{ height: ScreenHeight, width: ScreenWidth }]}>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.fontsize14}>编辑公司简介</Text>
                            <WhiteSpace size={'md'} />
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
                        <View style={[styles.flex_row_between, { padding: 10 }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => { this.setState({ lunbo_modal: false }) }}
                            >
                                <Icon type={'\uE61C'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    this.setState({
                                        banner: edit_lunbo,
                                        lunbo_modal: false
                                    })
                                }}
                                style={[styles.flex_center, { backgroundColor: '#40a9ff', flex: 0.2, borderRadius: 5, padding: 2 }]}>

                                <Text style={[styles.fontsize14, { color: '#fff' }]}>保存</Text>
                            </TouchableOpacity>
                        </View>
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
            let file = { uri: image.path, type: image.mime };
            this.setState({
                edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                    if (index == key) {
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
            let file = { uri: image.path, type: image.mime };
            this.setState({
                edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                    if (index == key) {
                        item.img = image.path
                    }
                    return item
                })
            })
        });
    }

    lunboChangeText(text, key, type) {
        this.setState({
            edit_lunbo: this.state.edit_lunbo.map((item, index) => {
                if (index == key) {
                    item[type] = text
                }
                return item
            })
        })
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
                        <View style={[styles.flex_center, { width: ScreenWidth - 20, height: 100, backgroundColor: '#fff' }]}>
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
                        onChangeText={(text) => this.lunboChangeText(text, index, 'title')}
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
                        onChangeText={(text) => this.lunboChangeText(text, index, 'content')}
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