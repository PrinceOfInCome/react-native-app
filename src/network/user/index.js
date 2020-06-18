import firebase from '../../api/config';
import {uuid} from '../../utility/constants';
var today = new Date();
var date =
  'Day ' +
  today.getDate() +
  'Month ' +
  (today.getMonth() + 1) +
  'Year' +
  today.getFullYear();
var number = 0;
export const AddUser = async (uid, userName, email, password, profileImg) => {
  await firebase
    .database()
    .ref('users/' + uid)
    .set({
      uuid: uid,
      userName: userName,
      email: email,
      password: password,
      profileImg: profileImg,
      status: false,
      followers: number,
      following: number,
      dateCreate: date,
      imgCover: '',
    });
};
export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
export const UpdateImgCover = async (uuid, imgSourceCover) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .update({
        imgCover: imgSourceCover,
      });
  } catch (error) {
    return error;
  }
};
