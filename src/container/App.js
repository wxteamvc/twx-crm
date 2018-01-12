import React, { Component } from 'react';
import { Animated,Easing} from 'react-native';
import { StackNavigator, TabNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import HomeTab from './HomeTab';
import Lead from '../pages/LeadView';
import EditModules from '../pages/EditModules';
import CustomerList from '../pages/CustomerListView';
import CustomerInfo from '../pages/CustomerInfoView';
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
    CustomerInfo: {
        screen: CustomerInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
            // headerStyle:{
            //     backgroundColor:'#40a9ff',
            // },
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