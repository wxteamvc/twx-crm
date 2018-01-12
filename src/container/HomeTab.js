
/**
 * Home页面
 * 底部tabnavigation导航
 */
"use strict";

import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'antd-mobile';
import Home from '../pages/HomeView';
import Application from '../pages/ApplicationView';
import Statistics from '../pages/StatisticsView';
import Personal from '../pages/PersonalView';

 

const HomeTab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '工作首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon type={'\ue695'} size={20} color={tintColor} />
            ),

        }),
    },
    Application: {
        screen: Application,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '提交申请',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon type={'\uE625'} size={20} color={tintColor} />
            )
        }),
    },
    Statistics: {
        screen: Statistics,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '信用中心',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon type={'\uE6BE'} size={20} color={tintColor} />
            )
        }),
    },
    Personal: {
        screen: Personal,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '个人中心',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon type={'\uE6A8'} size={20} color={tintColor}/>
            )
        }),
    },
}, {
        // animationEnabled: false, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        // swipeEnabled: false, // 禁止左右滑动
        //backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        tabBarOptions: {
            activeTintColor: '#40a9ff', // 文字和图片选中颜色
            inactiveTintColor: '#000', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            showLabel: true,
            indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                height: 50,

            },
            labelStyle: {
                marginTop: 0,
                fontSize: 10
            },
            iconStyle: {
                marginTop: -5,
                width: 30,
                height: 30,
            },
            tabStyle: {
                //...
            }
        },
    });


export default HomeTab;