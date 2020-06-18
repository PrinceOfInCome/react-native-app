import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default ({onPress, title, color1, color2, color3}) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 2}}
      colors={[`${color1}`, `${color2}`, `${color3}`]}
      style={styles.linearGradient}>
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  linearGradient: {
    width: 270,
    height: 49,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
});
