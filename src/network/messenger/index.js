import firebase from '../../api/config';

export const SendMsg = async (msgValue, currentUser, guestUser, profileImg) => {
  return await firebase
    .database()
    .ref('messenger/' + currentUser)
    .child(guestUser)
    .push({
      messenger: {
        sender: currentUser,
        receiver: guestUser,
        msg: msgValue,
        profileImg: profileImg,
      },
    });
};
export const ReceiverMsg = async (
  msgValue,
  currentUser,
  guestUser,
  profileImg,
) => {
  return await firebase
    .database()
    .ref('messenger/' + guestUser)
    .child(currentUser)
    .push({
      messenger: {
        sender: currentUser,
        receiver: guestUser,
        msg: msgValue,
        profileImg: profileImg,
      },
    });
};
