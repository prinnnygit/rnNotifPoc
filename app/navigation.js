import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { History } from './components/history/history';
import { Register } from './components/register/register';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

export const SimpleApp = StackNavigator(
    {
        Login: { screen: Login },
        Home: { screen: Home },
        History: { screen: History },
        Register: { screen: Register }
    },
    {
        transitionConfig: getSlideFromRightTransition
    });