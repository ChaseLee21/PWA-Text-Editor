const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      hot: true,
    },
    watchOptions: {
      ignored: /src-sw\.js$/, // exclude service worker source file from being watched
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // path to your index.html file
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'Text Editor',
        description: 'An application that allows you to save snippets of code in a simple text editor.',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // ensure the path is correct
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        filename: 'manifest.json', // specify the filename
        inject: true, // ensure the manifest is injected into the html
        fingerprints: false, // remove fingerprints from the manifest
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]', // This line is changed
                outputPath: 'assets/icons/',
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
