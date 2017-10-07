const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const TARGET_ENV =
  process.env.npm_lifecycle_event === 'build' ? 'production' : 'development'

const common = {
  entry: {
    app: ['./src/index.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            cacheDirectory: true,
          },
        },
      },
      // {
      //   test: /\.html$/,
      //   exclude: /node_modules/,
      //   loader: 'file-loader?name=[name].[ext]'
      // },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: ['elm-hot-loader', 'elm-webpack-loader?verbose=true&warn=true'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],

    noParse: /\.elm$/,
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      title: '<%= projectName %>',
      template: 'src/index.html',
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/img',
        to: 'img',
      },
    ]),
  ],
}

//
// DEVELOPMENT
//

if (TARGET_ENV === 'development') {
  console.log('=== Building for development')
  module.exports = merge(common, {
    plugins: [
      // Hot Module Reload plugin recommends this in the js console
      new webpack.NamedModulesPlugin(),

      // Notify on buld errors
      new WebpackBuildNotifierPlugin({
        suppressSuccess: 'always',
      }),

      new ExtractTextPlugin('app.css'),
    ],

    devServer: {
      inline: true,
      historyApiFallback: true,
      stats: {
        colors: true,
        children: false,
      },
    },
  })
}

//
// PRODUCTION
//

if (TARGET_ENV === 'production') {
  console.log('=== Building for production')
  module.exports = merge(common, {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[hash].js',
    },
    plugins: [
      // Apparently necessary when using [hash]
      new webpack.optimize.OccurrenceOrderPlugin(),

      new ExtractTextPlugin('app-[hash].css'),
    ],
  })
}
