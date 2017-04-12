let fs = require('fs')
let path = require('path');
let evaluator = require('../index');

let file = path.resolve(process.cwd(), process.argv[2]);

fs.readFile(file, (error, data) => {
  if(error) {
    return console.error(error);
  }
  let code = data.toString();
  let result = evaluator(code);
  console.log(result);
})