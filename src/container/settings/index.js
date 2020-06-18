import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LogOutUser from '../../network/logout';
import {clearAsyncStorage} from '../../asyncStorage';

var {width, height} = Dimensions.get('window');
export default function Settings({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onLogoutUser = async () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.navigate('Splash');
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      });
  };
  onLogOuts = () => {
    console.log('On Log Out');
    Alert.alert('Log Out', 'Are you sure to log out ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          onLogoutUser();
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack}>
        <Text style={{fontSize: 22, fontWeight: '700', marginLeft: 16}}>
          Settings
        </Text>
      </TouchableOpacity>

      <View style={{margin: 16}}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            marginLeft: 16,
            marginBottom: 16,
            fontWeight: '600',
          }}>
          Account Details
        </Text>
        <View style={styles.viewAccount}>
          <TouchableOpacity style={styles.btnSettings}>
            <Icon
              style={{marginLeft: 16}}
              name="ios-mail"
              color="#777"
              size={30}
            />
            <Text style={styles.txtTitleSt}>E-mail </Text>
            <Text style={styles.txtSettings}>phantantrung@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSettings}>
            <Icon
              style={{marginLeft: 16}}
              name="ios-person"
              color="#777"
              size={30}
            />
            <Text style={styles.txtTitleSt}>Name </Text>
            <Text style={styles.txtSettings}>Phan Tấn Trung</Text>
            <MaterialIcons
              style={{position: 'absolute', right: 16}}
              name="edit"
              color="#777"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginLeft: 16}}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            marginLeft: 16,
            marginBottom: 16,
            fontWeight: '600',
          }}>
          Background
        </Text>
        <View style={styles.viewAccount}>
          <View style={styles.btnSwitch}>
            <Icon
              style={{marginLeft: 16}}
              name="ios-moon"
              color="#000"
              size={30}
            />

            <Text style={styles.txtTitleSt}>Dark mode </Text>
            <Switch
              style={{position: 'absolute', right: 16}}
              onValueChange={toggleSwitch}
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
            />
          </View>
        </View>
      </View>
      <View style={{margin: 16}}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            marginLeft: 16,
            marginBottom: 16,
            fontWeight: '600',
          }}>
          Regional
        </Text>
        <View style={styles.viewAccount}>
          <TouchableOpacity style={styles.btnSettings}>
            <Icon
              style={{marginLeft: 16}}
              name="ios-lock"
              color="#777"
              size={30}
            />
            <Text style={{fontSize: 16, marginLeft: 25}}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onLogOuts()}
            style={styles.btnSettings}>
            <Icon
              style={{marginLeft: 16}}
              name="ios-log-out"
              color="#777"
              size={30}
            />
            <Text style={{fontSize: 16, marginLeft: 20}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnGoBack: {
    width: width,
    height: 50,
    borderBottomColor: '#CCC',
    borderBottomWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewAccount: {},
  btnSettings: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#CCC',
    borderBottomWidth: 0.5,
    borderRadius: 10,
  },
  btnSwitch: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#CCC',
    borderBottomWidth: 0.5,
    borderRadius: 10,
    marginRight: 16,
  },
  txtTitleSt: {
    marginLeft: 16,
    fontSize: 18,
    color: '#000',
    fontWeight: '400',
    position: 'absolute',
    left: 46,
  },
  txtSettings: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
    position: 'absolute',
    left: 116,
  },
});
