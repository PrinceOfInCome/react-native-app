import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {BubblesLoader} from 'react-native-indicators';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {firebaseApp} from '../api/firebaseConfig';
import {loginUserSuccess} from '../action/AuthAction';
import * as firebase from 'firebase';
import Loading from '../component/ModelLoad';
class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: '', load: false};
  }
  navigationOptions = {
    headerShown: false,
  };
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Login user

  onLogin = () => {
    const {email, password} = this.state;
    let errorName = 'Please enter your information !';
    this.setState({load: true});
    if (email == null || email == '') {
      this.setState({error: errorName});
      this.setState({load: false});

      return;
    } else if (password == null || password == '') {
      this.setState({error: errorName});
      this.setState({load: false});
      return;
    } else if (!this.validateEmail(email)) {
      let errorEmail = 'Invalid field E-mail !';
      this.setState({error: errorEmail});
      this.setState({load: false});
      return;
    } else {
      this.setState({error: ''});
      console.log('Value ' + email, password);
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log('LoginSuccess: ' + user);

          this.props.loginUserSuccess(user);
          this.props.navigation.navigate('Home');
          this.setState({load: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({load: false});
          Alert.alert(
            'Alert ',
            'Error: ' + error.message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        });
    }
  };

//   navigate(routeName) {
//     this.props.navigator.push({
//       name: routeName,
//     });
//   }
//   componentWillMount() {
//     this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
//       if (!user) {
//         this.navigate('register');
//       }
//     });
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }

  componentDidMount() {
    console.log(
      'componentDidMount: ' + JSON.stringify(this.props.auth.isLogin),
    );
    // firebaseApp.auth().onAuthStateChanged(function(user) {
    //   console.log('User: ', user);
    //   if (user) {
    //     this.props.navigation.navigate('Home');
    //   } else {
    //     this.props.navigation.navigate('Login');
    //   }
    // });
  }

  // Login Facebook

  onLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      const tokenData = await AccessToken.getCurrentAccessToken();
      const token = tokenData.accessToken.toString();
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const user = await firebaseApp.auth().signInWithCredential(credential);

      firebaseApp
        .database()
        .ref(`user/profile`)
        .push({
          userName: user.user.displayName,
          image: user.user.photoURL,
          phone: user.user.phoneNumber,
          email: user.user.email,
          following: 0,
          followers: 0,
          permission: false,
        });
      this.props.navigation.navigate('Home');
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {load} = this.state;
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
        <Text style={styles.txtTitle}>Sing In</Text>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.edtInputEmail}
            placeholder="E-mail !"
            keyboardType="email-address"
            onChangeText={email => this.setState({email: email})}
          />

          <TextInput
            style={styles.edtInputPass}
            placeholder="Password !"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={pass => this.setState({password: pass})}
          />
        </View>
        <Text style={styles.txtError}>{this.state.error}</Text>
        <View style={styles.viewInput}>
          <TouchableOpacity onPress={this.onLogin} style={styles.btnLogin}>
            <Text style={{fontSize: 16, color: 'white'}}>Log In</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity
            onPress={this.onLoginFacebook}
            style={styles.btnfacebook}>
            <Text style={{fontSize: 16, color: 'white'}}>
              Login With Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <Loading modalVisible={load} animationType="fade" />
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
    marginLeft: 16,
    marginTop: Platform.OS == 'ios' ? 50 : 20,
    marginBottom: 20,
  },
  txtTitle: {
    fontSize: 24,
    color: '#f57f17',
    marginLeft: 24,
    fontWeight: 'bold',
    marginBottom: 70,
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
    alignSelf: 'center',
    alignItems: 'center',
    width: 200,
  },
  viewInput: {alignSelf: 'center'},
  btnLogin: {
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
  txtError: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    marginBottom: 30,
  },
});
const mapStateToProps = state => {
  console.log('mapStateToProps : ' + JSON.stringify(state));
  return {
    auth: state.auth,
    // logged: state.auth.loggedIn,
    // user: state.auth.user,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatching action
  loginUserSuccess: user => dispatch(loginUserSuccess(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginApp);
