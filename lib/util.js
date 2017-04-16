const Node = require('./node');
const {Fn} = require('./struct');

module.exports = {
  // 数字   
  isNUM(node) {
    return /^(-?\d+)(\.\d+)?$/.test(node);
  },
  toNUM(node) {
    return parseFloat(node);
  },

  /**
   * 可执行的
   */
  isEXE(node) { 
    return typeof node === 'function';
  },
  /**
   * 语法树节点
   */
  isNODE(node) {
    return node instanceof Node;
  },
  // 变量
  isVAR(node) {
    return !(node instanceof Node);
  },

  // 自定义函数
  isFN(node) {
    return node instanceof Fn;
  },

  // 判断是否为真
  isTRUE(node) {
    return node !== false;
  },

  // define 语句
  isDEF(node) {
    return node.childNodes[0] === 'define';
  },
  // if
  isIF(node) {
    return node instanceof Node && node.childNodes[0] === 'if';  
  },
  //cons
  isCONS(node) {
    return node.childNodes[0] === 'cons';
  }
}