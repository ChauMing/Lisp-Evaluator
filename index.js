'use strict';

// 和 js 的 eval 冲突了......
const parse = require('./lib/parse');
const _eval = require('./lib/eval');
const env = require('./lib/lib');

module.exports = function(code) {
  let ast = parse(code);
  let results = ast.map((item) => {
    return _eval(item, env);
  });
  return results.pop().toString();
}