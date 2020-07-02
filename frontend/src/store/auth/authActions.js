import authService from '../../services/authService';
import utilService from '../../services/utilService';

export const register = (formData) => async (dispatch) => {
  try {
    const res = await authService.register(formData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR' });
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    utilService.setAuthToken(localStorage.token);
  }
  try {
    const res = await authService.getLoggedInUser();
    dispatch({ type: 'SET_USER', payload: res.data });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR' });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await authService.login(formData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGOUT' });
  } catch (err) {
    console.error(err);
  }
};
