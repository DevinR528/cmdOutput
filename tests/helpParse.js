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

const usageArr = [
  'Usage:',
  'node [--statistics] [--count] [--benchmark] PATH...',
  'node --version'
]

tap.test('parse help', t => {
  const help = parseHelp(doc, 'node');
  console.log(help)
  t.same(help.cmdName, 'node')
  t.same(help.usage, usageArr);
  for (const arg in help.args) {
    if (help.args.hasOwnProperty(arg)) {
      const cmd = help.args[arg];
      // make sure there is a --help command or change arg
      if (arg === '--help' && typeof cmd === 'object'){
        t.pass('argument info saved as object')
        t.same(cmd.doc, 'show this help message and exit')
        t.same(cmd.alias, '-h')
      } else if (arg === '--help') {
        t.fail('something went wrong argument not object')
      }
    }
  }
  t.end()
})