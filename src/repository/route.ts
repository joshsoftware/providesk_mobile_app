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

export const ticketRoute = {
  method: 'GET',
  url: '/tickets',
  responseType: 'json',
};

export const createTicketRoute = {
  method: 'POST',
  url: '/create',
  responseType: 'json',
};

export const getDepartmentRoute = {
  method: 'GET',
  url: '/departments',
  responseType: 'json',
};

export const getCategoryRoute = {
  method: 'GET',
  url: '/category',
  responseType: 'json',
};
