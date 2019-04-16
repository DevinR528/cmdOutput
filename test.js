const cp = require('child_process')

const helpParse = require('./src/index')


// function cmdParserAsync(command) {
//   return new Promise((resolve, reject) => {
//       const cmd = `echo "\`${command} --help\`"`
//       cp.exec(cmd, (err, stout, stin) => {
//           if (err) {
//               reject(err)
//           }
//           const helpObj = helpParse(stout, command)
//           resolve(helpObj)
//       });
//   });
// }
// cmdParserAsync('python').then(help => console.log(help))

const stout = `
pwd: invalid option -- '-'
pwd: pwd [-LP]
     pwd [usage tab test]

Print the name of the current working directory.

Options:
    -P  print the physical directory, without any symbolic links
`

console.log(helpParse(stout, 'pwd'));

