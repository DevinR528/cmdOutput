// Based on the DocOpt coffeScript project thanks Vladimir Keleshev 
// vladimir@keleshev.com> and all others who helped

/**
 * Here is a much more robust unix standard compliant help output
 * parser which gives an object with the command name, usage
 * and the description of each option or argument.
 * 
 * of shape {
 *  cmdName: 'bla',
 *  usage: 'bla bla',
 *  args: {
 *    --name | -n: {
 *      alias: '-n',
 *      doc: 'bla bla bla'
 *    }, next arg obj..
 *  }
 * }
 */
const Option = function () {
  function Option(short, long, docs) {
    this.short = short != null ? short : null;
    this.long = long != null ? long : null;
    this.docs = docs != null ? docs : null;
  } // added docs to the object


  Option.parse = function (description) {
    let doc = description.replace(/^\s*|\s*$/g, '').split('\n');

    if (doc.length > 1) {
      let d = [doc[0]];

      for (let i = 1; i < doc.length; i++) {
        if (doc[i].trim() === '') {
          break;
        }

        d.push(doc[i].trim());
      }

      doc = d;
    }

    doc = doc.join(' ');

    let _ref; // some use tabs


    doc = doc.replace(/\t/, '  ');

    const _ref1 = (_ref = doc.match(/(.*?)  (.*)/)) != null ? _ref : [null, doc, ''];

    let options = _ref1[1];
    doc = _ref1[2];

    if (options.match(/\[\=/)) {
      options = options.replace(/\[\=/, '=[');
    }

    options = options.replace(/,|=/g, ' ');
    let short = null;
    let long = null;
    const docs = doc.trim();

    const _ref3 = options.split(/\s+/);

    for (let i = 0; i < _ref3.length; i++) {
      const s = _ref3[i];

      if (s.slice(0, 2) === '--') {
        long = s;
      } else if (s[0] === '-') {
        short = s;
      }
    }

    return new Option(short, long, docs);
  };

  return Option;
}();

function cleanUp(doc, name) {
  const errCmd = new RegExp(`${name}: invalid option`, 'i');

  if (doc.match(errCmd)) {
    const docArr = doc.split('\n');

    if (docArr[0] === '') {
      doc = docArr.slice(2).join('\n');
    } else {
      doc = docArr.slice(1).join('\n');
    }
  }

  const cmdUse = new RegExp(`(${name}:)`, 'i');

  if (doc.match(cmdUse)) {
    doc = doc.replace(cmdUse, 'usage:');
  }

  return doc;
}

function printable_usage(doc, name) {
  doc = cleanUp(doc, name);
  const usage_split = doc.split(/(usage:)/i);

  if (usage_split.length < 3) {
    return null;
  } else if (usage_split.length > 3) {
    return null;
  }

  const use = usage_split.slice(1).join('').split(/\n\s*\n/)[0].replace(/^\s+|\s+$/, '');
  const useArr = use.split('\n');
  let result = [];

  for (let i = 0; i < useArr.length; i++) {
    const e = useArr[i];

    if (e.match(/^\s/) || i === 0) {
      result.push(e.trim());
    } else break;
  }

  return result;
}

;

function parse_doc_options(doc) {
  // remove all after description and \n
  const _ref = doc.split(/^\s*-|\n\s*-/).slice(1);

  let _results = [];

  for (let i = 0; i < _ref.length; i++) {
    const s = _ref[i];

    _results.push(Option.parse('-' + s));
  }

  return _results;
}

;
/**
 * 
 * @param  {String} doc the --help output as string
 * @param  {String} [cmd] the name of the cmd run 
 * @return {Object} cmd run, usage, and all the help output
 */

function parseHelpOutput(doc, cmd) {
  const use = printable_usage(doc, cmd);
  const opts = parse_doc_options(doc);
  const name = !cmd ? null : cmd;
  const cmdObj = {
    cmdName: name,
    usage: use,
    args: {}
  };

  for (let i = 0; i < opts.length; i++) {
    const o = opts[i];
    cmdObj.args[o.long || o.short] = {
      alias: o.short ? o.short : null,
      doc: o.docs ? o.docs : null
    };
  }

  return cmdObj;
}

module.exports = parseHelpOutput;