const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const cp = require('child_process')

const helpParse = require('parse-help');
  
if (isMainThread) {
  /**
   * @function 
   * @param {String} cmd
   * @param {Array<String>} args
   * @returns {Promise<Object>}
   */
  function cmdParser(cmd, ...args) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { cmd, args }
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
  module.exports = cmdParser;
} else {
  const { cmd, args } = workerData;
  const help = cp.execFile(cmd, args, (err, stout, stin) => {
    const helpObj = helpParse(stout)
    parentPort.postMessage(helpObj)
  });
}