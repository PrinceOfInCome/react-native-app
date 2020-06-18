import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../component/header';
import EditText from '../../component/input';
import Button from '../../component/button';
import Divider from '../../component/divider';
import {LOADING_START, LOADING_STOP} from '../../context/action/type';
import {Store} from '../../context/store';
import LoginRequest from '../../network/login';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from '../../utility/constants/index';
export default function Login({navigation}) {
  const globalState = useContext(Store);
  const {dispatchLoaderStateAction} = globalState;

  const [credentials, setCredentials] = useState({email: '', password: ''});
  const {email, password} = credentials;

  // setState va gan gia tri c
  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  onLoginPress = () => {
    if (!email) {
      Alert.alert('Alert', 'Error: Email is required !', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!password) {
      Alert.alert('Alert', 'Error: Password is required !', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!validateEmail(email)) {
      Alert.alert('Alert', 'Error: Invalid field E-mail !', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      dispatchLoaderStateAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then(res => {
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderStateAction({
            type: LOADING_STOP,
          });

          navigation.navigate('TabBottom');
        })
        .catch(error => {
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
            title="Sign In"
            onPress={() => navigation.navigate('Splash')}
          />
          <ScrollView>
            <View style={styles.viewInput}>
              <EditText
                placeholder="E-mail"
                value={email}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={text => handleOnChange('email', text)}
              />
              <EditText
                placeholder="Password"
                keyboardType="default"
                value={password}
                returnKeyType="done"
                secureTextEntry={true}
                onChangeText={text => handleOnChange('password', text)}
              />
              <View style={styles.btnInput}>
                <Button
                  color1="#FF512F"
                  color2="#F09819"
                  color3="#FF512F"
                  title="Sign In"
                  onPress={() => onLoginPress()}
                />
                <View style={styles.divider}>
                  <Divider />
                </View>
                <Button
                  color1="#00c6ff"
                  color2="#0072ff"
                  color3="#00c6ff"
                  title="Login Width Facebook"
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
  viewInput: {
    alignItems: 'center',
    marginTop: 40,
  },
  btnInput: {
    alignSelf: 'center',
  },
  divider: {
    alignSelf: 'center',
  },
});
