import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class SplashApp extends Component {
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
        <Image style={styles.imageLogo} source={require('../image/logo.png')} />
        <Text
          style={{
            fontSize: 30,
            color: '#f57f17',
            fontWeight: '700',
          }}>
          Welcome to Social App
        </Text>
        <Text style={{fontSize: 16, marginBottom: 30}}>
          Wish you have a great experience
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.btnLogin}>
          <Text style={styles.txtLogin}>Log In</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.txtSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageLogo: {
    width: 300,
    height: 300,
    marginTop: 70,
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
    borderRadius: 999,
    backgroundColor: '#f57f17',
  },
  txtLogin: {
    color: 'white',
    fontSize: 16,
  },
  txtSignUp: {
    color: '#f57f17',
    fontSize: 16,
  },
  btnSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 49,
    borderRadius: 999,
    borderColor: '#f57f17',
    borderWidth: 1,
  },
});
