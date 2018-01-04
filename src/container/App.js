import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Home from '../pages/Home';
import Lead from '../pages/Lead';
import EditModules from '../pages/EditModules';

const App = StackNavigator({
    // Lead:{
    //     screen: Lead,
    //     navigationOptions: ({ navigation })=>({
    //         header:null
    //     })
    // },
    Home:{
        screen: Home,
        navigationOptions: ({ navigation })=>({
            header:null
        })
    },
    EditModules:{
        screen: EditModules,
        navigationOptions: ({ navigation })=>({
            header:null
        })
    }
})

export default App;