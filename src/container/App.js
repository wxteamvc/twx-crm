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
import Setting from '../pages/SettingView';
import SetUserInfo from '../pages/SetUserInfoView';
import Agreement from '../pages/AgreementView';
import GiftedFormModal from '../pages/GiftedFormModal';
import OrderInfo from '../pages/OrderInfoView';
import OrdersView from '../pages/OrdersView';

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
    OrderInfo: {
        screen: OrderInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    SetUserInfo:{
        screen:SetUserInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Setting: {
        screen: Setting,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Agreement: {
        screen: Agreement,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '用户服务协议',
            headerStyle: {
                backgroundColor: '#40a9ff'
            },
        }),
    },
    Orders: {
        screen: OrdersView,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#40a9ff'
            },
        }),
    }, 
    Modal: { 
        screen: GiftedFormModal,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
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