import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
var {width, height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class VerifyCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number_1: '',
      number_2: '',
      number_3: '',
      number_4: '',
      number_5: '',
      number_6: '',
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  onVerifyCode = () => {
    const {
      number_1,
      number_2,
      number_3,
      number_4,
      number_5,
      number_6,
    } = this.state;

    let number =
      number_1 + number_2 + number_3 + number_4 + number_5 + number_6;
    console.log('Code: ' + number);
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.btngoback}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUpPhone')}>
            <Icon name="ios-arrow-back" color="#f57f17" size={32} />
          </TouchableOpacity>

          <Text style={styles.verifyaccount}>Verify account</Text>
        </View>

        <Text style={styles.enterverify}>Enter Auth Code</Text>
        <View style={styles.viewinput}>
          <TextInput
            style={styles.inputnumber}
            returnKeyType="next"
            ref="input_1"
            maxLength={1}
            numberOfLines={1}
            blurOnSubmit={false}
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_1: number});
              if (number) this.refs.input_2.focus();
            }}
          />
          <TextInput
            style={styles.inputnumber}
            returnKeyType="next"
            ref="input_2"
            maxLength={1}
            numberOfLines={1}
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_2: number});
              if (number) this.refs.input_3.focus();
            }}
          />
          <TextInput
            style={styles.inputnumber}
            ref="input_3"
            maxLength={1}
            numberOfLines={1}
            blurOnSubmit={false}
            returnKeyType="next"
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_3: number});
              if (number) this.refs.input_4.focus();
            }}
          />
          <TextInput
            style={styles.inputnumber}
            returnKeyType="next"
            ref="input_4"
            maxLength={1}
            numberOfLines={1}
            blurOnSubmit={false}
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_4: number});
              if (number) this.refs.input_5.focus();
            }}
          />
          <TextInput
            style={styles.inputnumber}
            returnKeyType="next"
            ref="input_5"
            maxLength={1}
            numberOfLines={1}
            blurOnSubmit={false}
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_5: number});
              if (number) this.refs.input_6.focus();
            }}
          />
          <TextInput
            style={styles.inputnumber}
            ref="input_6"
            maxLength={1}
            numberOfLines={1}
            blurOnSubmit={false}
            returnKeyType="go"
            keyboardType="numeric"
            onChangeText={number => {
              this.setState({number_6: number});
            }}
          />
        </View>

        <TouchableOpacity style={styles.btnVerify} onPress={this.onVerifyCode}>
          <Text style={{fontSize: 16, color: 'white'}}>Continue</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 14, alignSelf: 'center', marginTop: 30}}>
          Resend in 00.30 seconds
        </Text>
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
    marginLeft: 32,
    marginTop: Platform.OS == 'ios' ? 0 : 16,
    flexDirection: 'row',
  },
  verifyaccount: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#f57f17',
    marginLeft: width / 5,
    fontWeight: '700',
  },
  enterverify: {
    fontSize: 18,
    color: '#f57f17',
    marginTop: 30,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 20,
  },
  viewinput: {
    flexDirection: 'row',
    marginLeft: 32,
    marginRight: 32,
  },
  inputnumber: {
    borderRadius: 5,
    borderColor: 'rgb(184,184,184)',
    width: 50,
    height: 50,
    borderWidth: 2,
    fontSize: 24,
    marginRight: 10,
    paddingLeft: 20,
  },
  btnVerify: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 49,
    fontSize: 16,
    borderRadius: 999,
    backgroundColor: '#f57f17',
    alignSelf: 'center',
    marginTop: 70,
  },
});
