import axios, {AxiosRequestConfig} from 'axios';
import {Alert, AsyncStorage} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as RootNavigator from 'src/routes/root-navigator';
import {getValue} from '@utils/storage/index';

const axiosInstance = axios.create({
  baseURL: 'https://safe-bayou-18083.herokuapp.com',
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },

  async function (error) {
    if (typeof error.response === 'undefined') {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      RootNavigator?.resetUntil('home');
      RootNavigator?.replace('splash');
      await GoogleSignin.signOut();
      await AsyncStorage.clear();
      Alert.alert('Session Expired!!', 'Please login again');
    }
    return Promise.reject(error);
  },
);

export const apiCall = async (config: AxiosRequestConfig) => {
  const token = await getValue('token');
  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
    Accept: 'application/vnd.providesk; version=1',
  };
  delete config.url;
  const requestConfig = {
    ...config,
    url: `https://safe-bayou-18083.herokuapp.com/sessions`,
  };
  return axiosInstance(requestConfig);
};
