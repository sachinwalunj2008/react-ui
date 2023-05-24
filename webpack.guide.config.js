const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index-guide.js',
  output: {
    path: path.resolve(__dirname, 'guide'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool:
    process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
      {
        test: /\.(jpg|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-react-loader',
        },
      },
      {
        test: /\.txt/,
        use: 'raw-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
}
