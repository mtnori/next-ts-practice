const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withTypescript({
    publicRuntimeConfig: {
      API_URL: process.env.API_URL
    }
  })
);
