const cp = require('child_process')

const helpParse = require('./index')



function cmdParserAsync(command) {
  return new Promise((resolve, reject) => {
      const cmd = command + ' --help';
      cp.exec(cmd, (err, stout, stin) => {
          if (err) {
              reject(err)
          }
          const helpObj = helpParse(stout, command)
          resolve(helpObj)
      });
  });
}
cmdParserAsync('tar').then(help => console.log(help))