import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';
import { getFormOptions } from '../actions/tasksAction';
import { connect } from 'react-redux';
import { NavigationBar,Toast } from 'teaset';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { List, TextareaItem,InputItem,Radio,Button,WhiteSpace,Checkbox,Accordion } from 'antd-mobile';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import Placeholder from 'rn-placeholder';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
moment.updateLocale('zh-cn',momentLocale);
const RadioItem = Radio.RadioItem;

class AssignedTask extends Component{
    constructor(props){
        super(props);
        this.state={
            dateModal:false,
            formData:{
                task_type:'',
                to_uid:'',
                customer_id:'',
                task_mark:'',
                execution_time:'',
                is_jpush:0,
                is_sms:0
            },
            showform:{
                task_type:'',
                to_uid:'',
                customer_id:'',
                execution_time:'',
            }
        }
    }
    onChangeTypes = (item) => {
        this.setState({
          formData:{
              ...this.state.formData,
              task_type:item.value
          },
          showform:{
              ...this.state.showform,
              task_type:item.title
          }
        });
      };
    onChangeCustomer = (item) => {
        this.setState({
            formData:{
                ...this.state.formData,
                customer_id:item.id
            },
            showform:{
                ...this.state.showform,
                customer_id:item.cname
            }
        });
    };
    inputOnChange = (value)=>{
        this.setState({
           formData:{
              ...this.state.formData,
              customer_id:value
          },
          showform:{
              ...this.state.showform,
              customer_id:value
          }
        });
    }
    onChangeTo = (item) => {
       this.setState({
            formData:{
                ...this.state.formData,
                to_uid:item.id
            },
        });
    };

    submitFeedBack = ()=>{
        //进行验证
        Util.post(Urls.Submit_task,this.state.formData,
        (respJson) =>{
            if (respJson.code == 1){
                Toast.success(respJson.msg);
                this.props.navigation.goBack();
            }else{
                Toast.fail(respJson.msg);
            }
        },
        (error)=>{
            console.log(error);
        }
    )
    }
    componentDidMount(){
        this.props.dispatch(getFormOptions());
    }
    _handleDatePicked = (date)=>{
        let now = new Date();
        if (now >= date){
            Toast.fail('任务时间只能大于当前时间');
            this._hideDateTimePicker();
            return false;
        }
        this.setState({
           formData:{
              ...this.state.formData,
              execution_time:date.getTime()/1000
          },
          showform:{
              ...this.state.showform,
              execution_time:moment(date).calendar()
          }
        });
        this._hideDateTimePicker();
    }
    _hideDateTimePicker = ()=>{
        this.setState({dateModal:false})
    }
    render(){
        const {navigation,tasks} = this.props;
        const { formOptions } = tasks;
        const { task_type,to_uid,customer_id } = this.state.formData;
        // if(tasks.form_status == false) return <View></View>
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title='指派任务' leftView={<NavigationBar.BackButton  onPress={()=>{navigation.goBack()}}/>} rightView={<Text style={{color:'#fff',fontSize:14,marginRight:10}}>完成</Text>}/>
                </View>
                <ScrollView style={{flex:1,marginTop:68}}>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                        style={{marginBottom:5}}
                    >
                    <List renderHeader={() => '任务类型'}>
                        <Accordion defaultActiveKey={null} activeKey={null} >
                            <Accordion.Panel header={this.state.showform.task_type == '' ? "选择任务类型":this.state.showform.task_type}>
                                <List>
                                {formOptions.types.map(i => (
                                    <RadioItem key={i.value} checked={task_type === i.value} onChange={()=>this.onChangeTypes(i)}
                                    >
                                        {i.title}
                                    </RadioItem>
                                ))}
                                </List> 
                            </Accordion.Panel>
                        </Accordion>
                    </List>
                    </Placeholder.ImageContent>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <List renderHeader={() => '相关客户'}>
                        <Accordion defaultActiveKey={null} activeKey={null} >
                            <Accordion.Panel header={this.state.showform.customer_id == '' ? "选择相关的客户(非必填项)" : this.state.showform.customer_id}>
                                <List renderHeader={'显示最近10个用户,显示数目可在公司设置里调整'}>
                                    <InputItem
                                        placeholder="如果有手动输入,以手动输入为准"
                                        onChange={this.inputOnChange}
                                    />
                                {formOptions.customer_list.map(i => (
                                    <RadioItem key={i.id} checked={customer_id === i.id} onChange={() => this.onChangeCustomer(i)}>
                                        {i.cname}  <Text style={{fontSize:12,color:'#cecece',marginLeft:50}}>---录入人:{i.input_name}</Text>
                                    </RadioItem>
                                ))}
                                </List>
                            </Accordion.Panel>
                        </Accordion>
                    </List>
                    </Placeholder.ImageContent>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <List renderHeader={() => '指派目标'}>
                        <View>
                        {formOptions.user_list.map(i => (
                             <RadioItem key={i.id} checked={to_uid === i.id} onChange={() => this.onChangeTo(i)}>
                                <View style={{flexDirection: 'row'}}>
                                    <View>
                                    <Image source={i.avatar_path ? {uri:i.avatar_path}: require('../constants/images/头像.png')}
                                    style={{height:26,width:26,borderRadius:13}}/>
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:18,color:'#000'}}>{i.nickname}</Text>
                                    </View>
                                </View>
                            </RadioItem>
                        ))}
                        </View> 
                    </List>
                    </Placeholder.ImageContent>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <List renderHeader={() => '任务说明'}>
                        <TextareaItem
                            rows={5}
                            count={300}
                            onChange={value=>{
                                this.setState({
                                    formData:{
                                        ...this.state.formData,
                                        task_mark:value
                                    }
                                })
                            }}
                        />
                    </List>
                    </Placeholder.ImageContent>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <List renderHeader={() => '执行时间'}>
                        <List.Item arrow="horizontal"
                            onClick={()=>{this.setState({dateModal:true})}}
                            extra={this.state.showform.execution_time}
                        >日期-时间</List.Item>
                        <DateTimePicker
                            mode={'datetime'}
                            datePickerModeAndroid={'calendar'}
                            isVisible={this.state.dateModal}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </List>
                     </Placeholder.ImageContent>
                     <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <List renderHeader={() => '推送方式'}>
                        <Checkbox.CheckboxItem onChange={(e) => {
                            let checked = e.target.checked;
                                this.setState({
                                    formData:{
                                         ...this.state.formData,
                                        is_jpush:checked?1:0
                                    }
                                })
                            }}>
                            APP推送
                        </Checkbox.CheckboxItem>
                        <Checkbox.CheckboxItem key="disabled"  disabled defaultChecked multipleLine
                            onChange={(e) => {
                            let checked = e.target.checked;
                                this.setState({
                                    formData:{
                                         ...this.state.formData,
                                        is_sms:checked?1:0
                                    }
                                })
                            }}
                        >
                        短信推送<List.Item.Brief>您公司账户余额不足,无法使用</List.Item.Brief>
                        </Checkbox.CheckboxItem>
                    </List>
                    </Placeholder.ImageContent>
                    <WhiteSpace size="lg"/>
                      <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={!tasks.form_loading}
                    >
                    <Button style={{height:40,marginLeft:10,marginRight:10}} type="primary" 
                        onClick={this.submitFeedBack}
                    >
                    <Text style={{fontSize:14}}>指派</Text>
                    </Button>
                     </Placeholder.ImageContent>
                    <WhiteSpace size="lg"/>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        localConfigReducer: state.localConfigReducer,
        tasks: state.tasksReducer,
    }
}
export default connect(mapStateToProps)(AssignedTask);