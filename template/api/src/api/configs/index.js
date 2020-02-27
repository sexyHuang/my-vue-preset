/*
 * @Author: Sexy
 * @Date: 2020-01-13 00:32:02
 * @LastEditors: Sexy
 * @LastEditTime: 2020-02-11 15:46:30
 * @Description: file content
 */
const DOMAIN = {
  development: '',
  prelease: 'https://api.h5no1.com/',
  production: 'https://api.h5no1.com'
}[process.env.VUE_APP_ENV];
const PROJECT_PATH = require('./../../../package.json').name.replace('-h5', '');
export const API_BASE_URL = `${DOMAIN}/${PROJECT_PATH}/api`;

export const TIMEOUT = 1e4; //10s
