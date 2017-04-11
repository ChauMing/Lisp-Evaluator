const parse = require('./lib/parse');
const env = require('./lib/lib');
const util = require('./lib/util');
const {Fn} = require('./lib/struct');

const {
  toNUM, 
  isNUM, 
  isVAR, 
  isEXE, 
  isFN,
  isDEF } = util;

let code = `
(define (a b) (b 2))
(define (b a) a)
(a b)
`;

let ast = parse(code);

let result = ast.map((item) => {
    return eval(item, env);
});

console.log(result.pop());


function eval(exps, env) {
  // 如果是数字, 直接返回数字
  if(isNUM(exps)) {
    return toNUM(exps);
  }

  // 如果是变量, 返回变量
  if(isVAR(exps)) {
    return env.get(exps);
  }

  if(isFN(exps)) {

    if(isDEF(exps)) {
      return evalDef(exps.childNodes.slice(1), env);
    }

    let fn = exps.childNodes[0];

    fn = eval(fn, env);

    if(isEXE(fn)) {
      let results = exps.childNodes.slice(1).map((item) => {
        return eval(item, env);
      });
      return fn(results, env);
    }
    if(fn instanceof Fn) {
      let args = exps.childNodes.slice(1).map((item) => {
        return eval(item, env);
      })

      return evalFn(fn, args);
    }

    throw new Error(`${fn} is not a function`);

  }
}


// 处理 define 语句
function evalDef(exps, env) {
  let key = exps[0];
  let value = exps.slice(1);


  if(isFN(key)) { // 定义函数

    /**
     * (define (b args) exps)
     *          key    value
     */
    let fnName = key.childNodes[0]; // 函数名
    let args = key.childNodes.slice(1); // 形参
    let body = value;        // 函数体

    let fn = new Fn(args, value, env); // 构造函数
    
    return env.set(fnName, fn);  // 将函数定义到作用域中

  } else { // 定义变量
    if(value.length === 1) {
      return env.set(key, eval(value, env))
    }
    throw new Error(`define ${key} error`);
  }
}

/**
 * 执行自定义函数
 * @param {Fn} fn 定义的 Lisp 函数
 * @param {Array} args  函数实参, 将绑定到作用域中
 */
function evalFn(fn, args) {
  let env = fn.env;
  let fnArgs = fn.args;
  let fnBody = fn.body;
  env = env.ext();
  if(args.length !== fnArgs.length) {
    throw new Error(`${fnName} 参数不匹配`);
  }

  fnArgs.forEach((fnArg, index) => {
    env.set(fnArg, args[index], env);
  });


  let result = fnBody.map((body) => {
      return eval(body, env);
  });

  return result.pop();

}
