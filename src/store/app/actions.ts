import { IAuthenticateRequest, IAuthenticateResponse } from '../../types/authenticate';
import { Modal } from '../../types/modal';
import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  FETCH_CURRENT_USER,
  FETCH_ACCESS_TOKEN,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_MODAL_AND_END_Meeting,
} from './constants';

export const authenticateRequest = (params: IAuthenticateRequest) => ({
  type: AUTHENTICATE_REQUEST,
  payload: params,
});
export const authenticateSuccess = (payload: IAuthenticateResponse) => ({
  type: AUTHENTICATE_SUCCESS,
  payload,
});
export const authenticateFailure = (errors: any) => ({ type: AUTHENTICATE_FAILURE, errors });

export const setAuthenticated = () => ({ type: AUTHENTICATE_SUCCESS });

export const fetchCurrentUser = () => ({
  type: FETCH_CURRENT_USER,
  payload: localStorage.getItem('currentUser')
    ? JSON.parse(<string>localStorage.getItem('currentUser'))
    : null,
});

export const fetchAccessToken = () => ({
  type: FETCH_ACCESS_TOKEN,
  payload: localStorage.getItem('accessToken')
    ? JSON.parse(<string>localStorage.getItem('accessToken'))
    : null,
});

export const logout = () => ({ type: LOGOUT });

export const openModal = (payload: Modal) => ({ type: OPEN_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const closeModalAndEndMeeting = () => ({ type: CLOSE_MODAL_AND_END_Meeting });
