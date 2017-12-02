const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: './server/index.ts',
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^uws$/),
    new webpack.IgnorePlugin(/^redis$/),
    new webpack.IgnorePlugin(/^sqlite3$/),
    new webpack.IgnorePlugin(/^oracledb$/),
    new webpack.IgnorePlugin(/^mssql$/),
    new webpack.IgnorePlugin(/^mysql$/),
    new webpack.IgnorePlugin(/^mysql2$/),
    new webpack.IgnorePlugin(/^mongodb$/),
    new webpack.IgnorePlugin(/pg\.js/),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'client'), // location of your client
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'client'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?socket\.io(\\|\/)(.+)?/,
      path.join(__dirname, 'client'),
      {}
    ),
    // new webpack.NormalModuleReplacementPlugin(
    //   /.*PlatformTools.*/,
    //   path.resolve(__dirname, 'server/typeorm/PlatformTools.ts')
    // ),
  ]
}
