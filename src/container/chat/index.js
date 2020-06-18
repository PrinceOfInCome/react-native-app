import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../api/config';
import {Store} from '../../context/store';
import {uuid} from '../../utility/constants';
import TabUser from '../../component/tabUser';
import {LOADING_STOP, LOADING_START} from '../../context/action/type';
var {width, height} = Dimensions.get('window');

export default function Chat({navigation}) {
  const globalState = useContext(Store);
  const {dispatchLoaderStateAction} = globalState;
  
  const [userDetail, setUserDetail] = useState({
    id: '',
    userName: '',
    profileImg: '',
  });
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const {profileImg, userName, id} = userDetail;

  useEffect(() => {
    dispatchLoaderStateAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref('users')
        .on('value', dataSnapshot => {
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
          };
          dataSnapshot.forEach(child => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.userName = child.val().userName;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                userName: child.val().userName,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          console.log('IMG: ' + JSON.stringify(userDetail));
          dispatchLoaderStateAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderStateAction({
        type: LOADING_STOP,
      });
    }
  }, []);
  /// on tab user

  const onTabUser = async (profileImg, userName, guestUserId) => {
    navigation.navigate('SendChat', {
      userName,
      guestUserId,
      currentUser: uuid,
      profileImg,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btnGoBack}>
          {profileImg ? (
            <Image
              style={styles.avatar}
              source={
                //   require('../../image/mystery.jpg')
                // this.state.img.status == true
                //   ? {uri: this.state.img.imgAvatar}
                //   : this.state.img.imgAvatar
                {uri: profileImg}
              }
              style={{width: 45, height: 45, borderRadius: 100, marginLeft: 16}}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require('../../image/orig.jpg')}
              style={{width: 45, height: 45, borderRadius: 100, marginLeft: 16}}
            />
          )}

          <Text style={{fontSize: 22, fontWeight: '700', marginLeft: 16}}>
            Chat
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('TabBottom')}
          style={{
            fontSize: 16,
            position: 'absolute',
            right: 16,
            alignSelf: 'center',
          }}>
          Back
        </Text>
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <Icon
            style={{position: 'absolute', right: 73, alignSelf: 'center'}}
            name="md-person-add"
            size={30}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          width: width - 32,
          height: 50,
          backgroundColor: '#EEEEEE',
          marginLeft: 16,
          borderRadius: 100,
          marginTop: 16,
          flexDirection: 'row',
          marginBottom: 16,
          alignItems: 'center',
        }}>
        <Icon
          style={{marginLeft: 16}}
          name="ios-search"
          size={30}
          color="#999"
        />
        <Text style={{fontSize: 16, color: '#999', marginLeft: 16}}>
          Search
        </Text>
      </TouchableOpacity>

      <FlatList
        data={allUsers}
        renderItem={({item}) => (
          <TabUser
            img={
              item.profileImg
                ? item.profileImg
                : 'https://profilepics.cf.kik.com/XFq422X04i2vw6Q2PIA84S1OhDw/orig.jpg'
            }
            userName={item.userName}
            onPress={() => {
              onTabUser(item.profileImg, item.userName, item.id);
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnGoBack: {
    width: width,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnChat: {
    width: width - 32,
    height: 60,
    flexDirection: 'row',
    marginTop: 16,
  },
});
