import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Image} from 'react-native';
import React, {Component} from 'react';
import HomeApp from '../../screen/HomeApp';
import SettingApp from '../../screen/SettingApp';
import MessengerApp from '../../screen/MessengerApp';
import NewStatusApp from '../../screen/NewStatusApp';
import ProfileApp from '../../screen/ProfileApp';

export default class TabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeApp}
          options={{
            tabBarIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/home.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Messenger"
          component={MessengerApp}
          options={{
            tabBarIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/search.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="New"
          component={NewStatusApp}
          options={{
            tabBarIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/plus.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileApp}
          options={{
            tabBarIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/user.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingApp}
          options={{
            tabBarIcon: () => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/settings.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
