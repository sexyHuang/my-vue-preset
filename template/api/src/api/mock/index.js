/*
 * @Author: Sexy
 * @Date: 2019-11-29 21:08:03
 * @LastEditors  : Sexy
 * @LastEditTime : 2020-01-08 14:57:43
 * @Description: file content
 */
import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';

function mock(ax) {
  const mo = new MockAdapter(ax, {
    delayResponse: 500
  });
  Object.keys(mockData)
    .reduce((mo, key) => {
      let [method, pathname] = key.split(':');

      mo[method](pathname).reply(configs => {
        return typeof mockData[key] === 'function'
          ? mockData[key](JSON.parse(configs.data))
          : [200, mockData[key]];
      });
      return mo;
    }, mo)
    .onAny()
    .passThrough();
}
export default mock;
