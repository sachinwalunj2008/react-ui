const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
}

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
}

const baseConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].react-ui.js',
    libraryTarget: 'umd',
    devtoolNamespace: 'react-ui',
    globalObject: 'this',
    uniqueName: 'reactui',
  },
  entry: './src/module',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  externals: ['react'],
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/scss/base/_variables.scss', to: '_variables.scss' },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpg|png)$/,
        exclude: /node_modules/,
        loader: 'asset/resource',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: 'svg-react-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.s?css$/,
                localIdentName: '[local]-rui-[hash:base64:6]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 8001,
    historyApiFallback: true,
    hot: true,
    open: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // https: true, // uncomment this line if you want to use the override in stage/prod
  },
}

module.exports = function (env) {
  if (env && env.bundleEnv === 'development') {
    return merge(baseConfig, devConfig)
  }

  return merge(baseConfig, prodConfig)
}
