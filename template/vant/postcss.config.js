/*
 * @Author: Sexy
 * @Date: 2019-12-27 16:10:05
 * @LastEditors: Sexy
 * @LastEditTime: 2019-12-30 10:09:06
 * @Description: file content
 */
module.exports = ({ file }) => {
  let vp = process.env.VUE_APP_BASEWIDTH;
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    vp = 375;
  }
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: vp
      }
    }
  };
};
