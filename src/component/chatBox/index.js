import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import {uuid} from '../../utility/constants';
var {width, height} = Dimensions.get('window');
export default ({
  profileImg,
  messenger,
  date,
  onLongPress,
  userId,
  img,
  onPress,
}) => {
  let isCurrentUser = userId === uuid ? true : false;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewAvatar}>
          <TouchableOpacity style={{marginRight: 8}}>
            {profileImg ? (
              <Image
                style={styles.avatar}
                source={{uri: profileImg}}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  marginLeft: 16,
                }}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('../../image/orig.jpg')}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  marginLeft: 16,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        {profileImg ? (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{uri: img}}
              resizeMode="cover"
              style={{height: 200, width: width / 2}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.viewMsg,
              {
                width: width / 2 + 10,
                alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
              },
            ]}>
            <TouchableWithoutFeedback onLongPress={onLongPress}>
              <Text style={[styles.txtMsg, isCurrentUser && {color: 'white'}]}>
                {messenger}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      <Text style={styles.txtDate}>{date}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  txtDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 16,
    alignSelf: 'center',
  },
  viewMsg: {
    backgroundColor: '#EEEEEE',
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  txtMsg: {
    fontSize: 16,
    marginLeft: 16,
    paddingTop: 15,
  },
  viewAvatar: {
    alignSelf: 'flex-end',
  },
});
