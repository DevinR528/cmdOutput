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
 *    }
 *  }, ect}
 * }
 */

Option = (function() {

  function Option(short, long, argcount, value, docs) {
    this.short = short != null ? short : null;
    this.long = long != null ? long : null;
    this.docs = docs != null ? docs : null;
    this.argcount = argcount != null ? argcount : 0;
    this.value = value != null ? value : false;
  }

  Option.prototype.toString = function() {
    return "Option(" + this.short + ", " + this.long + ", " + this.argcount + ", " + this.value + ")";
  };

  Option.prototype.name = function() {
    return this.long || this.short;
  };

  // added docs to the object
  Option.parse = function(description) {
    var argcount, long, matched, options, s, short, value, _, _i, _len, _ref, _ref1, _ref2, _ref3;
    description = description.replace(/^\s*|\s*$/g, '').split('\n');
    if (description.length > 1) {
      for (let i = 1; i < description.length; i++) {
        description[i] = description[i].trim();
      }
    }
    description = description.join('');
    _ref1 = (_ref = description.match(/(.*?)  (.*)/)) != null ? _ref 
      : [null, description, '']
    _ = _ref1[0], options = _ref1[1], description = _ref1[2];
    options = options.replace(/,|=/g, ' ');
    _ref2 = [null, null, 0, false, null], short = _ref2[0],
    long = _ref2[1], argcount = _ref2[2], value = _ref2[3],
    //added
    docs = description.trim();
    _ref3 = options.split(/\s+/);
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      s = _ref3[_i];
      if (s.slice(0, 2) === '--') {
        long = s;
      } else if (s[0] === '-') {
        short = s;
      } else {
        argcount = 1;
      }
    }
    if (argcount === 1) {
      matched = /\[default:\s+(.*)\]/.exec(description);
      value = matched ? matched[1] : false;
    }
    return new Option(short, long, argcount, value, docs);
  };

  Option.prototype.match = function(left, collected) {
    var l, left_;
    if (collected == null) {
      collected = [];
    }
    left_ = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = left.length; _i < _len; _i++) {
        l = left[_i];
        if (l.constructor !== Option || this.short !== l.short || this.long !== l.long) {
          _results.push(l);
        }
      }
      return _results;
    }).call(this);
    return [left.join(', ') !== left_.join(', '), left_, collected];
  };

  return Option;

})();

printable_usage = function(doc, name) {
  var usage_split = doc.split(/(usage:)/i);
  // TODO
  if (usage_split.length < 3) {
    throw new Error('"usage:" (case-insensitive) not found.');
  } else if (usage_split.length > 3) {
    throw new Error('More than one "usage:" (case-insensitive).');
  }

  const use = usage_split.slice(1).join('')
    .split(/\n\s*\n/)[0].replace(/^\s+|\s+$/, '');
  const useArr = use.split('\n');
  let result = [];
  for (let i = 0; i < useArr.length; i++) {
    const e = useArr[i];
    result.push(e.trim());
  }
  return result;
};

parse_doc_options = function(doc) {
  var s, _i, _len, _ref, _results;
  _ref = doc.split(/^\s*-|\n\s*-/).slice(1);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    s = _ref[_i];
    _results.push(Option.parse('-' + s));
  }
  return _results;
};

/**
 * 
 * @param  {String} doc the --help output as string
 * @param  {String} [cmd] the name of the cmd run 
 * @return {Object} cmd run, usage, and all the help output
 */
function parseHelpOutput(doc, cmd) {
  const use = printable_usage(doc)
  const opts = parse_doc_options(doc)

  const cmdObj = {
    cmdName: cmd,
    usage: use,
    args: {}
  }
  for (let i = 0; i < opts.length; i++) {
    const o = opts[i];
    cmdObj.args[o.long || o.short] = {
        alias: o.short ? o.short : null,
        doc: o.docs ? o.docs : null
      }
    }
    return cmdObj
  }

module.exports = parseHelpOutput
