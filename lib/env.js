'use strict';

function Env() {
}

// 变量设置
Env.prototype.set = function(key, value) {
  return this[key] = value;
}

// 变量查找
Env.prototype.get = function(key) {

  if(this[key] !== undefined) return this[key];

  throw new ReferenceError(`${key} is not defined`);
}

// 返回调用栈的新栈
Env.prototype.ext = function() {
  function F(){};
  F.prototype = this;
  return new F();
}

module.exports = Env;
