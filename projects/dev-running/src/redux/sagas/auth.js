import { put } from 'redux-saga/effects';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import ActionCreators from '../actionCreators';


export function* signIn(action) {
  let token = localStorage.getItem('token');
  const login = yield axios.post('http://localhost:3001/users/login', {
    email: action.email,
    passwd: action.passwd,
  });
  if (login.data.token) {
    token = login.data.token;
    localStorage.setItem('token', token);

    const userDecoded = jwtDecode(token);
    localStorage.setItem('user', userDecoded);

    yield put(ActionCreators.signinSuccess(userDecoded));
  }
  else {
    yield put(ActionCreators.signinFailure(login.data.message));
  }
}

export function* auth() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token);
      yield put(ActionCreators.authSuccess(user));
    }
    catch (err) {
      yield put(ActionCreators.authFailure('Invalid token.'));
    }
  }
  else {
    yield put(ActionCreators.authFailure('There is no token.'));
  }
}

export function* destroyAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  yield put(ActionCreators.destroyAuthSuccess());
}