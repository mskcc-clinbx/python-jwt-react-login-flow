import { green } from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.babel';

const ADDRESS = process.env.DEV_HOST || 'localhost';
const PORT = process.env.DEV_PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  inline: true,
  hot: true,
}).listen(PORT, ADDRESS, (err, result) => {
  if (err) {
    throw err;
  }
  console.log(green(`Listening at ${ADDRESS}:${PORT}`));
});
