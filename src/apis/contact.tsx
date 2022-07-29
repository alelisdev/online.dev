import { Contact, ICreateContactRequest } from '../types/contact';
import CxClient from '../utils/axios';

export const fetchContact = async (id: string) => {
  try {
    const response = await CxClient.get(`/contacts/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchContactsByPayload = async (params: Partial<Contact>) => {
  try {
    const response = await CxClient.post('/contacts/getByPayload', params);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createContact = async (params: ICreateContactRequest) => {
  try {
    const response = await CxClient.post(`/contacts`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateContact = async (id: string, params: Partial<Contact>) => {
  try {
    const response = await CxClient.patch(`/contacts/${id}`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await CxClient.delete(`/contacts/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
