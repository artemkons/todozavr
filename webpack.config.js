const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    name: "server",
    mode: "development",
    entry: "./server/src/app.js",
    output: {
      path: path.resolve(__dirname, "server/public"),
      filename: "backend.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        http: require.resolve("stream-http"),
        crypto: require.resolve("crypto-browserify"),
        zlib: require.resolve("browserify-zlib"),
        assert: require.resolve("assert/"),
        fs: false,
      },
    },
    target: "node",
    externals: [nodeExternals()],
  },
  {
    name: "client",
    mode: "development",
    entry: "./client/src",
    devtool: "source-map",
    devServer: {
      contentBase: "./client/public",
      historyApiFallback: true,
    },
    output: {
      path: path.resolve(__dirname, "client/public"),
      filename: "bundle.js",
      assetModuleFilename: "[hash][ext][query]",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                encoding: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/src/index.html",
        filename: "index.html",
      }),
    ],
  },
];
