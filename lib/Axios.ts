import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getToken } from './Storage';

const SERVER = process.env.NEXT_PUBLIC_VOLLEYBALL_API_URL;

const context = <GetServerSidePropsContext>{};

const isServer = () => {
  return typeof window === 'undefined';
};

export const client: AxiosInstance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TokenClient: AxiosInstance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

TokenClient.interceptors.request.use((config) => {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }

  if (isServer() && context?.req?.cookies) {
    config.headers.Authorization = `Bearer ${context.req.cookies.id}`;
  }
  return config;
});
