module.exports = {
  entry: './menus/index.js',
  output: {
    filename: './menus/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
