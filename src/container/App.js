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
import BindTel from '../pages/BindTelView';
import FeedBack from '../pages/FeedBackView';
import ChangePassword from '../pages/ChangePasswordView';
import RepayView from '../pages/RepayView';
import Tasks from '../pages/TasksView';
import AssignedTask from '../pages/AssignedTaskView';
import TaskList from '../pages/TaskListView';
import CompanyHome from '../pages/CompanyHomeView';
import UserChat from '../pages/chat/UserChatView';
import ImageView from '../pages/ImageView';
import Authentication from '../pages/AuthenticationView';
import CompanyEdit from '../pages/CompanyEditView';
import CompanyAuthentication from '../pages/CompanyAuthenticationView';
import CompanySetting from '../pages/CompanySettingView';
import CompanyHomeSetting from '../pages/CompanyHomeSettingView';
import Staff from '../pages/StaffView';


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
    SetUserInfo: {
        screen: SetUserInfo,
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
    Repay: {
        screen: RepayView,
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
    },
    BindTel: {
        screen: BindTel,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    FeedBack: {
        screen: FeedBack,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Tasks: {
        screen: Tasks,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    TaskList: {
        screen: TaskList,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    AssignedTask: {
        screen: AssignedTask,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    CompanyHome: {
        screen: CompanyHome,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    UserChat: {
        screen: UserChat,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ImageView: {
        screen: ImageView,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
    },
    Authentication: {
        screen: Authentication,
        navigationOptions: ({ navigation }) => {
            return ({
            })
        }
    },
    CompanyEdit: {
        screen: CompanyEdit,
        navigationOptions: ({ navigation }) => {
            return ({
            })
        }
    },
    CompanyAuthentication: {
        screen: CompanyAuthentication,
        navigationOptions: ({ navigation }) => {
            return ({
            })
        }
    },

    
    CompanySetting: {
        screen: CompanySetting,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
    },
    CompanyHomeSetting: {
        screen: CompanyHomeSetting,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
    },
    Staff: {
        screen: Staff,
        navigationOptions: ({ navigation }) => {
            return ({
                header: null
            })
        }
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