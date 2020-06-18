import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default ({onPress, name, title, color, size}) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.btnGoBack}>
      <Icon name={`${name}`} color={`${color}`} size={size} />
    </TouchableOpacity>
    <Text style={styles.txtTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  btnGoBack: {
    marginLeft: 16,
    marginTop: Platform.OS == 'ios' ? 4 : 8,
    marginBottom: 8,
  },
  txtTitle: {
    fontSize: 28,
    marginLeft: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#f57f17',
  },
});
