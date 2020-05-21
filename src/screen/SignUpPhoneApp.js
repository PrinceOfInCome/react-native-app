import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class SignUpPhoneApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    headerShown: false,
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
      <View style={styles.container}>
        <TouchableOpacity style={styles.btngoback}>
          <Icon name="ios-arrow-back" color="#f57f17" size={32} />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Sing In</Text>
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
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={{fontSize: 16, color: 'white'}}>Log In</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.btnfacebook}>
          <Text style={{fontSize: 16, color: 'white'}}>
            Login With Facebook
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 200,
  },
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
});
