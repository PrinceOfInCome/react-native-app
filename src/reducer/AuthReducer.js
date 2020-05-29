import{types} from '../action/AuthAction'
const initialStates = {
  isLogin: false,
  user: '',
  error: '',
};
export const authReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      console.log('AUTH_CREATE_USER_SUCCESS');
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };

    case types.CREATE_USER_FAIL:
      return {
        ...state,
        isLogin: false,
        error: action.payload,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };

    case types.LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
