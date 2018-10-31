import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import WeatherScreen from './screens/WeatherScreen';
import ToDoList from './screens/ToDoList';

export default createStackNavigator(
    {
        LoginScreen: LoginScreen,
        MainScreen: createBottomTabNavigator({
            WeatherScreen: {
                screen: WeatherScreen,
                navigationOptions: {
                    tabBarIcon: () => (
                        <Icon
                            name='sun'
                            type='feather'
                            color='#517fa4'
                            size={24}
                        />
                    ),
                }
            },
            ToDoList: {
                screen: ToDoList,
                navigationOptions: {
                    tabBarIcon: () => (
                        <Icon
                            name='ios-list'
                            type='ionicon'
                            color='#000000'
                            size={40}
                            style={{ marginBottom: 10 }}
                        />
                    ),
                }
            },
        }),
    },
    {
        initialRouteName: 'LoginScreen',
    }
);
