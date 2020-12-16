module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wuzhi_column' : '/',
  devServer: {
    port: 1016,
    overlay: {
      errors: false
    }
  }
}
