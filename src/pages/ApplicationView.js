import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { List, InputItem, Toast, WhiteSpace, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { styles } from '../constants/styles';
import { ApplicationForm } from '../constants/form';
import { Akira } from 'react-native-textinput-effects';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';


class Application extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formError: {},

        }
    }


    submit = () => {
        const { validateFields, getFieldError } = this.props.form;
        validateFields((error, value) => {
            console.log(error);
            console.log(value);
            if (error) {
                let errors = {};
                for (let key in error) {
                    errors[key] = getFieldError(key)
                }
                this.setState({ formError: errors })
            } else {
                this.setState({ formError: {} })
                console.log(value);
            }
        });
    }




    renderForm = () => {
        const { getFieldProps, getFieldsValue } = this.props.form;
        let form = [];
        for (const key in ApplicationForm) {
            const item = ApplicationForm[key];
            switch (item.type) {
                case 'input':
                    form.push(
                        <View key={key} style={styles.ApplicationView_item_body}>
                            <InputItem
                                {...getFieldProps(item.key, {
                                    rules: item.rules ? item.rules : []
                                }) }
                                type={item.keyboard ? item.keyboard : null}
                                extra={item.extra ? item.extra : null}
                            // placeholder={`请输入${item.title}`}
                            >
                                <Text style={[styles.fontsize12]}>{item.title}</Text>
                            </InputItem>
                            {this.state.formError[item.key] ?   // 状态里有没有对应key的错误信息 有的话就输出错误
                                this.state.formError[item.key].map((value, index) => {
                                    return (
                                        <View key={index} style={styles.flex_center}>
                                            <Text style={[styles.fontsize12, { color: 'red' }]}>***{value}***</Text>
                                        </View>)
                                }) : null
                            }
                        </View>
                    )
                    form.push(<WhiteSpace size={'sm'} key={key + '_white'} />)
                    break;
                case 'picker':
                    form.push(
                        <View key={key} style={styles.ApplicationView_item_body}>
                            <Picker
                                data={item.options}
                                cols={1}
                                {...getFieldProps(item.key, {
                                    rules: item.rules ? item.rules : []
                                }) }
                            >
                                <List.Item><Text style={[styles.fontsize12]}>{item.title}</Text></List.Item>
                            </Picker>
                            {this.state.formError[item.key] ?   // 状态里有没有对应key的错误信息 有的话就输出错误
                                this.state.formError[item.key].map((value, index) => {
                                    return (
                                        <View key={index} style={styles.flex_center}>
                                            <Text style={[styles.fontsize12, { color: 'red' }]}>***{value}***</Text>
                                        </View>)
                                }) : null
                            }
                        </View >
                    )
                    form.push(<WhiteSpace size={'sm'} key={key + '_white'} />)
                    break;
                default:
                    break;
            }
        }
        return form
    }


    render() {
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                />
                <ScrollView>
                    <ImageBackground
                        source={require('../constants/images/infobackground.jpg')}
                        style={{ marginTop: StatusBarHeight, height: 150, width: ScreenWidth }}
                    >
                    </ImageBackground>
                    <WhiteSpace size='xl' />
                    {/* <List> */}
                    {this.renderForm()}
                    {/* </List> */}
                    <WhiteSpace size='xl' />
                    <View style={styles.flex_row_center}>
                        <Button style={{flex:0.6}} type="primary" onClick={this.submit}>提交申请</Button>
                    </View>
                    <WhiteSpace size='xl' />
                </ScrollView>
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