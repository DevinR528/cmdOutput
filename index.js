const cp = require('child_process')
const { performance, PerformanceObserver } = require('perf_hooks')
const fs = require('fs')
const helpParse = require('parse-help')

const cmdParserThread = require('./thread')

// names the test in the output file to track changes
const name = process.argv[2] ? `-${process.argv[2]}` : ''

const CMDS = ['node', 'tar'];
const obs = new PerformanceObserver((items, observe) => {
    let bench = '';
    items.getEntries().forEach(async val => {
        bench += `[${val.name}${name}] ${val.duration} at: ${new Date().toISOString().split('T')[0]} with ${CMDS.length} entries in array\n`
    })
    const spacer = `${'='.repeat(bench.length/2)}\n`
    fs.appendFile('./bench.txt', bench + spacer, err => {
        if (err) console.log('bench mark was not saved try again')
    })
    observe.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

// async non thread test
//cmdParserAsync('npm')
/**
   * @function 
   * @param {String} command
   * @param {Array<String>} args
   * @returns {Promise<Object>}
   */
function cmdParserAsync(command) {
    return new Promise((resolve, reject) => {
        const cmd = command + ' --help';
        cp.exec(cmd, (err, stout, stin) => {
            if (err) {
                reject(err)
            }
            const helpObj = helpParse(stout)
            resolve(helpObj)
        });
    });
}

// performance test both
(async _ => {
    try {
        // async one process
        performance.mark('async1')
        await Promise.all(CMDS.map(cmdParserAsync))
        performance.mark('async2')
        
        // then threaded
        performance.mark('thread1')
        await Promise.all(CMDS.map(cmdParserThread))
        performance.mark('thread2')

        performance.measure('async', 'async1', 'async2')
        performance.measure('threaded', 'thread1', 'thread2')
    } catch (err) {
        console.log(err)
    }      
})()
