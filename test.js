const cp = require('child_process')

const helpParse = require('./src/index')


function cmdParserAsync(command) {
  return new Promise((resolve, reject) => {
      const cmd = `echo "\`${command} --help\`"`
      cp.exec(cmd, (err, stout, stin) => {
          if (err) {
              reject(err)
          }
          const helpObj = helpParse(stout, command)
          resolve(helpObj)
      });
  });
}
cmdParserAsync('python').then(help => console.log(help))

// const stout = `pwd: pwd [-LP]
// Print the name of the current working directory.

// Options:
//   -L	print the value of $PWD if it names the current working
//         directory
//   -P	print the physical directory, without any symbolic links

// By default, \`pwd' behaves as if \`-L' were specified.

// Exit Status:
// Returns 0 unless an invalid option is given or the current directory
// cannot be read.`;

// console.log(helpParse(stout, 'pwd'));

