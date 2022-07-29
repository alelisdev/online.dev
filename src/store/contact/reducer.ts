import {
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACTS_BY_PAYLOAD_REQUEST,
  FETCH_CONTACTS_BY_PAYLOAD_SUCCESS,
  FETCH_CONTACTS_BY_PAYLOAD_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
} from './constants';

import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactFailure,
  fetchContactsByPayloadRequest,
  fetchContactsByPayloadSuccess,
  fetchContactsByPayloadFailure,
  createContactRequest,
  createContactSuccess,
  createContactFailure,
  updateContactRequest,
  updateContactSuccess,
  updateContactFailure,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactFailure,
} from './actions';
import { Contact } from '../../types/contact';

export type Action =
  | ReturnType<typeof fetchContactRequest>
  | ReturnType<typeof fetchContactSuccess>
  | ReturnType<typeof fetchContactFailure>
  | ReturnType<typeof fetchContactsByPayloadRequest>
  | ReturnType<typeof fetchContactsByPayloadSuccess>
  | ReturnType<typeof fetchContactsByPayloadFailure>
  | ReturnType<typeof createContactRequest>
  | ReturnType<typeof createContactSuccess>
  | ReturnType<typeof createContactFailure>
  | ReturnType<typeof updateContactRequest>
  | ReturnType<typeof updateContactSuccess>
  | ReturnType<typeof updateContactFailure>
  | ReturnType<typeof deleteContactRequest>
  | ReturnType<typeof deleteContactSuccess>
  | ReturnType<typeof deleteContactFailure>;

type InitialStateType = {
  contact: Contact | null;
  contactList: Contact[];
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  contact: null,
  contactList: [],
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_CONTACT_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload, errors: [] };
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_CONTACTS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONTACTS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, contactList: action.payload, errors: [] };
    case FETCH_CONTACTS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_CONTACT_REQUEST:
      return { ...state, loading: true };
    case CREATE_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload };
    case CREATE_CONTACT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_CONTACT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload };
    case UPDATE_CONTACT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_CONTACT_REQUEST:
      return { ...state, loading: true };
    case DELETE_CONTACT_SUCCESS:
      const oldContactList = state.contactList;
      const newContactList = Object.assign([
        ...oldContactList.filter((t: Contact) => t.id !== action.payload),
      ]);
      return { ...state, loading: false, contactList: newContactList };
    case DELETE_CONTACT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
