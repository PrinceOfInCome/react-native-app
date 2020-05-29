import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/dist/Ionicons';
import TabNavigation from '../navigation/Tab/TabNavigation';

export default class HomeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#f57f17',
              marginLeft: 16,
            }}>
            Social Network
          </Text>
          <TouchableOpacity style={styles.search}>
            <Icon name="ios-search" size={30} color="#f57f17" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    width: width,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#DDD',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
  },
});
