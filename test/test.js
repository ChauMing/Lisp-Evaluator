const fs = require('fs');
const evaluator = require('../index');
const path = require('path');


fs.readFile(path.resolve(__dirname, 'test.scm'), (error, data) => {
  if(error) {
    return console.error(error);
  }
  let result = evaluator(data.toString());
  console.log(result.toString());
})