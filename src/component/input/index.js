import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numberOfLines,
  keyboardType,
  returnKeyType,
}) => (
  <TextInput
    style={styles.inputText}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    numberOfLines={numberOfLines}
    keyboardType={keyboardType}
    returnKeyType={returnKeyType}
  />
);

const styles = StyleSheet.create({
  inputText: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 30,
    fontSize: 16,
  },
});
