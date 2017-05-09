'use strict';

/**
 * Main express server init module
 *
 * @author Holly Springsteen
 */

const express = require('express');
const cluster = require('cluster');
const compression = require('compression');
const colors = require('colors');
const config = require('config');
const os = require('os');
const path = require('path');

// Check for hostname exposed by the bluemix platform as environment variables or generic host.
const hostname = process.env.HOST || '0.0.0.0';
const numberOfWorkers = config.has('NUM_NODE_WORKERS') ? config.get('NUM_NODE_WORKERS') : (os.cpus().length || 1);

global.app = express();

// Application routes.
const {appRouter} = require('./routes/routes.js');

if (cluster.isMaster) {
  for (let index = 0; index < numberOfWorkers; index++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(`(code: ${code})`.magenta + ` Worker ${worker.id} ${worker.state} | pid: ${worker.process.pid}`.red);

    // Replace the dead worker,
    // We're not sentimental
    cluster.fork();
  });
} else {
  console.log('Worker '.cyan, colors.magenta(cluster.worker.id), ' running '.cyan);

  // Disable the string that identifies our server as running Express.
  app.disable('x-powered-by');

  // Enable reverse proxy support in Express. This causes the the "X-Forwarded-Proto" header field to be trusted
  // so its value can be used to determine the protocol.
  app.enable('trust proxy');

  // Middlewares.
  app.use(compression());

  // Set view rendering engine.
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'dashboard/views'));

  // Import main application router middleware.
  const router = appRouter();
  app.use(router);

  const envPort = process.env.PORT || process.env.CF_INSTANCE_PORT || process.env.VCAP_APP_PORT;
  const port = envPort || config.APPLICATION_PORT || 3000;

  /**
   * After the server is started this function is called. Set as a function to allow for https or http setup
   * with same callback function.
   */
  const connectionCallback = () => {
    if (cluster.worker.id === numberOfWorkers) {
      console.log('Application started successfully'.green);
      console.log('Port:'.cyan, colors.magenta(port));
      console.log('Workers:'.cyan, colors.magenta(numberOfWorkers));
    }
  };

  const server = app.listen(port, hostname, connectionCallback);

  // Handle unexpected errors.
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception'.bgRed.white, error);
  });

  module.exports = server;
}