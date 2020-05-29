import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';

export default class NewStatusApp extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text> New </Text>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
