const tap = require('tap');
const parseHelp = require('../src/index')

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

tap.test('multi-line description in args', t => {
  const help = parseHelp(doc);
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

const afterArgDoc =`Example of program with many options using parseHelpOutput.

Usage: node [--statistics] [--count] [--benchmark] PATH...
  node --version

Options:
  -h --help            show this help message and exit
  --version            show version and exit
  -v --verbose         print status messages
  -q --quiet           report only file names
  -r --repeat          show all occurrences of the same error
  --exclude=PATTERNS   exclude files or directories which match these comma
                       separated patterns [default: .svn,CVS,.bzr,.hg,.git]

Sometimes there is further discription and we have to seperate. Bla blkdn
oewnv noidn nsdn indid mdmlmk.

`;
tap.test('description after args one line usage', t => {
  // altered usage line so 
  const usage = [ usageArr[0].concat(' ', usageArr[1]), usageArr[2] ];
  
  const help = parseHelp(afterArgDoc);
  t.same(help.cmdName, 'node')
  t.same(help.usage, usage);
  for (const arg in help.args) {
    if (help.args.hasOwnProperty(arg)) {
      const cmd = help.args[arg];
      // make sure there is a --help command or change arg
      if (arg === '--exclude' && typeof cmd === 'object'){
        t.pass('argument info saved as object')
        t.same(cmd.doc, 'exclude files or directories which match these comma separated patterns [default: .svn,CVS,.bzr,.hg,.git]')

        t.same(cmd.alias, null)
      } else if (arg === '--exclude') {
        t.fail('something went wrong argument not object')
      }
    }
  }
  t.end()
})


const noUseDoc =`Example of program with many options using parseHelpOutput.

Options:
  -h --help            show this help message and exit
  --version            show version and exit
  -v --verbose         print status messages
  -q --quiet           report only file names
  -r --repeat          show all occurrences of the same error
  --exclude=PATTERNS   exclude files or directories which match these comma
                       separated patterns [default: .svn,CVS,.bzr,.hg,.git]

Sometimes there is further discription and we have to seperate. Bla blkdn
oewnv noidn nsdn indid mdmlmk.

`;
tap.test('multi-line description and description after args', t => {
  const help = parseHelp(noUseDoc);
  t.same(help.cmdName, null)
  t.same(help.usage, null);
  for (const arg in help.args) {
    if (help.args.hasOwnProperty(arg)) {
      const cmd = help.args[arg];
      // make sure there is a --help command or change arg
      if (arg === '--exclude' && typeof cmd === 'object'){
        t.pass('argument info saved as object')
        t.same(cmd.doc, 'exclude files or directories which match these comma separated patterns [default: .svn,CVS,.bzr,.hg,.git]')

        t.same(cmd.alias, null)
      } else if (arg === '--exclude') {
        t.fail('something went wrong argument not object')
      }
    }
  }
  t.end()
})
