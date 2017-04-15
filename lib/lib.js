let {Env} = require('./env')

let env = new Env();

Boolean.prototype.toString = function() {
  return this.valueOf() === true ? '#t' : '#f';
}


/**
 * 所有参数都以数组传入
 */ 

function makeBuildInFn(procedure, name) {
  function fn(...args) {
    return procedure(...args);
  }
  fn.toString = function() {
    return `#[build-in-procedure ${name}]`;
  }
  return fn;
}

// 加法
env['+'] = makeBuildInFn(args => 
  args.reduce((prev, cur) => prev + cur)
,  '+');

// 减法
env['-'] = makeBuildInFn(args => 
  args.reduce((prev, cur) => prev - cur)
, '-');

// 乘法
env['*'] = makeBuildInFn(args => 
  args.reduce((prev, cur) => prev * cur)
, '*');

// 除法
env['/'] = makeBuildInFn((args) => {
  return args.reduce((prev, cur) => {
    if(cur === 0) {
      throw new Error(';Division by zero signalled by /.');
    }
    return prev / cur
  });
}, '/')

/**
 * 比较运算
 */
env['='] = makeBuildInFn((args) => {
  return args[0] === args[1];
}, '=');

env['>'] = makeBuildInFn((args) => {
  return args[0] > args[1];
}, '>');

env['<'] = makeBuildInFn((args) => {
  return args[0] < args[1];
}, '<');

env['<='] = makeBuildInFn((args) => {
  return args[0] <= args[1];
}, '<=');

env['>='] = makeBuildInFn((args) => {
  return args[0] >= args[1];
}, '>=');

// false
env['false'] = env['#f'] = '#f';

// true
env['true'] = env['#t'] = '#t';

// 显示
env['display'] = function(exps) {
  return console.log(exps.toString());
}

module.exports = env;