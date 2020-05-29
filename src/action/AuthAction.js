
export const types = {
	CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
	CREATE_USER_FAIL: 'CREATE_USER_FAIL',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAIL: 'LOGIN_FAIL'
  };

export function createUserSuccess(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
	    payload: user,
  };
}
export function createUserFail(error) {
  return {
    type: types.CREATE_USER_FAIL,
    payload: error,
  };
}
export function loginUserSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user,
  };
}
export function loginUserFail(error) {
  return {
    type: types.LOGIN_FAIL,
    payload: error,
  };
}
