const PROJECT_NAME = require('./package.json').name;
const CDN_HOST = 'https://cdn2.h5no1.com/';
const cdnBaseUrl = `${CDN_HOST}${PROJECT_NAME}/`;

module.exports = {
  publicPath: process.env.VUE_APP_CDN === 'true' ? cdnBaseUrl : './',
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  devServer: {
    proxy: 'https://api.h5no1.com/'
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }
};
