export = parseHelpOutput;

type Help = {
  cmdName: '',
  usage: '',
  args: {
    ['--name' | '-n']: {
      alias: '-n',
      doc: 'bla bla bla'
    }
  }
}
declare function parseHelpOutput(doc: String, cmd: String): Help;
