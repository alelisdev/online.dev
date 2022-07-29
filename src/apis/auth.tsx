import { AxiosResponse } from 'axios';
import { IAuthenticateRequest, IAuthenticateResponse } from '../types/authenticate';
import CxClient from '../utils/axios';

export const authenticate = async (payload: IAuthenticateRequest) => {
  try {
    const response: AxiosResponse<IAuthenticateResponse> = await CxClient.post(
      '/auth/login',
      payload,
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
