import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {firebaseApp} from '../api/firebaseConfig';

export default class SignUpPhoneApp extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '+84 ',
      confirmResult: null,
      verifycationCode: '',
      userId: '',
    };
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };
  onSendCode = () => {
    const {phoneNumber} = this.state;
    let phone = '+84' + phoneNumber.slice(1);
    console.log(phone);

    //this.props.navigation.navigate('VerifycodeApp');
    // if (this.validatePhoneNumber()) {
    firebaseApp
      .auth()
      .signInWithPhoneNumber(phone)
      .then(confirmResult => {
        console.log('ConfirmResult: ' + confirmResult);
        this.setState({confirmResult});
      })
      .catch(error => {
        alert(error.message);

        console.log(error);
      });
    // } else {
    //   alert('Invalid Phone Number');
    // }
  };
  render() {
    const Divider = props => {
      return (
        <View {...props}>
          <View style={styles.line} />
          <Text style={styles.textOr}> OR</Text>
          <View style={styles.line} />
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Splash')}
          style={styles.btngoback}>
          <Icon name="ios-arrow-back" color="#f57f17" size={32} />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Create new account</Text>
        <Text style={styles.txtquestion}>What's your phone number ?</Text>
        <TextInput
          style={styles.edtPhoneNumber}
          placeholder="Phone number"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={phone => this.setState({phoneNumber: phone})}
        />

        <View style={styles.viewInput}>
          <TouchableOpacity
            style={styles.btnSendcode}
            onPress={this.onSendCode}>
            <Text style={{fontSize: 16, color: 'white'}}>Send code</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.btnfacebook}>
            <Text style={{fontSize: 16, color: 'white'}}>
              Login With facebook
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{fontSize: 16, color: '#f57f17'}}>
            Sign in width E-mail
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btngoback: {
    position: 'absolute',
    left: 16,
    top: Platform.OS == 'ios' ? 50 : 20,
  },
  txtTitle: {
    fontSize: 24,
    color: '#f57f17',
    position: 'absolute',
    left: 32,
    top: Platform.OS == 'ios' ? 100 : 60,
    fontWeight: 'bold',
  },
  txtquestion: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 150,
  },
  edtPhoneNumber: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  btnSendcode: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 49,
    fontSize: 16,
    borderRadius: 999,
    backgroundColor: '#f57f17',
  },
  btnfacebook: {
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    width: 270,
    height: 49,
    borderRadius: 999,
    backgroundColor: 'rgb(1, 154, 235)',
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black',
  },
  textOr: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },
  viewInput: {alignSelf: 'center'},
});
