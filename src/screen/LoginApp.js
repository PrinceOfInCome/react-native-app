import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {BubblesLoader} from 'react-native-indicators';
import {loginUser} from '../action/AuthAction';

class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: ''};
  }
  static navigationOptions = {
    headerShown: false,
  };
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  onLogin = () => {
    const {email, password} = this.state;
    let errorName = 'Please enter your information !';
    if (email == null || email == '') {
      this.setState({error: errorName});
      return;
    } else if (password == null || password == '') {
      this.setState({error: errorName});
      return;
    } else if (!this.validateEmail(email)) {
      let errorEmail = 'Invalid field E-mail !';
      this.setState({error: errorEmail});
      return;
    } else {
      this.props.loginUser(email, password);
    }
    //console.log('Value ' + email, password, this.props.auth.loading);
    // this.props.navigation.navigate('Home');
  };
  componentDidMount() {
    console.log('componentDidMount: ' + JSON.stringify(this.props));
  }

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
    if (this.props.auth.loading) {
      return <BubblesLoader />;
    } else {
      return (
        <View style={styles.viewInput}>
          <TouchableOpacity onPress={this.onLogin} style={styles.btnLogin}>
            <Text style={{fontSize: 16, color: 'white'}}>Log In</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.btnfacebook}>
            <Text style={{fontSize: 16, color: 'white'}}>
              Login With Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUpPhone')}
            style={{marginTop: 30}}>
            <Text style={{fontSize: 16, color: '#f57f17', alignSelf: 'center'}}>
              Login with phone number
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
            keyboardType="email-address"
            onChangeText={pass => this.setState({password: pass})}
          />
        </View>
        <Text style={styles.txtError}>
          {this.props.auth.errorLogin}
          {this.state.error}
        </Text>
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
export default connect(mapStateToProps,{loginUser},)(LoginApp);
