import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView } from 'react-native';
import { Carousel } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global'
import { home_top } from '../constants/mock'
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';



export default class MenuItem extends Component {
    constructor(props) {
        super(props)
        this.carousel = this.props.carousel ? this.props.carousel : false; //是否用走马灯
        this.height = this.props.height ? this.props.height : 210         //走马灯高度
        this.lineItem = this.props.lineItem ? this.props.lineItem>5?5:this.props.lineItem: 4;     //一行放几个图标 默认4个
        this.imageSize = this.props.imageSize ? this.props.imageSize : 30; //图标大小 默认30
        this.pageLines = this.props.pageLines ? this.props.pageLines : 3   //如果启用走马灯每页放几行图标 默认3行
        this.data = [];
        for (const key in this.props.data) {
            this.data.push(
                this.props.data[key]
            )
        }
        this.lines = Math.ceil(this.data.length / this.lineItem);
    }


    renderMenuLine = () => {  //不使用走马灯
        let menuLines = [];
        for (let i = 0; i < this.lines ; i++) {
            menuLines.push(
                <View style={[styles.flex_row_columnCenter, { flex: 1, marginBottom: 20, marginTop: 20 }]} key={i}>
                    {this.renderItem(i)}
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {menuLines}
            </View>
        );
    }

    renderItem = (line) => {
        let lineItems = [];
        let key = '';
        let num = this.data.length - this.lineItem * line ;
        num = num >= this.lineItem ? this.lineItem : num;
        for (let i = 0; i < num; i++) {
            key = line  * this.lineItem + i;
            lineItems.push(
                <View style={[styles.flex_column_center, { flex: 1 / this.lineItem }]} key={key}>
                    <Image source={this.data[key].icon} style={{ width: this.imageSize, height: this.imageSize }} />
                    <View style={styles.flex_row_center}>
                        <Text style={[styles.fontsize12, { color: '#fff' }]}>{this.data[key].text}</Text>
                    </View>
                </View>
            )
        }
        return lineItems;
    }



    renderCarouselItem = () => {     //使用走马灯
        let CarouselItem = [];
        let page = Math.ceil(this.lines / this.pageLines)
        for (let i = 0; i < page ; i++) {
            CarouselItem.push(
                <View style={{ flex: 1, marginBottom: 20, marginTop: 20 }} key={i}>
                    {this.renderLine(i)}
                </View>
            )
        }
        return CarouselItem
    }

    renderLine = (page) => {   //渲染走马灯每页内容
        let menuLines = [];
        for (let k = 0; k < this.pageLines ; k++) {
            menuLines.push(
                <View style={[styles.flex_row_columnCenter, { flex: 1, marginBottom: 20, marginTop: 20 }]} key={k}>
                    {this.renderItem(page *this.pageLines+ k)}
                </View>
            )
        }
        return menuLines;
    }




    render() {
        if (this.carousel || this.lines > 4) {
            return (
                <Carousel style={{ height: this.height }}>
                    {this.renderCarouselItem()}
                </Carousel>
            )
        } else {
            return (
                this.renderMenuLine()
            )
        }

    }
}
