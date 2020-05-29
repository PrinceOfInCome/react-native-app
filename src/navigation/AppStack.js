import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashApp from '../screen/SplashApp';
import LoginApp from '../screen/LoginApp';
import ProfileApp from '../screen/ProfileApp';
import SettingApp from '../screen/SettingApp';
import SignUpApp from '../screen/SignUpApp';
import HomeApp from '../screen/HomeApp';
import SignUpPhoneApp from '../screen/SignUpPhoneApp';
import VerifyCode from '../screen/VerifyCode';
import {navigationRef} from './RootNavigator';
import TabNavigation from './Tab/TabNavigation';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="App"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={SplashApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpApp}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Setting" component={SettingApp} />
        <Stack.Screen
          name="Login"
          component={LoginApp}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={ProfileApp} />
        <Stack.Screen
          name="SignUpPhone"
          component={SignUpPhoneApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verify"
          component={VerifyCode}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
