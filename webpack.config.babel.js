import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

module.exports = {
  entry: {
    app: "./src/index.js"
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "index.html"),
        to: path.resolve(__dirname, "build")
      },
      {
        from: path.resolve(__dirname, "assets", "**", "*"),
        to: path.resolve(__dirname, "build")
      }
    ]),
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true)
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "build")
  }
};
