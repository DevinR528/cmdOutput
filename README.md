# Help-Parser parse command output

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Help-Parser
parse any unix standard help output (from running -h/--help)

## Check it out
[Help-Parser](https://github.com/DevinR528/cmdOutput)


## Installing and using

```bash
npm install help-parser
```

```js
const parseHelpOutput = require('help-parser')

const doc =`
Usage:
  node [--statistics] [--count] [--benchmark] PATH...
  node --version

Options:
  -h --help            show this help message and exit
  --version            show version and exit
  -v --verbose         print status messages
  -q --quiet           report only file names
  -r --repeat          show all occurrences of the same error
  --exclude=PATTERNS   exclude files or directories[default: .svn,CVS,.bzr,.hg,.git]

`;

const help = parseHelpOutput(doc, 'node');
console.log(help)
```
gives

```js
{ cmdName: 'node',
  usage:
   [ 'Usage:',
     'node [--statistics] [--count] [--benchmark] PATH...',
     'node --version' ],
  args:{
     '--help': { alias: '-h', doc: 'show this help message and exit' },
     '--version': { alias: null, doc: 'show version and exit' },
     '--verbose': { alias: '-v', doc: 'print status messages' },
     '--quiet': { alias: '-q', doc: 'report only file names' },
     '--repeat': { alias: '-r', doc: 'show all occurrences of the same error' },
     '--exclude':{
        alias: null,
        doc:
         'exclude files or directories[default: .svn,CVS,.bzr,.hg,.git]'
      }
  }
}
```

or clone the [git repo](https://github.com/DevinR528/cmdOutput) 
and help develop and add to this project

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
