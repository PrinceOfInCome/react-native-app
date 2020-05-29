import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {createUserSuccess, createUserFail} from '../action/AuthAction';
import {BubblesLoader} from 'react-native-indicators';
import {firebaseApp} from '../api/firebaseConfig';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onSignUp = async () => {
    const {firstName, lastName, email, password, confirmPassword} = this.state;
    console.log(firstName, lastName, email, password, confirmPassword);

    if (
      firstName == '' ||
      firstName == null ||
      lastName == '' ||
      lastName == null ||
      email == '' ||
      email == null ||
      password == '' ||
      password == null ||
      confirmPassword == '' ||
      confirmPassword == null
    ) {
      Alert.alert('Alert', 'Please enter your information !', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => console.log('Install Pressed'),
        },
      ]);
      return;
    }
    if (!this.validateEmail(email)) {
      Alert.alert('Alert', 'Invalid field E-mail !', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => console.log('Install Pressed'),
        },
      ]);
      return;
    } else if (confirmPassword != password) {
      Alert.alert('Alert', "Those passwords didn't match. Try again.", [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => console.log('Install Pressed'),
        },
      ]);
      return;
    } else {
      let id = 1;
      console.log('True');
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log('Create Success: ', user);
          this.props.createUserSuccess(user);

          this.props.navigation.navigate('Login');

          firebaseApp
            .database()
            .ref(`user/profile`)
            .push({
              userName: firstName + lastName,
              email: email,
              password: password,
              following: 0,
              followers: 0,
              permission: false,
            });
        })
        .catch(error => {
          this.props.createUserFail(error);
          console.log('Eroor Creact Success: ', error.message);
          Alert.alert('Alert', error.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => console.log('Install Pressed'),
            },
          ]);
          return;
        });
      // this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.btngoback}>
          <Icon name="ios-arrow-back" color="#f57f17" size={32} />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Create new account</Text>
        <View style={styles.createimg}>
          <TouchableOpacity style={styles.btnCamera}>
            <Icon name="ios-camera" color="white" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.imgcreateimg}
              source={{
                uri:
                  'https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook-586x580.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>
          <TextInput
            style={styles.edtInputFirstName}
            placeholder="First Name !"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={first => this.setState({firstName: first})}
          />
          <TextInput
            style={styles.edtInputLastName}
            placeholder="Last Name !"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={last => this.setState({lastName: last})}
          />
          <TextInput
            style={styles.edtInputEmail}
            placeholder="E-mail !"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={email => this.setState({email: email})}
          />
          <TextInput
            style={styles.edtInputPass}
            placeholder="Password !"
            keyboardType="default"
            returnKeyType="next"
            secureTextEntry={true}
            onChangeText={pass => this.setState({password: pass})}
          />
          <TextInput
            style={styles.edtInputPass}
            placeholder="Confirm Password !"
            keyboardType="default"
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={confirm => this.setState({confirmPassword: confirm})}
          />
        </View>
        <View style={styles.viewInput}>
          <TouchableOpacity
            onPress={this.onSignUp.bind(this)}
            style={styles.btnSignUp}>
            <Text style={{fontSize: 16, color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  createimg: {
    top: Platform.OS == 'ios' ? 160 : 120,
    position: 'absolute',
    alignSelf: 'center',
  },
  imgcreateimg: {
    width: Platform.OS == 'ios' ? 100 : 90,
    height: Platform.OS == 'ios' ? 100 : 90,
    borderRadius: 10000,
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
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black',
  },
  textOr: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 20 : 10,
    marginBottom: Platform.OS == 'ios' ? 20 : 10,
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
  btnSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 49,
    fontSize: 16,
    borderRadius: 999,
    backgroundColor: '#f57f17',
  },
  btnPhoneNumber: {
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    width: 270,
    height: 49,
    borderRadius: 999,
    backgroundColor: 'rgb(1, 154, 235)',
  },
  edtInputFirstName: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
    marginTop: Platform.OS == 'ios' ? 260 : 250,
  },
  edtInputLastName: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
  },
  edtInputEmail: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
  },
  edtInputPass: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
  },
});

const mapDispatchToProps = dispatch => ({
  createUserSuccess: user => dispatch(createUserSuccess(user)),
  createUserFail: error => dispatch(createUserFail(error)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
