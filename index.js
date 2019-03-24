const cp = require('child_process')
const helpParse = require('parse-help');

const cmdParserThread = require('./thread');

const cmds = ['node', 'npm', 'tar'];

// async non thread test
cmdParserAsync('npm')
//Promise.all(cmds.map(cmdParser))
/**
   * @function 
   * @param {String} command
   * @param {Array<String>} args
   * @returns {Promise<Object>}
   */
function cmdParserAsync(command) {
    return new Promise((resolve, reject) => {
        const cmd = command + ' --help';
        const help = cp.exec(cmd, (err, stout, stin) => {
            if (err) {
                console.log('[stout] ' + stout)
                console.log('[stin] ' + stin)
                console.log('[err] ' + err)
            }
            const helpObj = helpParse(stout)
            console.log(helpObj)
            resolve(helpObj)
        });
    });
}

// thread test
// cmdParserThread('npm', 'install', '--help').then(cmdObj => {
//     console.log(cmdObj)
// }).catch(err => {
//     console.log(err)
// });
