import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default ({}) => (
  <View style={styles.divider}>
    <View style={styles.line} />
    <Text style={styles.textOr}> OR</Text>
    <View style={styles.line} />
  </View>
);
const styles = StyleSheet.create({
  line: {
    height: 1,
    flex: 1,
    backgroundColor: 'black',
  },
  textOr: {
    textAlign: 'center',
  },
  divider: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
});
