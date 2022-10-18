module.exports = (api) => {
  api.cache.forever();

  return {
    presets: ["@babel/preset-env"],
    plugins: [
      "@babel/transform-runtime",
      [
        "babel-plugin-styled-components",
        {
          displayName: false,
          fileName: false,
        },
      ],
    ],
  };
};
