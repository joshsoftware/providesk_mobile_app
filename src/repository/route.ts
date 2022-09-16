import {AxiosRequestConfig} from 'axios';

export type AuthRequestBody = {
  user: {
    email: string;
    name: string;
    id: string;
    access_token: string;
  };
};

export const authRoute: AxiosRequestConfig<AuthRequestBody> = {
  method: 'POST',
  url: '/sessions',
  responseType: 'json',
};
