module.exports = {
  entry: './flexbox/index.js',
  output: {
    filename: './flexbox/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
