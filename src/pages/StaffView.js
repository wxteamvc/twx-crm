import React, { Component } from 'react';
import { View,ScrollView,Button,Text,StatusBar,Image,FlatList,TouchableWithoutFeedback,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationBar,Toast,ListRow,ActionSheet} from 'teaset';
import { List,WhiteSpace,Icon,SearchBar } from 'antd-mobile';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import Spinner from'react-native-spinkit';
import Modal from 'react-native-modalbox';

class Staff extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            status:false,
            data:null,
            modalStatus:false,
            modalData:null
        }
    }
    componentWillMount() {
       
    }
    componentDidMount() {
        this.setState({
            loading:true
        })
        Util.post(Urls.StaffList_url,{},
            (respJson) =>{
                if (respJson.code == 1){
                    this.setState({
                        loading:false,
                        status:true,
                        data:respJson.data
                    })
                }else{
                    this.setState({
                        loading:false,
                        status:false,
                    })
                    Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                this.setState({
                    loading:false,
                    status:false,
                })
                Toast.fail(error.message);
            }
        )
    }

    _renderItem = ({item})=>{
        const roleTitle = {
            3:'审核员',
            4:'录入员',
            5:'财务员',
            6:'业务员',
            7:'家访员',
            99:'普通员工'
        }
        return (
            <ListRow title={item.nickname} accessory={'none'}
                icon={ <Image source={item.avatar_path ? {uri:item.avatar_path}: require('../constants/images/头像.png')}style={{height:26,width:26,borderRadius:13,marginRight:5}}/>}
                detail={roleTitle[item.rid]}
                swipeActions={[
                    <ListRow.SwipeActionButton title='编辑' />,
                    <ListRow.SwipeActionButton title='删除' type='danger' onPress={() => alert('Remove')}/>,          
                ]}
            />
        )
    }
    searchUser = (value)=>{
        Util.post(Urls.SearchUser_url,{condition:value},
            (respJson) =>{
                if (respJson.code == 1){
                    this.setState({
                        modalData:respJson.data
                    })
                }else{
                    Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                Toast.fail(error.message);
            }
        )
    }
    addStaff = (id)=>{
        alert(id)
    }
    _renderModal = ()=>{
        return (
            <View style={{flex:1}}>
                <SearchBar placeholder="输入对方用户昵称/手机号码" maxLength={8} onCancel={()=>{
                    this.setState({modalStatus: false})
                    }}
                onSubmit={this.searchUser}
                />
                <FlatList
                    data={this.state.modalData}
                    keyExtractor={(item, index) => index}
                    renderItem={ ({item,index})=>
                    <ListRow title={item.nickname} accessory={'none'}
                    onPress={()=>{this.addStaff(item.id)}}
                    icon={ <Image source={item.avatar_path ? {uri:item.avatar_path}: require('../constants/images/头像.png')} style={{height:26,width:26,borderRadius:13,marginRight:5}}/>}
                    detail={item.tel ? `tel：${item.tel}` : '未绑定手机号码'}
                     />}
                />
            </View>
        )
    }

    render() {
        const { navigation,localConfigReducer} = this.props;
        return (
            <View style={{flex:1}}>
                <StatusBar
                translucent={false}
                backgroundColor='#40a9ff'
                />
                <View>
                    <NavigationBar title={'公司员工管理'} leftView={<NavigationBar.BackButton onPress={()=>{navigation.goBack()}}/>} 
                    rightView={
                        <TouchableWithoutFeedback
                            onPress={this._renderActionSheet}
                        >
                        <View style={{marginRight:5}}>
                            <Icon type={'ellipsis'} size={30} color={"#ccc"}/>
                        </View>
                        </TouchableWithoutFeedback>
                    }
                    />
                </View>
                <Modal
                isOpen={this.state.modalStatus}
                onClosed={() => this.setState({modalStatus: false})}
                style={styles.modal}
                position={"bottom"}
                ref={"modal1"}
                swipeToClose={true}>
                   {this._renderModal()}
              </Modal>
                <ScrollView  style={{flex:1,marginTop:68}}>
                    <List>
                        <ListRow title={'添加新员工'} accessory={'none'}
                        detail={
                            <TouchableWithoutFeedback onPress={()=>{this.refs.modal1.open()}}>
                                <Image source={require('../constants/images/加号-1.png')}  style={{width:30,height:30}} />
                            </TouchableWithoutFeedback>
                            }
                        />
                    </List>
                    <WhiteSpace size={'lg'}/>
                    {this.state.data ?
                    <List renderHeader={'员工列表 (滑动列表可编辑员工)'}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />
                    </List>:
                    <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
                        <Spinner size={50} isVisible={true}
                        color={'#40A9FF'}
                        type={'9CubeGrid'}
                        />
                    </View>
                    }
                    <WhiteSpace size={'lg'}/>
                </ScrollView> 
               
            </View>

        )
    }
}

const styles = StyleSheet.create({
    
      wrapper: {
        paddingTop: 50,
        flex: 1
      },
    
      modal: {
        height:300
      },    

      btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
      },
    
      btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
      },
    
      text: {
        color: "black",
        fontSize: 20
      }
    
    });

function mapStateToProps(state) {
    return {
        localConfigReducer:state.localConfigReducer,
    }
}

export default connect(mapStateToProps)(Staff);

