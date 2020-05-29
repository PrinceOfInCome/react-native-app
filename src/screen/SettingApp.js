import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  Button,
} from 'react-native';
import Loading from '../component/ModelLoad';
export default class SettingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
    };
  }

  onShowModal = () => {
    this.setState({load: true});
    setTimeout(() => {
      this.setState({load: false});
    }, 5000);
  };
  render() {
    const {load} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Show modal"
          backgroundColor="blue"
          onPress={this.onShowModal}
        />
        <Loading modalVisible={load} animationType="fade" />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
