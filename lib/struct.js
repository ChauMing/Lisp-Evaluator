/**
 * 用户表示自定义的 Lisp 过程
 * @param {Array} args  形参
 * @param {exps} body lisp 表达式
 * @param {Env} env  函数的语法作用域
 */
function Fn(args, body, env) {
    this.args = args;
    this.body = body;
    this.env = env;
}

module.exports = {
    Fn
}