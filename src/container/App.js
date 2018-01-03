import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Home from '../pages/Home';

const App = StackNavigator({
    Home:{
        screen: Home
    }
})

export default App;