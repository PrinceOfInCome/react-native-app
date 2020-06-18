import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../container/home';
import Splash from '../container/splash';
import Chat from '../container/chat';
import Dashboard from '../container/dashboard';
import Login from '../container/login';
import SignUp from '../container/signUp';
import TabBottomNavigation from '../navigation/tabNavigator/TabBottomNavigation';
import Profile from '../container/profile';
import ShowFullImg from '../container/showFullimg';
import SendChat from '../container/sendChat';
const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="TabBottom"
          component={TabBottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowImg"
          component={ShowFullImg}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendChat"
          component={SendChat}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
