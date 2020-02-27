/*
 * @Author: Sexy
 * @Date: 2019-12-27 15:53:01
 * @LastEditors  : Sexy
 * @LastEditTime : 2019-12-30 15:14:02
 * @Description: file content
 */
module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段

  // console.log(options);
  const packageObj = require('./../template/package');
  api.extendPackage(packageObj);
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./../template/default');
  const utils = require('./utils')(api);
  api.onCreateComplete(() => {
    utils.updateBabelConfig(cfg => {
      const pluginImport = '@babel/plugin-proposal-optional-chaining';
      cfg.plugins = cfg.plugins || [];
      cfg.plugins.push(pluginImport);
      return cfg;
    });
  });
  if (options.vant) {
    require('./vant')(api);
  }
  if (options.api) require('./api')(api);

  // for v3 compatibility
  /*  if (options.features.includes('router') && !api.hasPlugin("router")) {
    require("./router")(api, options);
  }

  // for v3 compatibility
  if (options.features.includes('vuex') && !api.hasPlugin("vuex")) {
    require("./vuex")(api);
  } */
};
