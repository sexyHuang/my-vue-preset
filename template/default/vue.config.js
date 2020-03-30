const path = require('path');
const PROJECT_NAME = require('./package.json').name;
const CDN_HOST = 'https://cdn2.h5no1.com/';
const cdnBaseUrl = `${CDN_HOST}${PROJECT_NAME}/`;
const VUE_DEFAULT_ALIAS = {
  '@': path.resolve(__dirname, 'src')
};
const alias = {
  '@img': path.resolve(__dirname, 'src/assets/img')
};

const setAlias = (aliasFromChain, addAlias) => {
  for (let [key, value] of Object.entries(addAlias)) {
    aliasFromChain.set(key, value);
  }
};

const setStylusAlias = (alias, defaultAlias = VUE_DEFAULT_ALIAS) =>
  Object.entries({ ...defaultAlias, ...alias }).reduce(
    (prev, [key, value]) => [...prev, [`~${key}`, value]],
    []
  );

module.exports = {
  publicPath: process.env.VUE_APP_CDN === 'true' ? cdnBaseUrl : './',
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  devServer: {
    proxy: 'https://api.h5no1.com/'
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, './src/styles/base/*.styl')]
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        define: {
          $alias: setStylusAlias(alias)
        }
      }
    }
  },
  chainWebpack: config => {
    setAlias(config.resolve.alias, alias);
    if (process.env.VUE_APP_ENV === 'production') {
      config.optimization.minimizer('terser').tap(([args]) => {
        args.terserOptions.compress.drop_console = true;
        return [args];
      });
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

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
