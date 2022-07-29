import { IUserImageRequest, User } from '../../types/user';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USERS_BY_PAYLOAD_REQUEST,
  FETCH_USERS_BY_PAYLOAD_SUCCESS,
  FETCH_USERS_BY_PAYLOAD_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPLOAD_USER_IMAGE_REQUEST,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
} from './constants';

export const fetchUserRequest = (userId: string) => ({ type: FETCH_USER_REQUEST, meta: userId });
export const fetchUserSuccess = (payload: User) => ({ type: FETCH_USER_SUCCESS, payload });
export const fetchUserFailure = (errors: any) => ({ type: FETCH_USER_FAILURE, errors });

export const fetchUsersByPayloadRequest = (params: Partial<User>) => ({
  type: FETCH_USERS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchUsersByPayloadSuccess = (payload: User[]) => ({
  type: FETCH_USERS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchUsersByPayloadFailure = (errors: any) => ({
  type: FETCH_USERS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createUserRequest = (params: Partial<User>) => ({
  type: CREATE_USER_REQUEST,
  payload: params,
});
export const createUserSuccess = (payload: User) => ({ type: CREATE_USER_SUCCESS, payload });
export const createUserFailure = (errors: any) => ({ type: CREATE_USER_FAILURE, errors });

export const updateUserRequest = (userId: string, params: Partial<User>) => ({
  type: UPDATE_USER_REQUEST,
  payload: params,
  meta: userId,
});
export const updateUserSuccess = (payload: User) => ({ type: UPDATE_USER_SUCCESS, payload });
export const updateUserFailure = (errors: any) => ({ type: UPDATE_USER_FAILURE, errors });

export const deleteUserRequest = (userId: string) => ({ type: DELETE_USER_REQUEST, meta: userId });
export const deleteUserSuccess = (payload: string) => ({ type: DELETE_USER_SUCCESS, payload });
export const deleteUserFailure = (errors: any) => ({ type: DELETE_USER_FAILURE, errors });

export const uploadUserImageRequest = (params: IUserImageRequest) => ({
  type: UPLOAD_USER_IMAGE_REQUEST,
  payload: params,
});
export const uploadUserImageSuccess = (payload: string) => ({
  type: UPLOAD_USER_IMAGE_SUCCESS,
  payload,
});
export const uploadUserImageFailure = (errors: any) => ({
  type: UPLOAD_USER_IMAGE_FAILURE,
  errors,
});
