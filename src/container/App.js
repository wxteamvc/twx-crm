import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeTab from './HomeTab';
import Lead from '../pages/LeadView';
import EditModules from '../pages/EditModules';
import CustomerList from '../pages/CustomerListView';
const App = StackNavigator({
    Lead: {
        screen: Lead,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
    },
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
    },
    CustomerList: {
        screen: CustomerList,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{
                backgroundColor:'#40a9ff'
            }
        })
    },
})


export default App;