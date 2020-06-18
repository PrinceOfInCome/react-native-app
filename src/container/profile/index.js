import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {LOADING_START, LOADING_STOP} from '../../context/action/type';
import {Store} from '../../context/store';
import firebase from '../../api/config';
import {uuid} from '../../utility/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
var {width, height} = Dimensions.get('window');
import {setAsyncStorage, keys} from '../../asyncStorage';
import {UpdateUser, UpdateImgCover} from '../../network/user';
export default function Profile({navigation}) {
  const globalState = useContext(Store);
  const {dispatchLoaderStateAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    userName: '',
    profileImg: '',
    imgCover: '',
    dateCreate: '',
    followers: '',
    following: '',
    status: '',
  });
  const [allUser, setAllUser] = useState([]);
  const options = {
    storageOptions: {
      skipBackup: true,
    },
  };
  const {profileImg, userName, id} = userDetail;

  useEffect(() => {
    dispatchLoaderStateAction({
      type: LOADING_START,
    });
    console.log('KEY ID: ' + keys.uuid);
    console.log('KEY ID: ' + uuid);
    try {
      firebase
        .database()
        .ref('users')
        .on('value', dataSnapShot => {
          let users = [];
          let currentUser = {
            id: '',
            userName: '',
            profileImg: '',
            dateCreate: '',
            imgCover: '',
            followers: '',
            following: '',
            status: '',
          };
          dataSnapShot.forEach(child => {
            if (uuid === child.val().uuid) {
              (currentUser.id = uuid),
                (currentUser.userName = child.val().userName),
                (currentUser.profileImg = child.val().profileImg),
                (currentUser.dateCreate = child.val().dateCreate),
                (currentUser.followers = child.val().followers),
                (currentUser.following = child.val().following),
                (currentUser.imgCover = child.val().imgCover),
                (currentUser.status = child.val().status);
            } else {
              users.push({
                id: child.val().uuid,
                userName: child.val().userName,
                profileImg: child.val().profileImg,
                followers: child.val().followers,
                following: child.val().following,
                dateCreate: child.val().dateCreate,
                status: child.val().status,
                imgCover: child.val().imgCover,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUser(users);
          dispatchLoaderStateAction({
            type: LOADING_STOP,
          });
          console.log('All User: ' + allUser);
        });
    } catch (error) {
      dispatchLoaderStateAction({
        type: LOADING_STOP,
      });
      console.log(error);
      alert(error);
    }
  }, []);

  // changer img cover
  const onChangerImgCover = async () => {
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
        let sources = 'data:image/jpeg;base64,' + response.data;
        dispatchLoaderStateAction({
          type: LOADING_START,
        });
        UpdateImgCover(uuid, sources)
          .then(() => {
            setUserDetail({
              ...userDetail,
              imgCover: sources,
            });
            dispatchLoaderStateAction({
              type: LOADING_STOP,
            });
          })
          .catch(() => {
            alert(err);
            dispatchLoaderStateAction({
              type: LOADING_STOP,
            });
          });
      }
    });
  };

  // changer avatar
  const onChangerImg = async () => {
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
        dispatchLoaderStateAction({
          type: LOADING_START,
        });
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
            dispatchLoaderStateAction({
              type: LOADING_STOP,
            });
          })
          .catch(() => {
            alert(err);
            dispatchLoaderStateAction({
              type: LOADING_STOP,
            });
          });
      }
    });
  };
  // on show img

  onImgTab = async () => {
    console.log('hello');
    navigation.navigate('ShowImg', {
      profileImg: profileImg,
      userName: userName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 16,
            fontSize: 22,
          }}>
          Profile
        </Text>
      </View>
      <ScrollView>
        <View style={styles.imgCover}>
          <View>
            {userDetail.imgCover ? (
              <Image
                style={{width: width, height: 250}}
                source={{
                  uri: userDetail.imgCover,
                }}
              />
            ) : (
              <Image
                style={{width: width, height: 250}}
                source={require('../../image/imgCover.jpg')}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                onChangerImgCover();
              }}
              style={styles.imgAdd}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.imgAvatar}
            onPress={() => {
              onImgTab();
            }}>
            {/* <Image
                style={styles.avatar}
                source={
                  this.state.dataJSON.status == true
                    ? {uri: this.state.dataJSON.imgAvatar}
                    : this.state.dataJSON.imgAvatar
                }
              /> */}

            {userDetail.profileImg ? (
              <Image
                style={styles.avatar}
                source={{uri: userDetail.profileImg}}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('../../image/orig.jpg')}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                onChangerImg();
              }}
              style={styles.imgCameraAvatar}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../image/camera.png')}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <Text style={styles.textName}>{userDetail.userName}</Text>
        <View style={styles.interactive}>
          <View style={styles.post}>
            <Text style={styles.numberInteractive}>0</Text>
            <TouchableOpacity>
              <Text style={styles.txtProfile}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.post}>
            <Text style={styles.numberInteractive}>{userDetail.followers}</Text>
            <TouchableOpacity>
              <Text style={styles.txtProfile}>Followers</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.post}>
            <Text style={styles.numberInteractive}>{userDetail.following}</Text>
            <TouchableOpacity>
              <Text style={styles.txtProfile}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfile}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '700'}}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <View style={styles.introduce}>
          <View style={styles.txtTitle}>
            <Icon name="md-school" size={30} color="#333" />
            <View>
              <Text style={styles.txtIntroduce}>Went to</Text>
            </View>
            <Text style={styles.txtAddress}>Trường THPT Sa Déc</Text>
          </View>
          <View style={styles.txtTitle}>
            <Icon
              style={{marginLeft: 1}}
              name="md-home"
              size={30}
              color="#333"
            />
            <Text style={styles.txtIntroduce}>Lives in</Text>
            <Text style={styles.txtAddress}>Thành Phố Hồ Chí Minh</Text>
          </View>
          <View style={styles.txtTitle}>
            <Icon
              style={{marginLeft: 5}}
              name="ios-pin"
              size={33}
              color="#333"
            />
            <Text style={styles.txtIntroduce}>From</Text>
            <Text style={styles.txtAddress}>Đồng Tháp</Text>
          </View>
          <View style={styles.txtTitle}>
            <Icon
              style={{marginLeft: 3}}
              name="md-time"
              size={26}
              color="#333"
            />
            <Text style={styles.txtIntroduce}>
              Joined{' '}
              <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 16}}>
                {userDetail.dateCreate}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 53,
    width: width,
    borderColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  imgCover: {
    marginTop: 2,
  },
  imgAdd: {
    width: 40,
    height: 35,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 3,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    right: 16,
  },
  imgAvatar: {
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    bottom: -100,
    alignSelf: 'center',
    borderRadius: 1000,
    zIndex: 5,
  },
  avatar: {
    width: 200,
    zIndex: 5,
    height: 200,
    borderRadius: 1000,
  },
  imgCameraAvatar: {
    width: 40,
    zIndex: 5,
    height: 40,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 3,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderRadius: 1000,
    right: 16,
  },
  textName: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 116,
    fontSize: 24,
    fontWeight: '700',
  },
  interactive: {
    flexDirection: 'row',
    width: width - 32,
    height: 50,
    margin: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  post: {
    margin: 2,
    borderColor: '#AAA',
    width: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtProfile: {
    color: '#333',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '400',
  },
  numberInteractive: {
    color: 'black',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  editProfile: {
    width: width - 96,
    height: 40,
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  txtTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    width: width - 32,
  },
  introduce: {
    marginRight: 16,
    marginLeft: 16,
  },

  txtIntroduce: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '500',
  },
  txtAddress: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    marginLeft: 8,
  },
});
