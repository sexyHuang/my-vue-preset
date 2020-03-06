import METHODS from '../configs/methods';
let requests = [];
let isRefreshing = false;
const TOKEN_CACHE_KEY = '__api_third_token';
const injectTokenObj = (config, tokenObj) => {
  let { method, data, params, ...args } = config;
  data = typeof data === 'string' ? JSON.parse(data) : data;
  if (method === METHODS.POST) data = { ...data, ...tokenObj };
  else if (method === METHODS.GET) params = { ...params, ...tokenObj };

  return { method, data, params, ...args };
};

const setToken = tokenObj => {
  window.localStorage.setItem(TOKEN_CACHE_KEY, JSON.stringify(tokenObj));
};

const addToken = async ({ refreshToken }, config) => {
  config.url = config.url.replace(new RegExp(`^${config.baseURL}/`), '');
  const _injectTokenObj = injectTokenObj.bind(null, config);
  if (isRefreshing)
    return new Promise(resolve => {
      requests.push(tokenObj => resolve(_injectTokenObj(tokenObj)));
    });
  isRefreshing = true;
  try {
    const tokenObj = await refreshToken();
    setToken(tokenObj);
    requests.forEach(cb => cb(tokenObj));
    requests = [];
    return _injectTokenObj(tokenObj);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    isRefreshing = false;
  }
};

// 从localStorage中获取token
export const getLocalToken = async ({ refreshToken }, config) => {
  const token = window.localStorage.getItem(TOKEN_CACHE_KEY);
  return token
    ? injectTokenObj(config, JSON.parse(token))
    : addToken({ refreshToken }, config);
};

export default addToken;
