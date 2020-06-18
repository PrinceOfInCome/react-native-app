import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewAllMsg}>
        <View style={styles.viewAvatar}>
          <TouchableOpacity style={{marginLeft: 16, marginRight: 8}}>
            <Image
              style={styles.avatar}
              source={require('../../image/orig.jpg')}
              style={{width: 45, height: 45, borderRadius: 100, marginLeft: 16}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewMsg}>
          <TouchableWithoutFeedback>
            <Text style={styles.txtMsg}>
              Hi minh la chien dep trai chao cau Fall into You - Houses On The
              Hill (ACOUSTIC GROUP) Lyrics
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Text style={styles.txtDate}>25 TH1 LUC 19:28</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
	backgroundColor:'white'
  },
  viewAllMsg: {
    flexDirection: 'row',
  },
  txtDate: {
	fontSize: 12,
	color: '#888',
	marginTop: 16,
	alignSelf: 'center'
  },
  viewMsg: {
    backgroundColor: '#EEEEEE',
    width: 300,
    height: 50,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  txtMsg: {
    fontSize: 16,
    paddingBottom: 15,
    marginLeft: 16,
    paddingTop: 15,
  },
});
