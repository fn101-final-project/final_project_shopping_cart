const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'KOHOLA',
    },
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/final_project_shopping_cart_backend/'
      : '/',
});
