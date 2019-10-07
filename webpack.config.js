const path = require('path');

const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: publicPath,
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    contentBase: srcPath,
    watchContentBase: true,
    stats: 'minimal'
  }
};
