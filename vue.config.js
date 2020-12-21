const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  publicPath: isDEV ? '/' : '/wuzhi_column',
  productionSourceMap: false,
  devServer: {
    port: 1016,
    overlay: {
      errors: false
    }
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: isDEV ? 'public/index.html' : 'public/github.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}
