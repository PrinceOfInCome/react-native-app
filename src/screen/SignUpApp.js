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
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {createUser} from '../action/AuthAction';
import {BubblesLoader} from 'react-native-indicators';

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
  componentDidMount() {
    console.log('componentDidMount: ' + this.props.data);
  }
  onSignUp = () => {
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
    } else {
      console.log('OK' + email, password);
      this.props.navigation.navigate('Login');
      this.props.createUser(email, password);
    }
  };
  renderButtons() {
    const Divider = props => {
      return (
        <View {...props}>
          <View style={styles.line} />
          <Text style={styles.textOr}> OR</Text>
          <View style={styles.line} />
        </View>
      );
    };
    if (this.props.data.loading) {
      return <BubblesLoader />;
    } else {
      return (
        <View style={styles.viewInput}>
          <TouchableOpacity
            onPress={this.onSignUp.bind(this)}
            style={styles.btnSignUp}>
            <Text style={{fontSize: 16, color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.btnPhoneNumber}>
            <Text style={{fontSize: 16, color: '#f57f17'}}>
              Create With Phone Number
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Splash')}
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
            keyboardType="default"
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
            placeholder="Password !"
            keyboardType="default"
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={confirm => this.setState({confirmPassword: confirm})}
          />
        </View>
        {this.renderButtons()}
      </View>
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
    top: Platform.OS == 'ios' ? 100 : 70,
    fontWeight: 'bold',
  },
  createimg: {
    top: Platform.OS == 'ios' ? 160 : 130,
    position: 'absolute',
    alignSelf: 'center',
  },
  imgcreateimg: {
    width: 100,
    height: 100,
    borderRadius: 10000,
  },
  btnCamera: {
    backgroundColor: '#ddd',
    width: 35,
    height: 35,
    position: 'absolute',
    top: 65,
    left: 75,
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
    marginTop: 20,
    marginBottom: 20,
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
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#f57f17',
    backgroundColor: 'white',
  },
  edtInputFirstName: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
    marginTop: 280,
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

const mapStateToProps = state => {
  console.log('mapStateToProps : ' + JSON.stringify(state));
  return {
    data: state.authentication,
    // logged: state.auth.loggedIn,
    // user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  {createUser},
)(SignUp);
