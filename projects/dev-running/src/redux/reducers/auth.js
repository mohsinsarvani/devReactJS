import { createReducer } from 'reduxsauce';

import { Types } from '../actionCreators';


export const INITIAL_STATE = {
  isAuthing: false,
  isAuth: false,
  isSigningIn: false,
  isSaving: false,
  saved: false,
  user: {},
  error: false,
  errorMessage: '',
}

export const signinRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: true,
    error: false,
    errorMessage: '',
  }
}

export const signinSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: false,
    isAuth: true,
    user: action.user,
  }
}

export const signinFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: false,
    error: true,
    errorMessage: action.error,
  }
}

// ------

export const authRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: true,
    error: false,
    errorMessage: '',
  }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: false,
    isAuth: true,
    user: action.user,
  }
}

export const authFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: false,
    isAuth: false,
    error: true,
    errorMessage: action.error,
  }
}

export const destroyAuthSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningIn: false,
    isAuth: false,
    user: {},
  }
}

// ------

export const updateProfileRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: true,
    error: false,
    errorMessage: '',
    saved: false,
  }
}

export const updateProfileSuccess = (state = INITIAL_STATE, action) => {
  const newUser = {
    ...state.user,
    ...action.user
  };

  return {
    ...state,
    isSaving: false,
    isAuth: true,
    user: newUser,
    saved: true,
  }
}

export const updateProfileFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    error: true,
    errorMessage: action.error,
    saved: false,
  }
}

export const updateProfileReset = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false,
  }
}

// ------

export const HANDLERS = {
  [Types.SIGNIN_REQUEST]: signinRequest,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_FAILURE]: signinFailure,

  [Types.AUTH_REQUEST]: authRequest,
  [Types.AUTH_SUCCESS]: authSuccess,
  [Types.AUTH_FAILURE]: authFailure,

  [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
  [Types.UPDATE_PROFILE_RESET]: updateProfileReset,
}

export default createReducer(INITIAL_STATE, HANDLERS);
