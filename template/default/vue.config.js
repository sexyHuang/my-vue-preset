const PROJECT_NAME = require('./package.json').name;
const CDN_HOST = './';
const cdnBaseUrl = `${CDN_HOST}${PROJECT_NAME}/`;

module.exports = {
  publicPath: process.env.VUE_APP_CDN === 'true' ? cdnBaseUrl : './',
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  devServer: {
    proxy: ''
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader(require.resolve('image-webpack-loader'))
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          gifsicle: {
            interlaced: false
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          }
        });
    }
  }
};
