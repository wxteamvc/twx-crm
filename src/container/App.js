import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeTab from './HomeTab';
import Lead from '../pages/Lead';
import EditModules from '../pages/EditModules';

const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
    },
    EditModules: {
        screen: EditModules,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
    })


export default App;