const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CompressionPlugin = require('compression-webpack-plugin')

const PORT = process.env.PORT || 3000

const development = {
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // Notify on build errors
    new WebpackBuildNotifierPlugin({
      suppressSuccess: 'always',
    }),
  ],

  devServer: {
    port: PORT,
    overlay: true,
    inline: true,
    historyApiFallback: true,
  },
}

const production = {
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),

    new CompressionPlugin({
      test: /^main-.+\.(js|css)$/,
      cache: true,
      threshold: 1024,
    }),
  ],
}

const common = (env, argv) => {
  const { mode } = argv
  return {
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader: 'elm-webpack-loader',
          options: {
            // Shows the model history overlay
            debug: mode === 'development',
            warn: true,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'public')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          include: [path.resolve(__dirname, 'public')],
          use: ['file-loader'],
        },
        {
          test: /\.(css|scss|sass)$/,
          include: [path.resolve(__dirname, 'public')],
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer()],
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),

      new MiniCssExtractPlugin({
        filename:
          mode === 'development' ? '[name].css' : '[name]-[contenthash].css',
      }),

      new HtmlWebpackPlugin({
        title: '<%= projectName %>',
        template: 'public/index.html',
      }),

      new CopyWebpackPlugin([
        {
          from: 'public/img',
          to: 'img',
        },
        {
          from: 'public/favicon.ico',
        },
      ]),
    ],
  }
}

module.exports = (env, argv) => {
  const { mode } = argv
  return merge(
    common(env, argv),
    mode === 'development' ? development : production
  )
}
