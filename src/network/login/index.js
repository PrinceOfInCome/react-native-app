import firebase from '../../api/config';

const LoginRequest = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export default LoginRequest;
