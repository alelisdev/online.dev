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

import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUsersByPayloadRequest,
  fetchUsersByPayloadSuccess,
  fetchUsersByPayloadFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  uploadUserImageRequest,
  uploadUserImageSuccess,
  uploadUserImageFailure,
} from './actions';
import { User } from '../../types/user';

export type Action =
  | ReturnType<typeof fetchUserRequest>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailure>
  | ReturnType<typeof fetchUsersByPayloadRequest>
  | ReturnType<typeof fetchUsersByPayloadSuccess>
  | ReturnType<typeof fetchUsersByPayloadFailure>
  | ReturnType<typeof createUserRequest>
  | ReturnType<typeof createUserSuccess>
  | ReturnType<typeof createUserFailure>
  | ReturnType<typeof updateUserRequest>
  | ReturnType<typeof updateUserSuccess>
  | ReturnType<typeof updateUserFailure>
  | ReturnType<typeof deleteUserRequest>
  | ReturnType<typeof deleteUserSuccess>
  | ReturnType<typeof deleteUserFailure>
  | ReturnType<typeof uploadUserImageRequest>
  | ReturnType<typeof uploadUserImageSuccess>
  | ReturnType<typeof uploadUserImageFailure>;

type InitialStateType = {
  user: User | null;
  userList: User[];
  userImage: string;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  user: null,
  userList: [],
  userImage: '',
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, errors: [] };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_USERS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, userList: action.payload, errors: [] };
    case FETCH_USERS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, errors: [] };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPLOAD_USER_IMAGE_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_USER_IMAGE_SUCCESS:
      return { ...state, loading: false, userImage: action.payload };
    case UPLOAD_USER_IMAGE_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
