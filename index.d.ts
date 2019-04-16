export = parseHelpOutput;

type Help = {
  cmdName: '',
  usage: '',
  args: {
    '--name': {
      alias: '-n',
      doc: 'bla bla bla'
    }
  }
}
/**
 * 
 * @param  {String} doc the stdout from --help
 * @param  {String} cmd the command run
 * @return {Help} Help object with each arg and documentation of arg
 */
declare function parseHelpOutput(doc: String, cmd: String): Help;
