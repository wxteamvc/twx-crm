import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, WhiteSpace, Button, Picker, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { styles } from '../constants/styles';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import { NavigationBar, Toast } from 'teaset';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

class Application extends Component {

    constructor(props) {
        super(props)
        this.state = {
            submitdata: {
                money: '',
                reasons: '',
                invitation_code: '',
            }
        }
    }



    render() {
        console.log('我是分辨率')
        console.log(styles)
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar title='提交贷款申请'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                    rightView={
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.submit}
                        >
                            <Text style={[styles.fontsize16, { color: '#fff' }]}>提交</Text>
                        </TouchableOpacity>}
                />
                <View style={{ marginTop: 68, flex: 1 }}>
                    <GiftedForm
                        formName='addContact'
                        openModal={(router) => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate('Modal',
                                {
                                    renderContent: router.renderScene,
                                    onClose: router.onClose,
                                    getTitle: router.getTitle
                                });
                        }}
                        clearOnClose={true}
                    >
                        <GiftedForm.SeparatorWidget />
                        <GiftedForm.TextInputWidget
                            name='contact_name'
                            title='贷款金额'
                            keyboardType='numeric'
                            clearButtonMode='while-editing'
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => {
                                this.setState({
                                    submitdata: {
                                        ...this.state.submitdata,
                                        money: val
                                    }
                                })
                            }}
                        />
                        <List renderHeader={() => <View style={{ backgroundColor: '#fff', padding: 10 }}><Text style={[styles.fontsize15, { color: '#000' }]}>贷款用途</Text></View>} >
                            <TextareaItem
                                rows={5}
                                count={200}
                                onChange={value => {
                                    this.setState({
                                        submitdata: {
                                            ...this.state.submitdata,
                                            reasons: value
                                        }
                                    })
                                }}
                            />
                        </List>
                        <GiftedForm.SeparatorWidget />
                        <GiftedForm.TextInputWidget
                            name='contact_name'
                            title='业务员邀请码'
                            clearButtonMode='while-editing'
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => {
                                this.setState({
                                    submitdata: {
                                        ...this.state.submitdata,
                                        invitation_code: val
                                    }
                                })
                            }}
                        />
                    </GiftedForm>
                </View>
            </View>


        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}


const FormApplication = createForm()(Application)
export default connect(mapStateToProps)(FormApplication);