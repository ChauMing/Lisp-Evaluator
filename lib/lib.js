let Env = require('./env')

let env = new Env();


/**
 * 所有参数都以数组传入
 */ 

// 加法
env['+'] = (args) => args.reduce((prev, cur) => {
  return prev + cur;
});

// 减法
env['-'] = (args) => args.reduce((prev, cur) => {
  return prev - cur
});

// 乘法
env['*'] = (args) => args.reduce((prev, cur) => {
  return prev * cur;
});

// 除法
env['/'] = (args) => {
  return args.reduce((prev, cur) => {
    if(cur === 0) {
      throw new Error(';Division by zero signalled by /.');
    }
    return prev / cur
  });
}

// ===
env['='] = (args) => {
    return args[0] === args[1];
}

// false
env['false'] = false;

// true
env['true'] = true;

// 显示
env['display'] = function(exps) {
  return console.log(exps);
}



module.exports = env;