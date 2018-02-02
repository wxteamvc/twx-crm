import React, { Component } from 'react';
import ReactNative ,{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules,
  requireNativeComponent,
  Alert,
  Dimensions,
  Button,
  DeviceEventEmitter,
  Platform,
  PixelRatio,
  PermissionsAndroid,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux';
import { NavigationBar,Toast } from 'teaset';
import IMUI from 'aurora-imui-react-native';
import * as Urls from "../../constants/urls";
import Util from "../../constants/util";
import { getScopeHistory } from "../../actions/myChatAction"
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
moment.updateLocale('zh-cn',momentLocale);

var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')
const getInputTextEvent = "getInputText"
const MessageListDidLoadEvent = "IMUIMessageListDidLoad"

var themsgid = 1


class UserChat extends Component {
  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === "ios") {
      initHeight = 86
    } else {
      initHeight = 100
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: {flex: 1, width: window.width, margin: 0},
      inputViewLayout: { width: window.width, height: initHeight, },
      isAllowPullToRefresh: true,
      navigationBar: {}
    }
    this.updateLayout = this.updateLayout.bind(this);
  }

  componentWillUnmount() {
    AuroraIController.removeMessageListDidLoadListener(this.getHistoryMessage)
  }

  componentDidMount() {
    this.props.dispatch({
      type:'cleanChat'
    })
    this.begin = 0;
    this.resetMenu()
    AuroraIController.addMessageListDidLoadListener(
      this.getHistoryMessage
    );
  }
  componentDidUpdate() {
    const { chatWith } = this.props.navigation.state.params;
    const { chatList } = this.props;
    const { newMessage } = chatList;
    if(chatList.newMessage != null && chatWith == newMessage.data.from ){
      const { data } = chatList.newMessage;
      var message = this.constructNormalMessage(data);
      AuroraIController.appendMessages([message])
    }
  }

  onSendText = (text) => {
    let message = this.constructNormalMessage({msg:text})
    AuroraIController.appendMessages([message])
    this.sendMsg(message);
  }

  onSendGalleryFiles = (mediaFiles) => {
    for (index in mediaFiles) {
      if (mediaFiles[index].mediaType == "image") {
        var message = this.constructNormalMessage({type:"image",mediaPath:mediaFiles[index].mediaPath})
        
      } else {
         var message = this.constructNormalMessage({type:"video",duration:mediaFiles[index].duration,mediaPath:mediaFiles[index].mediaPath})
      }
      AuroraIController.appendMessages([message])
      this.sendMsg(message,mediaFiles[index].mediaType);
      AuroraIController.scrollToBottom(true)
    }
    this.resetMenu()
  }

  onTakePicture = (mediaPath) => {
    var message = this.constructNormalMessage({type:'image',mediaPath})
    AuroraIController.appendMessages([message])
    this.sendMsg(message,'image');
    this.resetMenu()
    AuroraIController.scrollToBottom(true)
  }

  onFinishRecordVoice = (mediaPath, duration) => {
    var message = this.constructNormalMessage({type:"voice",mediaPath,duration})
    this.sendMsg(message,'voice');
    AuroraIController.appendMessages([message])
  }

  sendMsg = (message,type='text')=>{
    const { chatWith } = this.props.navigation.state.params;
    let newMsg = Object.assign({},message)
    let sendData = {};
    let media = {};
    switch(type){
      case 'image':
        media = {uri: `file://${message.mediaPath}`, type: 'multipart/form-data', name: message.mediaPath.substring(message.mediaPath.lastIndexOf("/")+1)};
        sendData={
          to:chatWith,
          media
        }
      break;
    case 'voice':
      media = {uri: `file://${message.mediaPath}`, type: 'multipart/form-data', name: message.mediaPath.substring(message.mediaPath.lastIndexOf("/")+1)};
      sendData={
        to:chatWith,
        duration:message.duration,
        media
      }
    break;
      default:
        sendData={
          to:chatWith,
          msg:message.text
        }
      break;
    }
    Util.post(Urls.SendMsg_url+"/"+type,sendData,
      (respJson) =>{
        console.log(respJson)
          if (respJson.code == 1){
              newMsg.status = "send_successed";
          }else{
            newMsg.status = "send_failed";
            Toast.message(respJson.msg)
          }
          AuroraIController.updateMessage(newMsg)
      },
      (error)=>{
        newMsg.status = "send_failed";
        AuroraIController.updateMessage(newMsg)
      } 
    )
  }
  constructNormalMessage = (data={}) =>{
      const { info } = this.props.userInfo;
      let message = {}
      message.msgId = data.id ?  data.id:themsgid.toString();
      themsgid += 1
      message.status = data.status ? data.status:"send_going";   //send_going send_succeed send_failed
      message.isOutgoing = (info.id != data.to) ? true :false;
      message.msgType = data.type ? data.type :'text';
      if (message.msgType == 'event_time'){
        message.msgType = 'event';
        message.text = moment(data.msg*1000).calendar();
      }else if(message.msgType=='image'){
        message.mediaPath = data.mediaPath;
      }else if(message.msgType=='video'){
        message.duration = parseFloat(data.duration);
        message.mediaPath = data.mediaPath;
      }else if(message.msgType=='voice'){
        message.duration = parseFloat(data.duration);
        message.mediaPath = data.mediaPath;
      }else{
        message.text = data.msg.toString();
      }
      message.timeString = ""
      var user = {
        userId: message.isOutgoing ? info.id.toString() : data.to,
        displayName: message.isOutgoing ? info.nickname :data.to_name,
        avatarPath: "ironman"
      }
      if (message.isOutgoing){
        user.avatarPath = info.avatar_path ? info.avatar_path : '/default_header.png'
      }else{
        user.avatarPath = data.avatar ? data.avatar : '/default_header.png'
      }
      message.fromUser = user
      return message
    }



  //页面初始化的时候执行 ---- 获取历史消息在这边
  getHistoryMessage = ()=> {
    const { chatWith } = this.props.navigation.state.params;
    const { chatList } = this.props;
    console.log(chatList)
    if (chatList[chatWith]){
        let historyChatList = chatList[chatWith].slice(this.begin,this.begin+10);
        historyChatList.map((data,index)=>{
          var message = this.constructNormalMessage(data);
          AuroraIController.insertMessagesToTop([message]);
          this.begin > 0 ? false:AuroraIController.scrollToBottom(true)
        })
        this.begin += historyChatList.length;
        let lastChat = chatList[chatWith][chatList[chatWith].length-1];
        if ((chatList[chatWith].length - this.begin) < 10){
          this.props.dispatch(getScopeHistory(chatWith,lastChat.id));
        }
    }else{
      this.props.dispatch(getScopeHistory(chatWith));
    }
  }



  onInputViewSizeChange = (size) => {
    if (this.state.inputLayoutHeight != size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: size.width, height: size.height },
        messageListLayout: { flex:1, width: window.width, margin: 0 }
      })
    }
  }

  resetMenu() {
    if (Platform.OS === "android") {
      this.refs["ChatInput"].showMenu(false)
      this.setState({
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
        navigationBar: { height: 64, justifyContent: 'center' },
      })
    } else {
      this.setState({
        inputViewLayout: { width: window.width, height: 86 }
      })
    }
  }

  onTouchEditText = () => {
    this.refs["ChatInput"].showMenu(false)
    this.setState({
      inputViewLayout: { width: window.width, height: this.state.inputLayoutHeight }
    })
    // if (this.state.shouldExpandMenuContainer) {
    //   console.log("on touch input, expend menu")
    //   this.expendMenu()
    // }
  }

  onFullScreen = () => {
    console.log("on full screen")
    this.setState({
      messageListLayout: { flex: 0, width: 0, height: 0 },
      inputViewLayout: { flex:1, width: window.width, height: window.height },
      navigationBar: { height: 0 }
    })
  }

  onRecoverScreen = () => {
    this.setState({
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { flex: 0, width: window.width, height: this.state.inputLayoutHeight },
      navigationBar: { height: 64, justifyContent: 'center' }
    })
  }

  //点击头像时处罚
  onAvatarClick = (message) => {

    AuroraIController.removeMessage(message.msgId) //删除message
  }

  onMsgClick = (message) => {
    console.log(message)
    Alert.alert("message", JSON.stringify(message))
  }

  onMsgLongClick = (message) => {
    Alert.alert('message bubble on long press', 'message bubble on long press')
  }

  onStatusViewClick = (message) => {
    this.sendMsg(message);
  }

  onBeginDragMessageList = () => {
    this.resetMenu()
    AuroraIController.hidenFeatureView(true)
  }

  onTouchMsgList = () => {
    AuroraIController.hidenFeatureView(true)
  }

  //上拉刷新消息-----也相当于获取以前的消息
  onPullToRefresh = () => {
    this.getHistoryMessage();
    this.refs["MessageList"].refreshComplete()
  }


  onStartRecordVoice = (e) => {
    console.log("on start record voice")
  }


  onCancelRecordVoice = () => {
    console.log("on cancel record voice")
  }

  onStartRecordVideo = () => {
    console.log("on start record video")
  }

  onFinishRecordVideo = (mediaPath, duration) => {
    var message = this.constructNormalMessage({type:"video",mediaPath,duration})
    AuroraIController.appendMessages([message])
  }

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true)
  }
  onSwitchToGalleryMode = () => {
    console.log(1)
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToCameraMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onShowKeyboard = (keyboard_height) => {
  }

  updateLayout(layout) {
    this.setState({ inputViewLayout: layout })
  }

  onInitPress() {
    console.log('on click init push ');
    this.updateAction();
  }

  onClickSelectAlbum = () => {
    console.log("on click select album")
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
            <StatusBar
            translucent={false}
            backgroundColor='#40a9ff'
            />
        {/* <View style={this.state.navigationBar}
          ref="NavigatorView">
           <Button
            style={styles.sendCustomBtn}
            title="Custom Message"
            onPress={() => {
              if (Platform.OS === 'ios') {
                var message = constructNormalMessage()
                message.msgType = 'custom'
                message.content = `
                <h5>This is a custom message . </h5>
                <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
                `
                console.log(message.content)
                message.contentSize = { 'height': 100, 'width': 200 }
                message.extras = { "extras": "fdfsf" }
                AuroraIController.appendMessages([message])
                AuroraIController.scrollToBottom(true)
              } else {
                var message = constructNormalMessage()
                message.msgType = "custom"
                message.msgId = "10"
                message.status = "send_going"
                message.isOutgoing = true
                message.content = `
                <body bgcolor="#ff3399">
                  <h5>This is a custom message. </h5>
                  <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img>
                </body>`
                message.contentSize = { 'height': 400, 'width': 400 }
                message.extras = { "extras": "fdfsf" }
                var user = {
                  userId: "1",
                  displayName: "",
                  avatarPath: ""
                }
                user.displayName = "0001"
                user.avatarPath = "ironman"
                message.fromUser = user
                AuroraIController.appendMessages([message]);
              }
            }}>
          </Button> 
        </View> */}
        <MessageListView style={this.state.messageListLayout}
          ref="MessageList"
          onAvatarClick={this.onAvatarClick}
          onMsgClick={this.onMsgClick}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
          avatarSize={{ width: 40, height: 40 }}
          sendBubbleTextSize={16}
          sendBubbleTextColor={"#000000"}
          sendBubblePadding={{ left: 10, top: 0, right: 15, bottom: 0 }}
        />
        <InputView style={this.state.inputViewLayout}
          ref="ChatInput"
          menuContainerHeight={this.state.menuContainerHeight}
          isDismissMenuContainer={this.state.isDismissMenuContainer}
          onSendText={this.onSendText}
          onTakePicture={this.onTakePicture}
          onStartRecordVoice={this.onStartRecordVoice}
          onFinishRecordVoice={this.onFinishRecordVoice}
          onCancelRecordVoice={this.onCancelRecordVoice}
          onStartRecordVideo={this.onStartRecordVideo}
          onFinishRecordVideo={this.onFinishRecordVideo}
          onSendGalleryFiles={this.onSendGalleryFiles}
          onSwitchToEmojiMode={this.onSwitchToEmojiMode}
          onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode={this.onSwitchToGalleryMode}
          onSwitchToCameraMode={this.onSwitchToCameraMode}
          onShowKeyboard={this.onShowKeyboard}
          onTouchEditText={this.onTouchEditText}
          onFullScreen={this.onFullScreen}
          onRecoverScreen={this.onRecoverScreen}
          onSizeChange={this.onInputViewSizeChange}
          showSelectAlbumBtn={true}
          onClickSelectAlbum={this.onClickSelectAlbum}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendCustomBtn: {

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputView: {
    backgroundColor: 'green',
    width: window.width,
    height: 100,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7'
  }
});

function mapStateToProps(state) {
    return {
        initInfo: state.initReducer,
        userInfo: state.personalReducer,
        chatList: state.myChatReducer,
    }
}

export default connect(mapStateToProps)(UserChat);