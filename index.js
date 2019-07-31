const cluster = require('cluster');
const WORKERS = process.env.WEB_CONCURRENCY || require('os').cpus().length;
if (cluster.isMaster) {
  console.info('[CLUSTER] Master cluster setting up ' + WORKERS + ' workers...');
  for (var i = 0; i < WORKERS; i++) {
    cluster.fork(); // create a worker
  }

  cluster.on('online', function(worker) {
    console.info('[CLUSTER] Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.info('[CLUSTER] Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.info('[CLUSTER] Starting a new worker');
    // start a new worker when it crashes
    cluster.fork();
  });
} else {
  const path = require('path');
  const PORT = process.env.PORT || 3000;
  const app = require(path.resolve(path.resolve(__dirname), 'dist/private/server.bundle.js')).app;

  let server = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${server.address().port}`);
  });
}
