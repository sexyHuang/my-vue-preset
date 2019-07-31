module.exports = () => {
  let vp = 750;
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: vp
      }
    }
  };
};
