import firebase from '../../api/config';

const signUpRequest = async (email, password) => {
   await firebase.auth().createUserWithEmailAndPassword(email, password);
};
export default signUpRequest;
