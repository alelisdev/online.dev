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

import {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  fetchCurrentUser,
  fetchAccessToken,
  logout,
  openModal,
  closeModal,
  closeModalAndEndMeeting,
} from './actions';
import { AccessToken } from '../../types/authenticate';
import { User } from '../../types/user';

export type Action =
  | ReturnType<typeof authenticateRequest>
  | ReturnType<typeof authenticateSuccess>
  | ReturnType<typeof authenticateFailure>
  | ReturnType<typeof fetchCurrentUser>
  | ReturnType<typeof fetchAccessToken>
  | ReturnType<typeof logout>
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof closeModalAndEndMeeting>;

type InitialStateType = {
  authenticated: boolean;
  currentUser: User | null;
  userToken: AccessToken | null;
  modalOpen: boolean;
  currentModal: string;
  modalParams: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  authenticated: false,
  currentUser: null,
  userToken: null,
  modalOpen: false,
  currentModal: '',
  modalParams: null,
  loading: false,
  errors: null,
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return { ...state, loading: true };
    case AUTHENTICATE_SUCCESS:
      return { ...state, loading: false, authenticated: true, errors: [] };
    case AUTHENTICATE_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_CURRENT_USER:
      return { ...state, loading: false, currentUser: action.payload, errors: [] };
    case FETCH_ACCESS_TOKEN:
      return { ...state, loading: false, userToken: action.payload, errors: [] };
    case LOGOUT:
      localStorage.setItem('currentUser', '');
      localStorage.setItem('accessToken', '');
      return {
        ...state,
        loading: false,
        authenticated: false,
        currentUser: null,
        userToken: null,
        errors: [],
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        currentModal: action.payload.modal,
        modalParams: action.payload.params,
      };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false, currentModal: '', modalParams: null };
    case CLOSE_MODAL_AND_END_Meeting:
      return { ...state, modalOpen: false, currentModal: '', modalParams: null };
    default:
      return state;
  }
};

export default reducer;
