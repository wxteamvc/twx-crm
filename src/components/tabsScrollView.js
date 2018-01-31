/*
 *
 * 点击侧边栏跳转到相应位置ScrollView组件 
 * 
 * 
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Keyboard,
    ScrollView,
} from 'react-native';
import { styles } from '../constants/styles';
import { WhiteSpace, Icon, InputItem, Button, Tabs } from 'antd-mobile';
import { ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';

export default class TabsScrollView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            componentLayout: {},
            type: '',
            doOnScroll: true,
        }
    }

    componentDidMount() {
        const { data, initType } = this.props;
        this.initType = initType ? initType : 0;  //暂时不能设置初始在哪个页面
        this.keyList = [];
        for (const key in data) {
            this.keyList.push(data[key].key)
        }
        this.setState({ type: this.keyList[this.initType] })
    }


    gety = (e, type) => {
        this.setState({
            componentLayout: {
                ...this.state.componentLayout,
                [type]: {
                    y: e.layout.y,
                    h: e.layout.height
                }
            }
        })
    }

    onScroll = (e) => {
        if (this.state.doOnScroll) {
            const y = e.nativeEvent.contentOffset.y;
            const { componentLayout, type } = this.state;
            for (const key in componentLayout) {
                if (componentLayout[key].y <= y && y < componentLayout[key].y + componentLayout[key].h) {
                    if (type == key) return
                    this.setState({ type: key })
                }
            }
        } else {
            return
        }

    }

    scrollTo = (key) => {
        this.setState({ doOnScroll: false, type: key })
        this.scroll.scrollTo({ y: this.state.componentLayout[key].y })
    }



    renderContent = () => {
        const { data } = this.props;
        let leftList = [];
        let rightList = [];
        for (const key in data) {
            leftList.push(                 //渲染左边部分
                <TouchableOpacity key={key}
                    onPress={() => {
                        this.scrollTo(data[key].key)
                    }}
                    style={[styles.flex_center, { paddingTop: 10, paddingBottom: 10 }]}
                >
                    <Text style={[styles.fontsize12, { color: this.state.type == data[key].key ? '#000' : '#ccc' }]}>2018-1-25</Text>
                    <Text style={[styles.fontsize10, { color: this.state.type == data[key].key ? '#000' : '#ccc' }]}>({data[key].key})</Text>
                </TouchableOpacity>
            );

            rightList.push(             //渲染右边边部分
                <View
                    key={key}
                    onLayout={({ nativeEvent: e }) => this.gety(e, data[key].key)}
                >
                    <View style={{ padding: 10 }}>
                        <Text style={styles.fontsize12}>{data[key].key}</Text>
                    </View>
                    {this.renderList(data[key].data)}
                </View>
            )
        }
        return (
            <View style={[{ flex: 1, flexDirection: 'row', marginTop: 5 }]}>
                <View style={{ flex: 0.2, backgroundColor: '#fff' }}>
                    {leftList}
                </View>
                <View style={{ flex: 0.8, marginLeft: 5 }}>
                    <ScrollView
                        ref={(e) => this.scroll = e}
                        onScroll={(event) => this.onScroll(event)}
                        showsVerticalScrollIndicator={false}
                        onScrollBeginDrag={() => this.setState({ doOnScroll: true })}

                    >
                        {rightList}
                    </ScrollView>
                    <View style={{ padding: 10, position: 'absolute', top:0, zIndex: 99, width: ScreenWidth ,backgroundColor:'rgba(233,233,239,0.8)'}}>
                        <Text style={[styles.fontsize12,{color:'#000'}]}>{this.state.type}</Text>
                    </View>
                </View>
            </View>
        )

    }

    renderList = (data) => {   //渲染右边列表item
        let list = [];
        for (const key in data) {
            list.push(
                <TouchableOpacity
                    key={key}
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('OrderInfo', { order_id: data[key].order_id })}
                    style={{ padding: 10, backgroundColor: '#fff' }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.flex_center, { flex: 0.2 }]}>
                            <Image source={require('../constants/images/订单.png')} style={{ width: 40, height: 40 }} />
                        </View>
                        <View style={{ flex: 0.8, padding: 5,paddingLeft:15 }}>
                            <Text style={[styles.fontsize12, { color: '#000' }]}>单号:10000201801250001</Text>
                            <WhiteSpace size="xs" />
                            <Text style={styles.fontsize10}>客户姓名:冠希</Text>
                            <WhiteSpace size="xs" />
                            <Text style={styles.fontsize10}>身份证号:320555196605054562</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            list.push(
                <WhiteSpace size='sm' key={key + '_2'} />
            )
        }
        return (
            <View>
                {list}
            </View>
        );
    }

    render() {
        return (
            this.renderContent()
        )
    }

}