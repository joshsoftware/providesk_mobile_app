import axios from 'axios';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as RootNavigator from 'routes/root-navigator';

const axiosInstance = axios.create({
  baseURL: '',
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
      GoogleSignin.signOut();
      Alert.alert('Session Expired!!', 'Please login again');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
