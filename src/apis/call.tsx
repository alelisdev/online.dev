import { Call, ICreateCallRequest } from '../types/call';
import CxClient from '../utils/axios';

export const fetchCallsByPayload = async (params: Partial<Call>) => {
  try {
    const response = await CxClient.post('/calls/getByPayload', params);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createCall = async (params: ICreateCallRequest) => {
  try {
    const response = await CxClient.post(`/calls`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateCall = async (id: string, params: Partial<Call>) => {
  try {
    const response = await CxClient.patch(`/calls/${id}`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};
