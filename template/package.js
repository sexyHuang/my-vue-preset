module.exports = {
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
    'prelease-build': 'vue-cli-service build --mode prelease',
    dep: 'node ./check && yarn prelease-build && charon publish test',
    'temp-dep': 'yarn prelease-build && charon publish temp',
    'cdn-build': 'vue-cli-service build',
    'cdn-dep': 'yarn cdn-build && charon publish prod',
    commitmsg: 'validate-commit-msg',
    'release-f': 'standard-version -f',
    'release-major': 'standard-version -r major',
    'release-minor': 'standard-version -r minor',
    'release-patch': 'standard-version -r patch'
  },
  dependencies: {
    axios: '^0.18.0',
    'axios-mock-adapter': '^1.17.0',
    qs: '^6.9.1',
    vconsole: '^3.3.4'
  },
  devDependencies: {
    'cross-env': '^5.2.0',
    'postcss-px-to-viewport': '^1.1.0',
    'standard-version': '^7.0.1',
    'cz-conventional-changelog': '^3.0.2',
    husky: '^3.1.0',
    'validate-commit-msg': '^2.14.0',
    '@babel/plugin-proposal-optional-chaining': '^7.8.3',
    'image-webpack-loader': '^6.0.0',
    shelljs: '^0.8.3'
  },
  config: {
    commitizen: {
      path: './node_modules/cz-conventional-changelog'
    }
  }
};
