import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import HomeTab from './HomeTab';
import Lead from '../pages/LeadView';
import EditModules from '../pages/EditModules';
import CustomerList from '../pages/CustomerListView';
import CustomerInfo from '../pages/CustomerInfoView';
import CompanyList from '../pages/CompanyListView';
import Login from '../pages/LoginView';
import Agreement from '../pages/AgreementView';



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
            headerStyle: {
                backgroundColor: '#40a9ff'
            }
        }),
    },
    CustomerInfo: {
        screen: CustomerInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
            // headerStyle:{
            //     backgroundColor:'#40a9ff',
            // },
        }),

    },
    CompanyList: {
        screen: CompanyList,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#40a9ff'
            }
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Agreement:{
        screen: Agreement,
        navigationOptions: ({ navigation }) => ({
            headerTitle:'用户服务协议',
            headerStyle:{
                backgroundColor:'#40a9ff'
            },
        }),
    },
}, 
{
     transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        transitionSpec: {
          duration: 250,
          easing: Easing.ease,
          timing: Animated.timing,
        },
  }),
}
)


export default App;