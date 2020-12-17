module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wuzhi_column' : '/',
  productionSourceMap: false,
  devServer: {
    port: 1016,
    overlay: {
      errors: false
    }
  }
  // pages: {
  //   index: {
  //     entry: 'src/main.ts',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   404: {
  //     entry: 'src/main.ts',
  //     template: 'public/index.html',
  //     filename: '404.html',
  //     chunks: ['chunk-vendors', 'chunk-common', '404']
  //   }
  // }
}
