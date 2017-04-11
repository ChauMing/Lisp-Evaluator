const Node = require('./node');

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
   * 函数
   */
  isFN(node) {
    return node instanceof Node;
  },
  // 变量
  isVAR(node) {
    return !(node instanceof Node);
  },
  isTRUE(node) {
    return node !== false;
  },
  isDEF(node) {
    return node.childNodes[0] === 'define';
  },
  isIF(node) {
    return node instanceof Node && node.childNodes[0] === 'if';  
  }
}