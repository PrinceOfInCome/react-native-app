import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function NotifiCation() {
  return (
    <SafeAreaView styles={styles.container}>
      <Text>NotifiCation</Text>
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
