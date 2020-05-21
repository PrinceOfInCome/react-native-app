import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashApp from '../screen/SplashApp';
import LoginApp from '../screen/LoginApp';
import ProfileApp from '../screen/ProfileApp';
import SettingApp from '../screen/SettingApp';
import SignUpApp from '../screen/SignUpApp';
import HomeApp from '../screen/HomeApp';
import SignUpPhoneApp from '../screen/SignUpPhoneApp';
const AppNavigator = createStackNavigator(
  {
    Splash: SplashApp,
    Login: LoginApp,
    SignUp: SignUpApp,
    Home: HomeApp,
    Profile: ProfileApp,
    SettingApp: SettingApp,
    SignUpPhone: SignUpPhoneApp,
  },
  {
    initialRouteName: 'SignUp',
  },
);
export default createAppContainer(AppNavigator);
