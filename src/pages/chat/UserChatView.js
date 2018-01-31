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
import RNFS from 'react-native-fs';
import { NavigationBar,Toast } from 'teaset';
import IMUI from 'aurora-imui-react-native';
import * as Urls from "../../constants/urls";
import Util from "../../constants/util";


var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')
const getInputTextEvent = "getInputText"
const MessageListDidLoadEvent = "IMUIMessageListDidLoad"

var themsgid = 1

function constructNormalMessage() {

  let message = {}
  message.msgId = themsgid.toString()
  themsgid += 1
  message.status = "send_going"   //send_going 正在发送 send_succeed发送成功 send_failed发送消息失败
  message.isOutgoing = true
  message.timeString = ""
  var user = {
    userId: "",
    displayName: "我的名字",
    avatarPath: "ironman"
  }
  user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
  message.fromUser = user

  return message
}

class CustomVew extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (<img src={`${RNFS.MainBundlePath}/default_header.png`}></img>)
  }
}

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

    AuroraIController.removeMessageListDidLoadListener(MessageListDidLoadEvent)
  }

  componentDidMount() {
    const { chatWith } = this.props.navigation.state.params;
    const { chatList } = this.props;
    console.log(chatList)
    if (chatList[chatWith]){
      let newChatList = chatList[chatWith].slice(-10);
      newChatList.reverse();
      let messageList = [];
      newChatList.map((data,index)=>{
        var message = constructNormalMessage();
        message.msgId = data.id;
        message.status = 'send_succeed';
        message.isOutgoing = false;
        message.text = data.msg;
        message.fromUser.avatarPath = data.avatar;
        message.fromUser.userId = data.from.toString();
        message.fromUser.displayName = data.to_name;
        message.msgType = data.type;
        messageList.push(message);
      })
      AuroraIController.insertMessagesToTop(messageList);
    }

    this.resetMenu()
    AuroraIController.addMessageListDidLoadListener(() => {
      this.getHistoryMessage()
    });
  }
  componentDidUpdate() {
    const { chatWith } = this.props.navigation.state.params;
    const { chatList} = this.props;
    if(chatList.newMessage != null){
      const { data } = chatList.newMessage;
      console.log(data)
      if (chatWith == chatList.newMessage.target){
        var message = constructNormalMessage();
        message.msgId = data.id;
        message.status = 'send_succeed';
        message.isOutgoing = false;
        message.text = data.msg;
        message.fromUser.avatarPath = data.avatar;
        message.fromUser.userId = data.from.toString();
        message.fromUser.displayName = data.to_name;
        message.msgType = data.type;
        AuroraIController.appendMessages([message])
      }
    }
  }
  //页面初始化的时候执行 ---- 获取历史消息在这边
  getHistoryMessage() {
    var messages = []
    // for (var i = 0; i < 1; i++) {
    //   var message = constructNormalMessage()
    //   // message.msgType = "text"
    //   // message.text = "" + i
    //   // if (i%2 == 0)  {
    //   //   message.isOutgoing = false
    //   // }
    //   var message = constructNormalMessage()
    //   message.msgType = 'text'

    //   if (Platform.OS === "ios") {
    //     message.content = `
    //     <h5>This is a custom message. </h5>
    //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
    //     `
    //   } else {
    //     message.content = `<h5>This is a custom message. </h5>
    //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>`
    //   }
    //   message.contentSize = { 'height': 100, 'width': 200 }
    //   message.extras = { "extras": "fdfsf" }
    //   AuroraIController.appendMessages([message])
    //   AuroraIController.scrollToBottom(true)

    //   AuroraIController.insertMessagesToTop([message])
    // }
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
    console.log(message)
      //这边应该写点击重发
      alert('消息重发，如果消息发送就把状态改成send_succeed')
    message.status = 'send_succeed'
    AuroraIController.updateMessage(message)
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
    console.log("on pull to refresh")
    // var messages = []
    // for (var i = 0; i < 5; i++) {
    //   var message = constructNormalMessage()
    //   // if (index%2 == 0) {
    //   message.msgType = "text"
    //   message.text = "" + i
    //   // }

    //   if (i % 3 == 0) {
    //     message.msgType = "event"
    //     message.text = "" + i
    //   }

    //   AuroraIController.insertMessagesToTop([message])
    // }
    // // AuroraIController.insertMessagesToTop(messages)
    // this.refs["MessageList"].refreshComplete()
  }

  onSendText = (text) => {
    const { chatWith } = this.props.navigation.state.params;
    let message = constructNormalMessage()
    message.msgType = 'text'
    message.text = text
    AuroraIController.appendMessages([message])
    //构造对象存储
    Util.post(Urls.SendMsg_url+"/text",{to:chatWith,msg:text},
      (respJson) =>{
          if (respJson.code == 1){
            // message.msgId = respJson.data;
            let newMsg = Object.assign({},message)
              newMsg.status = "send_successed";
              AuroraIController.updateMessage(newMsg)
          }else{
            Toast.message(respJson.msg)
          }
      },
      (error)=>{
         console.log(error.message);
      } 
    )
  }

  onTakePicture = (mediaPath) => {

    // var message = constructNormalMessage()
    // message.msgType = 'image'
    // message.mediaPath = mediaPath
    // AuroraIController.appendMessages([message])
    // this.resetMenu()
    // AuroraIController.scrollToBottom(true)
  }

  onStartRecordVoice = (e) => {
    console.log("on start record voice")
  }

  onFinishRecordVoice = (mediaPath, duration) => {
    // var message = constructNormalMessage()
    // message.msgType = "voice"
    // message.mediaPath = mediaPath
    // message.timeString = "safsdfa"
    // message.duration = duration
    // AuroraIController.appendMessages([message])
  }

  onCancelRecordVoice = () => {
    console.log("on cancel record voice")
  }

  onStartRecordVideo = () => {
    console.log("on start record video")
  }

  onFinishRecordVideo = (mediaPath, duration) => {
    // var message = constructNormalMessage()

    // message.msgType = "video"
    // message.mediaPath = mediaPath
    // message.duration = duration
    // AuroraIController.appendMessages([message])
  }

  onSendGalleryFiles = (mediaFiles) => {
    /**
     * WARN: This callback will return original image, 
     * if insert it directly will high memory usage and blocking UI。
     * You should crop the picture before insert to messageList。
     * 
     * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
     * 应该做裁剪操作后再插入到 messageListView 中，
     * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
     * 
     * 代码用例不做裁剪操作。
     */
    // for (index in mediaFiles) {
    //   var message = constructNormalMessage()
    //   if (mediaFiles[index].mediaType == "image") {
    //     message.msgType = "image"
    //   } else {
    //     message.msgType = "video"
    //     message.duration = mediaFiles[index].duration
    //   }
      
    //   message.mediaPath = mediaFiles[index].mediaPath
    //   message.timeString = "8:00"
    //   AuroraIController.appendMessages([message])
    //   AuroraIController.scrollToBottom(true)
    // }
    // this.resetMenu()
  }

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true)
  }
  onSwitchToGalleryMode = () => {
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
        <View style={this.state.navigationBar}
          ref="NavigatorView">
         
          {/* <Button
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
          </Button> */}
        </View>
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
          sendBubbleTextSize={14}
          sendBubbleTextColor={"#000000"}
          sendBubblePadding={{ left: 10, top: 10, right: 15, bottom: 10 }}
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