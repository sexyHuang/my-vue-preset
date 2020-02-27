import request from './base/request';
import { LOGIN } from './configs/apiList';

const _request = ([method, path], ...args) => request[method](path, ...args);

export async function login() {
  return _request(LOGIN);
}
