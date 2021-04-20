const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    name: "server",
    mode: "development",
    entry: "./src/server/app.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server/backend.js",
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
    entry: "./src/client",
    devServer: {
      contentBase: "./dist/client",
    },
    output: {
      filename: "client/frontend.js",
      path: path.resolve(__dirname, "dist"),
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/index.html",
        filename: "client/index.html",
      }),
    ],
  },
];
