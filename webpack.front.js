const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const commonConf = {
  entry: "./client/src",
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: "bundle.js",
    publicPath: "/",
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
            loader: "react-svg-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
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
};

module.exports = [
  merge(commonConf, {
    mode: "development",
    name: "front-dev",
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./client/public",
      hot: true,
      inline: true,
      compress: true,
    },
  }),
  merge(commonConf, { mode: "production", name: "front-prod" }),
];
