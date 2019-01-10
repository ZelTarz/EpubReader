import React from 'react';
import EpubReader from './readingScene/EpubRender'
import HomeScreen from './homeScene/Home'
import AccountManager from './loginScene/Account'
import LoggedOut from './loginScene/LogIn'
import { createBottomTabNavigator } from 'react-navigation';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <EntypoIcon name = 'home' size={35} color = {tintColor}></EntypoIcon>
            )
        }
    },
    LibraryScreen: {
        screen: AccountManager,
        navigationOptions:{
            tabBarLabel: 'Library',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcon name = 'library' size={35} color = {tintColor}></MaterialCommunityIcon>
            )
        }
    },
    AccountScreen: {
        screen: AccountManager,
        navigationOptions:{
            tabBarLabel: 'Account',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcon name = 'account' size={35} color = {tintColor}></MaterialCommunityIcon>
            )
        }
    }
  },
  {
    tabBarOptions:{
        activeTintColor: '#9999ff',
        inactiveTintColor: 'black',
        showLabel: true,
        showIcon: true,
        style: {
          backgroundColor: '#ffffff',
        },
      },
  });