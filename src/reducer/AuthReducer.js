import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
} from '../action/actionType';

const INITIAL_STATE = {
  errorLogin: '',
  errorCreate: '',
  loading: false,
  user: null,
};
const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CREATE_USER:
      console.log('AUTH_CREATE_USER +++');
      return {...state, ...INITIAL_STATE, loading: true, user: action.payload};
    case AUTH_CREATE_USER_FAIL:
      return {
        ...state,
        errorCreate: 'Creation failed ! Please check the credentials !',
        loading: false,
      };
    case AUTH_CREATE_USER_SUCCESS:
      console.log('AUTH_CREATE_USER_SUCCESS');
      return {...state, loading: false, errorCreate: ''};
    case AUTH_LOGIN_USER:
      console.log('AUTH_LOGIN_USER');
      return {...state, ...INITIAL_STATE, loading: true, user: action.payload};
    case AUTH_LOGIN_USER_FAIL:
      return {
        ...state,
        errorLogin: 'Login failed ! Please check the credentials',
        loading: false,
      };
    case AUTH_LOGIN_USER_SUCCESS:
      return {...state, loading: false, errorLogin: ''};
    default:
      return state;
  }
};

export default auth;
