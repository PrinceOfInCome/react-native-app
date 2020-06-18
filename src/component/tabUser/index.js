import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
var {width, height} = Dimensions.get('window');

export default ({img, key_messenger, userName, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.btnChat}>
    <Image
      style={styles.imgUser}
      source={{uri: img}}
    />
    <View style={styles.viewChat}>
      <Text style={styles.txtName}>{userName}</Text>
      <Text style={styles.txtChat}>{key_messenger}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnChat: {
    width: width - 32,
    height: 60,
    flexDirection: 'row',
    marginTop: 16,
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 16,
    marginLeft: 16,
  },
  viewChat: {
    justifyContent: 'center',
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginRight: 16,
  },

  txtChat: {
    fontSize: 16,
    marginRight: 16,
  },
});
