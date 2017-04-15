const parse = require('./parse');
const env = require('./lib');
const util = require('./util');
const {Fn} = require('./struct');
const {getEnv, setEnv, extEnv} = require('./env');

const {
  toNUM, 
  isNUM, 
  isVAR, 
  isEXE, 
  isFN,
  isNODE,
  isDEF,
  isIF,
  isTRUE } = util;

/**
 * 对一颗语法树或者一个数字, 函数进行求值, 返回求值结果
 * @param  {Node/string} exps 表达式, 
 *                       也可能是一个语法树节点
 *                       或者或者一个字符变量/数字
 * @param  {[type]} env  求值环境/作用域
 * @return               求值结果
 */
function eval(exps, env) {

  // 如果是数字, 直接返回数字
  if(isNUM(exps)) {
    return toNUM(exps);
  }

  // 如果是变量, 返回变量
  if(isVAR(exps)) {
    return getEnv(env, exps);
  }

  // if 语句判断执行
  if(isIF(exps)) {
    return evalIf(exps, env)
  }

  if(isNODE(exps)) {

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


  if(isNODE(key)) { // 定义函数

    /**
     * (define (b args) exps)
     *          key    value
     */
    let fnName = key.childNodes[0]; // 函数名
    let args = key.childNodes.slice(1); // 形参
    let body = value;        // 函数体

    let fn = new Fn(fnName, args, value, env); // 构造函数
    
    return setEnv(env, fnName, fn);  // 将函数定义到作用域中

  } else { // 定义变量
    if(value.length === 1) {
      return setEnv(env, key, eval(value[0], env))
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
  env = extEnv(env);
  if(args.length !== fnArgs.length) {
    throw new Error(`${fnName} 参数不匹配`);
  }

  fnArgs.forEach((fnArg, index) => {
    setEnv(env, fnArg, args[index], env);
  });


  let result = fnBody.map((body) => {
      return eval(body, env);
  });

  return result.pop();
}

/**
 * if  求值
 * @param {Node[if]} exp 
 * @param {Env} env 环境 
 */
function evalIf(exp, env) {

  let condition = exp.childNodes[1]; // 条件
  let trueExp = exp.childNodes[2];   // true 时要执行的语句
  let falseExp = exp.childNodes.slice(3); // false 时执行的语句

  if(!(condition || trueExp || falseExp)) {
    console.error('if 语句有问题');
    process.exit();
  }

  if(isTRUE(eval(condition, env))) {
    return eval(trueExp, env);
  } else {
    let results = falseExp.map((exp) => {
      return eval(exp, env);
    })
    return results.pop();
  }
}


// evaluator, 总是返回最后一条语句的返回值
module.exports = function evaluator(code) {
  let ast = parse(code);
  let results = ast.map((item) => {
    return eval(item, env);
  });
  return results.pop();
}