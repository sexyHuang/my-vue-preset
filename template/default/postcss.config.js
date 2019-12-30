module.exports = () => {
  let vp = process.env.VUE_APP_BASEWIDTH;
  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: vp
      }
    }
  };
};
