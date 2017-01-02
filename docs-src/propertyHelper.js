const typeHelper = require('./typeHelper');


module.exports =
function propertyHelper(item = {}, inline) {
  return `${item.name}: ${typeHelper(item.type)}`
}
