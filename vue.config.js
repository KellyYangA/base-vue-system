
module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8080,
    proxy: {
      '^/proxy': {
        target: 'http://127.0.0.1:8100',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      },
    }
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       modifyVars: {
  //         'primary-color': '#1DA57A',
  //         'link-color': '#1DA57A',
  //         'border-radius-base': '2px',
  //       },
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  pages: {
    index: {
      entry: 'src/components/index/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '管理系统',
    },
    login: {
      entry: 'src/components/login/login.js',
      template: 'public/index.html',
      filename: 'login.html',
      title: '管理系统-登录'
    }
  }
};
