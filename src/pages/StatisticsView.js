import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { NavigationBar, Toast } from 'teaset';
import { connect } from 'react-redux';
import Echarts from 'native-echarts';
import { ScreenWidth } from '../constants/global';

class Statistics extends Component {
    render() {
        let { initData } = this.props;
        const option = {
            tooltip: {},
            legend: {
                data: ['衬衫']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子",]
            },
            yAxis: {},
            series: [
                // {
                //     name: '销量',
                //     type: 'pie',
                //     data: [{ name: '衬衫', value: 500 }, { name: '羊毛衫', value: 600 }, { name: '雪纺衫', value: 700 }, { name: '裤子', value: 800 }, { name: '高跟鞋', value: 900 }, { name: '袜子', value: 1000 }],
                   
                // },
                {
                    name: '种类',
                    type: 'bar',
                    data: [20, 30, 40, 50, 60, 70]
                },
            ]
        };
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar title='公司统计'
                    leftView={<NavigationBar.BackButton
                        onPress={() => { navigation.goBack() }} />}
                />
                <View style={{ marginTop: 68, flex: 1 }}>
                    <Echarts option={option} height={300} width={ScreenWidth} />
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
export default connect(mapStateToProps)(Statistics);