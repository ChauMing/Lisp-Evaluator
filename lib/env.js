'use strict';

function Env() {
}

// 变量设置
function setEnv(env, key, value) {
  return env[key] = value;
}



// 变量查找
function getEnv(env, key) {
  if(env[key] !== undefined) return env[key];
  console.error(`${key} is not defined`);
  process.exit(0);
}

// 返回调用栈的新栈
function extEnv(env) {
  function F(){};
  F.prototype = env;
  return new F();
}

module.exports = {Env, getEnv, setEnv, extEnv};
