import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/header';
import EditText from '../../component/input';
import Button from '../../component/button';
import firebase from '../../api/config';
import {Store} from '../../context/store';
import {LOADING_START, LOADING_STOP} from '../../context/action/type';
import signUpRequest from '../../network/signup';
import {AddUser} from '../../network/user';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from '../../utility/constants/index';
export default function SignUp({navigation}) {
  const globalState = useContext(Store);
  const {dispatchLoaderStateAction} = globalState;

  const [credentials, setCredentials] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm: '',
  });

  const {email, password, firstName, lastName, confirm} = credentials;

  handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  onSignUpPress = async () => {
    if (!email || !password || !firstName || !lastName || !confirm) {
      Alert.alert('Alert', 'Please enter your information ', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    } else if (!validateEmail(email)) {
      Alert.alert('Alert', 'Invalid field E-mail !', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    } else if (password != confirm) {
      Alert.alert('Alert', "Those passwords didn't match. Try again.", [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'Ok',
        },
      ]);
      return;
    } else {
      console.log('Hello: ', email, password);
      dispatchLoaderStateAction({
        type: LOADING_START,
      });
      signUpRequest(email, password)
        .then(res => {
          let uid = firebase.auth().currentUser.uid;
          let profileImg = '';
          let userName = firstName + ' ' + lastName;
          console.log('Then: ', email, password, uid);
          AddUser(uid, userName, email, password, profileImg)
            .then(() => {
              console.log('Next !');

              console.log('KEY: ' + keys.uuid);

              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderStateAction({
                type: LOADING_STOP,
              });
              navigation.navigate('Login');
            })
            .catch(err => {
              console.log('Error 1: ' + err.message);
              Alert.alert('Alert', err.message, [
                {
                  text: 'Ok',
                  onPress: () => {
                    dispatchLoaderStateAction({
                      type: LOADING_STOP,
                    });
                  },
                  style: 'Ok',
                },
              ]);
              return;
            });
        })
        .catch(error => {
          console.log('Error 2: ' + error.message);
          Alert.alert('Alert', error.message, [
            {
              text: 'Ok',
              onPress: () => {
                dispatchLoaderStateAction({
                  type: LOADING_STOP,
                });
              },
              style: 'Ok',
            },
          ]);
          return;
        });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Header
            name="ios-arrow-back"
            color="#f57f17"
            size={32}
            title="Create new account"
            onPress={() => navigation.navigate('Splash')}
          />
          <TouchableOpacity style={styles.createImg}>
            <View style={styles.btnCamera}>
              <Icon name="ios-camera" color="white" size={28} />
            </View>
            <Icon name="ios-add" color="orange" size={50} />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.viewInput}>
              <EditText
                placeholder="First name"
                value={firstName}
                keyboardType="default"
                returnKeyType="next"
                onChangeText={text => handleOnChange('firstName', text)}
              />
              <EditText
                placeholder="Last name"
                keyboardType="default"
                value={lastName}
                returnKeyType="next"
                onChangeText={text => handleOnChange('lastName', text)}
              />
              <EditText
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                returnKeyType="next"
                onChangeText={text => handleOnChange('email', text)}
              />
              <EditText
                placeholder="Password"
                keyboardType="default"
                value={password}
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={text => handleOnChange('password', text)}
              />
              <EditText
                placeholder="Confirm password"
                keyboardType="default"
                value={confirm}
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={text => handleOnChange('confirm', text)}
              />

              <View style={styles.btnInput}>
                <Button
                  color1="#FF512F"
                  color2="#F09819"
                  color3="#FF512F"
                  title="Sign Up"
                  onPress={() => onSignUpPress()}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createImg: {
    alignSelf: 'center',
    borderWidth: 1,
    width: Platform.OS == 'ios' ? 100 : 90,
    height: Platform.OS == 'ios' ? 100 : 90,
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#AAA',
  },
  imgCreateImgShow: {
    width: Platform.OS == 'ios' ? 100 : 90,
    height: Platform.OS == 'ios' ? 100 : 90,
    borderRadius: 10000,
  },
  imgCreateImg: {
    borderRadius: 10000,

    width: Platform.OS == 'ios' ? 40 : 30,
    height: Platform.OS == 'ios' ? 40 : 30,
  },
  btnCamera: {
    backgroundColor: '#ddd',
    width: 35,
    height: 35,
    position: 'absolute',
    top: Platform.OS == 'ios' ? 65 : 55,
    left: Platform.OS == 'ios' ? 75 : 65,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  viewInput: {
    alignSelf: 'center',
    marginTop: 30,
  },
  btnInput: {
    alignSelf: 'center',
  },
  divider: {
    alignSelf: 'center',
  },
});
