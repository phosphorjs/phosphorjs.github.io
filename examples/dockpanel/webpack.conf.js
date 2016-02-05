module.exports = {
  entry: './dockpanel/index.js',
  output: {
    filename: './dockpanel/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
