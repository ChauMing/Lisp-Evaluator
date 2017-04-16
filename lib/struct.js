/**
 * 用户表示自定义的 Lisp 过程
 * @param {Array} args  形参
 * @param {exps} body lisp 表达式
 * @param {Env} env  函数的语法作用域
 */
function Fn(name, args, body, env) {
  this.name = name
  this.args = args;
  this.body = body;
  this.env = env;
}

Fn.prototype.toString = function() {
  return `#[compound-procedure ${this.name}]`;
}

function Cons(first, second) {
  if(first === void 0 || second === void 0) {
    throw Error('Cons requires exactly 2 arguments!');
  }
  this.first = first;
  this.second = second;
}

Cons.prototype.car = function() {
  return this.first;
}
Cons.prototype.cdr = function() {
  return this.second;
}
Cons.prototype.toString = function() {
  return `(${this.car()} . ${this.cdr()})`;
}

module.exports = {
    Fn,
    Cons
}