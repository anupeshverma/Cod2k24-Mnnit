import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  LOGIN_ADMIN,
  SET_LINK,
} from '../actions/types';

import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const setLink = (link) => (dispatch) => {
  dispatch({
    type: SET_LINK,
    payload: link,
  });
};

export const register =
  ({
    teamName,
    password,
    name1,
    name2,
    regNo1,
    regNo2,
    year1,
    year2,
    branch1,
    branch2,
  }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      teamName,
      password,
      name1,
      name2,
      regNo1,
      regNo2,
      year1,
      year2,
      branch1,
      branch2,
    });
    try {
      console.log(body);
      const res = await axios.post('/api/users', body, config);
      console.log('dsfasdf');
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert('Registration Failed', 'danger'))
        );
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login = (teamName, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ teamName, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    if (teamName === 'adminCOD') {
      dispatch({
        type: LOGIN_ADMIN,
        payload: res.data,
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    }
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert('Invalid Credentials', 'danger'))
      );
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};