import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Logo from '../../component/logo';
import Button from '../../component/button';
import Divider from '../../component/divider';
import {getAsyncStorage, keys} from '../../asyncStorage/index';
import {setUniqueValue} from '../../utility/constants/index';

export default function Splash({navigation}) {
  useEffect(() => {
    console.log('Key Id: ' + keys.uuid);
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then(uuid => {
          console.log(uuid);
          if (uuid) {
            setUniqueValue(uuid);
            navigation.navigate('TabBottom');
          } else {
            navigation.navigate('Splash');
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          navigation.navigate('Splash');
        });
    }, 2000);
    return () => clearTimeout(redirect);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text
        style={{
          fontSize: 28,
          color: '#f57f17',
          fontWeight: '700',
        }}>
        Welcome to Social App
      </Text>
      <Text style={{fontSize: 16, marginBottom: 30}}>
        Wish you have a great experience
      </Text>
      <View>
        <Button
          onPress={() => navigation.navigate('Login')}
          color1="#FF512F"
          color2="#F09819"
          color3="#FF512F"
          title="Sign In"
        />
      </View>

      <Divider />
      <View>
        <Button
          onPress={() => navigation.navigate('SignUp')}
          color1="#FDFC47"
          color2="#24FE41"
          color3="#3CA55C"
          title="Sign Up"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
