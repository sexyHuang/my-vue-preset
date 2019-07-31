module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    publishPath: {
      test: {
        path: './dist'
      },
      temp: {
        path: './dist'
      },
      prod: {
        path: './dist'
      }
    },
    scripts: {
      dep: 'vue-cli-service build && charon publish test',
      'cdn-build': 'cross-env VUE_APP_CDN=true vue-cli-service build',
      'cdn-dep': 'npm run cdn-build && charon publish prod'
    },
    dependencies: {
      axios: '^0.18.0'
    },
    devDependencies: {
      'cross-env': '^5.2.0',
      'postcss-px-to-viewport': '^1.1.0'
    }
  });
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template');
};
