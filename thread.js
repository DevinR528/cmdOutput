const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const cp = require('child_process')

const helpParse = require('parse-help');
  
if (isMainThread) {
  module.exports = cmdParser;

  /**
   * @function 
   * @param {String} cmd
   * @returns {Promise<Object>}
   */
  function cmdParser(cmd) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: cmd
      });
      worker.once('message', msg => {
        worker.unref()
        resolve(msg)
      });
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const cmd = workerData;
  cp.exec(cmd + ' --help', {encoding: 'utf8'}, (err, stdout, stdin) => {
    const help = helpParse(stdout)
    parentPort.postMessage(help)
  })
}
