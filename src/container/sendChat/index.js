import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from '../../utility/constants/index';
import {SendMsg, ReceiverMsg} from '../../network/messenger';
import firebase from '../../api/config';
import ImagePicker from 'react-native-image-picker';
import ChatBox from '../../component/chatBox';
export default function SendChat({navigation, route}) {
  const {params} = route;
  const {userName, profileImg, guestUserId, currentUser} = params;
  const [msgValue, setMsgValue] = useState('');
  const [messenger, setMessenger] = useState([]);

  useEffect(() => {
    console.log('Params: ' + userName, profileImg, guestUserId, currentUser);
    try {
      firebase
        .database()
        .ref('messenger')
        .child(currentUser)
        .child(guestUserId)
        .on('value', dataSnapShop => {
          let msgs = [];
          dataSnapShop.forEach(child => {
            console.log('Chid: ', child);
            msgs.push({
              sendBy: child.val().messenger.sender,
              receivedBy: child.val().messenger.receiver,
              msg: child.val().messenger.msg,
              profileImg: child.val().messenger.profileImg,
            });
          });

          setMessenger(msgs);

          console.log('Data: ' + JSON.stringify(messenger));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const options = {
    storageOptions: {
      skipBackup: true,
    },
  };
  const handleCamera = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Base 64 image:
        let source = 'data:image/jpeg;base64,' + response.data;
      }
    });
  };
  const handleSendMessenger = () => {
    setMsgValue('');
    if (msgValue) {
      SendMsg(msgValue, currentUser, guestUserId, '')
        .then(() => {})
        .catch(error => {
          console.log(error);
          alert(error);
        });
      ReceiverMsg(msgValue, currentUser, guestUserId, '')
        .then(() => {})
        .catch(error => {
          console.log(error);
          alert(error);
        });
    }
  };
  const handleChangeText = text => {
    setMsgValue(text);
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerChat}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Icon name="md-arrow-back" size={32} color="orange" />
            </TouchableOpacity>
            <View style={styles.viewImg}>
              {profileImg ? (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 1000,
                  }}
                  source={{uri: profileImg}}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={{width: 40, height: 40, borderRadius: 1000}}
                  source={require('../../image/orig.jpg')}
                  resizeMode="cover"
                />
              )}
            </View>

            <Text style={{fontSize: 16, fontWeight: '700'}}>{userName}</Text>
            <TouchableOpacity style={{position: 'absolute', right: 114}}>
              <Icon name="md-call" size={28} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', right: 62}}>
              <Icon name="ios-videocam" size={28} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', right: 16}}>
              <Icon name="ios-information-circle" size={28} color="orange" />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.flatList}
            inverted
            data={messenger}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <ChatBox messenger={item.msg} profileImg={item.profileImg} />
            )}
          />
          <View style={styles.viewSend}>
            <TouchableOpacity
              style={{marginLeft: 16, marginRight: 8}}
              onPress={() => handleCamera()}>
              <Icon name="ios-camera" size={40} color="orange" />
            </TouchableOpacity>
            <TextInput
              style={styles.inputMess}
              placeholder="Enter your messenger !"
              placeholderTextColor="#777"
              numberOfLines={10}
              value={msgValue}
              onChangeText={text => handleChangeText(text)}
            />

            <TouchableOpacity
              style={{marginLeft: 8, marginRight: 16}}
              onPress={() => handleSendMessenger()}>
              <Icon name="md-send" size={32} color="orange" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerChat: {
    height: 50,
    flexDirection: 'row',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  viewImg: {
    marginLeft: 16,
    marginRight: 16,
  },
  viewSend: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
  },
  inputMess: {
    height: 45,
    width: 305,
    borderRadius: 100,
    color: '#222',
    backgroundColor: '#EEEEEE',
    paddingLeft: 20,
    fontSize: 16,
  },
  flatList: {
    marginBottom: 30,
  },
});
