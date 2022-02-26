import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_URL } from 'config/index';

import * as storage from './localstorage';
import { isTokenExpired } from './util';
import { StorageKey } from '../model/localstorage.model';

export const getAxios = async (requiresAuth: boolean | null): Promise<AxiosInstance> => {
  const token = await storage.get(StorageKey.EMME_TOKEN);
  const baseURL = API_URL;

  if (requiresAuth && !token) {
    throw Error('API failed: No token found');
  }

  if (token && isTokenExpired(token)) {
    localStorage.clear();
    throw Error('API failed: Token expired');
  }

  const config: AxiosRequestConfig = { baseURL, headers: {} };

  if (token && requiresAuth !== false) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axios.create(config);
};

export function handleResponseError(error: AxiosError): Object | string {
  if (error?.response?.status === 401) {
    storage.clear();
  }
  const msg =
    error?.response?.status === 401 && !error?.response?.data
      ? 'Authorization failed'
      : error?.response?.data;
  return msg || error?.message || 'API request failed';
}
