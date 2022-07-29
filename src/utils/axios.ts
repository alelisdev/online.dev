import Axios, { AxiosRequestConfig } from 'axios';
import store from '../index';
import { logout } from '../store/app/actions';

const getAuthToken = () => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const _accessToken: { accessToken: string } = accessToken ? JSON.parse(accessToken) : null;
  return accessToken ? 'Bearer ' + _accessToken.accessToken : '';
};

const API_HOST = process.env.REACT_APP_API_URL;

const CxClient = Axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 100000,
});

CxClient.interceptors.request.use((request: AxiosRequestConfig) => {
  if (request.headers) request.headers['Authorization'] = getAuthToken();
  return request;
});

CxClient.interceptors.response.use(undefined, (err) => {
  if (
    err.response.status === 401 ||
    err.response.data.message === 'Unauthorized' ||
    err.response.data.statusCode === 401
  ) {
    store.dispatch(logout());
  }
  return Promise.reject(err);
});

export default CxClient;
