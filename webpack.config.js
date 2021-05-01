const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: "./client/src",
    devtool: "source-map",
    devServer: {
      contentBase: "./client/public",
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
