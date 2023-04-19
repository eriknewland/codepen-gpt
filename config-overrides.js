// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Add the path polyfill
  config.resolve.alias.path = path.resolve(__dirname, 'node_modules', 'path-browserify');

  // Alias the custom version of @eslint/eslintrc
  config.resolve.alias['@eslint/eslintrc'] = path.resolve(__dirname, 'custom-modules', '@eslint', 'eslintrc');

  return config;
};
