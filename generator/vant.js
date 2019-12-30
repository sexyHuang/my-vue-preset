module.exports = (api, options = {}) => {
  const utils = require("./utils")(api);
  api.extendPackage({
    dependencies: {
      vant: "^2.2.11"
    },
    devDependencies: {
      "babel-plugin-import": "^1.12.2"
    }
  });
  api.injectImports(api.entryFile, `import '@/plugins/vant'`);
  api.render("./../template/vant",{});
  api.onCreateComplete(() => {
    utils.updateBabelConfig(cfg => {
      const pluginImport = [
        "import",
        {
          libraryName: "vant",
          libraryDirectory: "es",
          style: true
        },
        "vant"
      ];
      cfg.plugins = cfg.plugins || [];
      cfg.plugins.push(pluginImport);
      return cfg;
    });
  });
};
