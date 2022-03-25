const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'KOHOLA',
    },
  },
  publicPath: process.env.BASE_URL,
  productionSourceMap: false,
});
