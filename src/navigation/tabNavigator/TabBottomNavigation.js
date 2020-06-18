import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../container/home';
import Notification from '../../container/notification';
import Profile from '../../container/profile';
import NewStatus from '../../container/newStatus';
import Settings from '../../container/settings';
import {Dimensions, Platform} from 'react-native';
const Tab = createBottomTabNavigator();
var {width, height} = Dimensions.get('window');
function TabsBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      lazy={false}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#999',
        showLabel: false,
        tabStyle: {
          marginTop: Platform.OS == 'ios' ? 20 : 0,
        },

        style: {
          position: 'absolute',
          backgroundColor: 'white',
          width: width * 0.922,
          height: Platform.OS == 'ios' ? 90 : 70,
          borderBottomLeftRadius: 33,
          borderBottomRightRadius: 33,
          borderTopLeftRadius: Platform.OS == 'ios' ? 10 : 5,
          borderTopRightRadius: Platform.OS == 'ios' ? 10 : 5,
          bottom: Platform.OS == 'ios' ? 16 : 0,
          marginLeft: 16,
          shadowColor: '#000000',

          shadowOffset: {
            width: 0,
            height: 0.3,
          },
          shadowRadius: 7,
          shadowOpacity: 0.3,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-home"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotiFication"
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-notifications"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewStatus"
        component={NewStatus}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-add-circle-outline"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-person"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-settings"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default TabsBottomNavigation;
