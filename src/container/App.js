import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { StackNavigator,TabNavigator } from 'react-navigation';
import HomeTab from './HomeTab';

const App = StackNavigator({
    HomeTab:{
        screen: HomeTab,
        navigationOptions: ({ navigation }) => {
            return ({
                    header: null
                })
        }

    }
})

export default App;