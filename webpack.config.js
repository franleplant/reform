module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: '/public/'
  },
  module: {
    loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loaders: ['babel']
    }]
  },
  devServer: {
    historyApiFallback: true
  }
}
