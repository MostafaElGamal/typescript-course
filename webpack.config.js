const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js", // "bundle.[contentHash].js" this is for the hashing in every build for the cashing
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    open: true,
    port: 3000,
  },
};
