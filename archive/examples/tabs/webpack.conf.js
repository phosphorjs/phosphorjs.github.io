module.exports = {
  entry: './tabs/index.js',
  output: {
    filename: './tabs/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
