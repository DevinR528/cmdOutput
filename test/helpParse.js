const tap = require('tap');
const parseHelp = require('../helpParser')

const doc =`Example of program with many options using parseHelpOutput.

Usage:
  node [--statistics] [--count] [--benchmark] PATH...
  node --version

Options:
  -h --help            show this help message and exit
  --version            show version and exit
  -v --verbose         print status messages
  -q --quiet           report only file names
  -r --repeat          show all occurrences of the same error
  --exclude=PATTERNS   exclude files or directories which match these comma
                       separated patterns [default: .svn,CVS,.bzr,.hg,.git]

`;

tap.test('parse help', (t) => {
  const help = parseHelpOutput(doc, 'node');
  t.equal(help.cmdName, 'node')
  t.equal(help.usage,
    'node [--statistics] [--count] [--benchmark] PATH ...node --version');
  help.args.forEach(arg => {
    console.log(arg)
  })
  t.end()
})