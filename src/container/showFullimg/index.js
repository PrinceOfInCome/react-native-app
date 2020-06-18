import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/header';
import Icon from 'react-native-vector-icons/Ionicons';
var {width, height} = Dimensions.get('window');
export default function ShowFullImage({navigation, route}) {
  const {params} = route;
  const {userName, profileImg} = params;
  useEffect(() => {
    console.log('IMG: ' + profileImg);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            style={{marginLeft: 16, marginRight: 16}}
            name="ios-arrow-back"
            size={32}
            color="white"
          />
          <Text style={{color: 'white', fontSize: 16}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', right: 16}}>
          <Icon name="md-more" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewImg}>
        {profileImg ? (
          <Image
            style={{
              width: width,
              height: height / 2.5,
            }}
            source={{uri: profileImg}}
            resizeMode="cover"
          />
        ) : (
          <Image
            style={{width: width, height: height / 2.5}}
            source={require('../../image/orig.jpg')}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.txtName}>{userName}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtName: {
    fontSize: 18,
    color: 'white',
    left: 16,
    fontWeight: '700',
    position: 'absolute',
    bottom: 200,
  },
});
