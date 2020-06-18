import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';

export default ({}) => (
  <Image style={styles.image} source={require('../../image/logo.png')} />
);

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginTop: 70,
  },
});
