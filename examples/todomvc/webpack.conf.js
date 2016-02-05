module.exports = {
  entry: './todomvc/index.js',
  output: {
    filename: './todomvc/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
