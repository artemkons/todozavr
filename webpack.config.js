const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./src/server/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "backend.js",
  },
  devServer: {
    contentBase: "./dist",
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
};
