/**
 * Webpack configuration
 *
 * @author Codex Team
 * @copyright Khaydarov Murod
 */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const pkg = require('./package.json');

  /**
   * Environment
   *
   * @type {any}
   */
  const NODE_ENV = argv.mode || 'development';
  const VERSION = process.env.VERSION || pkg.version;

  /**
   * Plugins for bundle
   *
   * @type {webpack}
   */
  const webpack = require('webpack');


    return  {
    entry: [ './src/index.js' ],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
            {
                loader: 'babel-loader',
                query: {
                presets: [ '@babel/preset-env' ],
                },
            },
            ]
        },
        ]
    },
     plugins: [
      /** Pass variables into modules */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        VERSION: JSON.stringify(VERSION),
      }),

      new webpack.BannerPlugin({
        banner: `Undo/Redo feature for Editor.js\n\n@version ${VERSION}\n\n@package https://github.com/kommitters/editorjs-undo\n@licence MIT\n@author kommit <info@kommit.co>`,
      }),
     ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        library: 'Undo',
        libraryTarget: 'umd',
        libraryExport: 'default',
    }
  };
};
