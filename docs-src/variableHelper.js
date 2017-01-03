const typeHelper = require('./typeHelper');


module.exports =
function variableHelper(item = {}) {
  if (item.name === 'validators') {
    return '[./src/validators](./src/validators)'
  }

  return `${require('./typeHelper')(item.type)}`
}
