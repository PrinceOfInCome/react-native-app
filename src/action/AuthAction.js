import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
} from './actionType';
import {firebaseApp} from '../api/firebaseConfig.js';

export const createUser = (email, password) => {
  console.log('Create' + email + password);
  return dispatch => {
    dispatch({type: AUTH_CREATE_USER});
    firebaseApp.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Create user' + user);
        createUserSuccess(dispatch, user);
      })
      .catch(() => {
        console.log('Error');
        createUserFail(dispatch);
      });
  };
};
const createUserFail = dispatch => {
  dispatch({type: AUTH_CREATE_USER_FAIL});
};
const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_CREATE_USER_SUCCESS,
    payload: user,
  });
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({type: AUTH_LOGIN_USER});
    firebaseApp.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};
const loginUserFail = dispatch => {
  dispatch({type: AUTH_LOGIN_USER_FAIL});
};
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: user,
  });
};
