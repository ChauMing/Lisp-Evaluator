const fs = require('fs');
const evaluator = require('../index');

fs.readFile('./test.scm', (error, data) => {
  if(error) {
    return console.error(error);
  }
  let result = evaluator(data.toString());
  console.log(result);
})