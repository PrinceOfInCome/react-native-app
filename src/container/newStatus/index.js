import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function NewStatus() {
  return (
    <SafeAreaView styles={styles.container}>
      <Text>NewStatus</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
