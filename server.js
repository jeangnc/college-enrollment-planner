const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const PORT = process.env.PORT || 3000

const app = express();
const compiler = webpack(config);


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  const file = path.join(config.output.path, 'index.html');
  res.sendFile(file);
})

// Serve the files on port 3000.

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log("Press Ctrl+C to quit.\n")
})
