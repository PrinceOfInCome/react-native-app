import firebase from '../../api/config';

const LogOutUser = async () => {
  return await firebase.auth().signOut();
};
export default LogOutUser;
