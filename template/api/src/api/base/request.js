import axios from 'axios';
import { API_BASE_URL, TIMEOUT } from '../configs';
import addToken, { getLocalToken } from '../plugins/refreshTokenHandler';
import errorCode from '../configs/errorCode';
const useMOCK = !/api.h5no1.com/.test(API_BASE_URL);
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true
});

if (process.env.NODE_ENV === 'development') {
  const qs = require('qs');
  const query = qs.parse(window.location.search.slice(1));
  if (query.mock) {
    const mock = require('../mock').default;
    mock(service);
  }
}

const setError = ({ error, ...args }) => {
  console.error(error, args);
  throw Error('请实现错误处理函数！');
};

const refreshToken = () => {
  return Promise.reject('请实现刷新Token方法！');
};

service.setError = setError;

service.interceptors.request.use(async config => {
  if (useMOCK) {
    config.data = { ...config.data, mock: true };
  }
  if (config.withToken) {
    try {
      config = await getLocalToken({ refreshToken }, config);
    } catch (e) {
      setError({
        type: 'system',
        error: e
      });
    }
  }
  return config;
});
service.interceptors.response.use(
  async res => {
    const { ok, result, message, error_code } = res.data;
    const { customError } = res.config;
    if (error_code === errorCode.EXPRIED_TOKEN) {
      let config;
      try {
        config = await addToken({ refreshToken }, res.config);
      } catch (e) {
        setError({
          type: 'system',
          error: e
        });
      }
      return service(config);
    }
    if (!ok) {
      !customError &&
        setError({
          type: 'system',
          error: res.data
        });
      return Promise.reject({ error_code, message });
    }
    return result;
  },
  error => {
    setError({
      type: 'network',
      error
    });
    return Promise.reject(error);
  }
);
export default service;
