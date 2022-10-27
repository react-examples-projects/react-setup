const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: ["babel-polyfill", path.join(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".json"],
    alias: {
      pages: path.resolve(__dirname, "src/Pages/"),
      styles: path.resolve(__dirname, "src/Styles/"),
      hooks: path.resolve(__dirname, "src/Hooks/"),
      config: path.resolve(__dirname, "src/Config/"),
      helpers: path.resolve(__dirname, "src/Helpers/"),
      context: path.resolve(__dirname, "src/Context/"),
      assets: path.resolve(__dirname, "src/Assets/"),
      components: path.resolve(__dirname, "src/Components/"),
      modals: path.resolve(__dirname, "src/Components/Modals/"),
      loaders: path.resolve(__dirname, "src/Components/Loaders/"),
      routers: path.resolve(__dirname, "src/Components/Routers/"),
    },
  },

  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.?js$/,
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
        use: [MiniCssExtractPlugin.loader,"css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },

  plugins: [
    new Dotenv(),
    new CompressionPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
    }),
  ],
};
