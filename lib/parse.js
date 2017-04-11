'use strict';

const Node = require('./node');

class Stack extends Array {
  get isEmpty() {
    return this.length === 0;
  }
  get top() {
    return this[this.length - 1];
  }
}


function parse(code) {

  let root = [];
  let index = 0;
  let col = 0;
  let line = 0;
  let len = code.length;
  let stack = new Stack();
  let str = '';


  for(;index < len; index++) {
    col++;
    let char = code[index];

    // 碰到(直接创建一个节点, 推入栈中
    if(char === '(') {
      str = '';
      stack.push(new Node());
      continue;
    }

    // 出栈
    if(char === ')') {
      if(str) {
        stack.top.childNodes.push(str);
        str = '';
      }
      
      // 判断是否多了一个)
      if(stack.isEmpty) {
        throw new Error(`${line}行${col}列多了一个 )🙃`);
      }

      // 出栈 然后压到下一个栈, 或者压到树根
      let child = stack.pop();

      if(stack.isEmpty) {
        root.push(child);
      } else {
        stack.top.childNodes.push(child);
      }
      continue;
    }

    // 不为空就加字符串啊.
    if(char !== ' ' && char !== '\n') {
      str += char;
    }

    if((char === ' ' || char === '\n') && str) {
      stack.top.childNodes.push(str);
      str = '';
    } else if(char === '\n') {
      line++; // 行+1
      col = 0; // 列置零
    }
  }

  if(!stack.isEmpty) {
    throw new Error('🙃语法错误: 你可能漏了一个 )');
  }
  if(str) {
    root.push(str);
  }
  return root;
}


module.exports = parse;