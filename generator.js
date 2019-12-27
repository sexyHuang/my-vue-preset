/*
 * @Author: Sexy
 * @Date: 2019-12-27 15:53:01
 * @LastEditors  : Sexy
 * @LastEditTime : 2019-12-27 15:55:04
 * @Description: file content
 */
module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    publishPath: {
      test: {
        path: "./dist"
      },
      temp: {
        path: "./dist"
      },
      prod: {
        path: "./dist"
      }
    },
    scripts: {
      dep: "vue-cli-service build && charon publish test",
      "cdn-build": "cross-env VUE_APP_CDN=true vue-cli-service build",
      "cdn-dep": "npm run cdn-build && charon publish prod",
      commitmsg: "validate-commit-msg",
      "release-f": "standard-version -f",
      "release-major": "standard-version -r major",
      "release-minor": "standard-version -r minor",
      "release-patch": "standard-version -r patch"
    },
    dependencies: {
      axios: "^0.18.0"
    },
    devDependencies: {
      "cross-env": "^5.2.0",
      "postcss-px-to-viewport": "^1.1.0",
      "standard-version": "^7.0.1",
      "cz-conventional-changelog": "^3.0.2"
    },
    config: {
      commitizen: {
        path: "./node_modules/cz-conventional-changelog"
      }
    }
  });
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render("./template");
};
