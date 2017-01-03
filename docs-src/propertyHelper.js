const typeHelper = require('./typeHelper');


module.exports =
function propertyHelper(item = {}, inline, indent) {
  return `${item.name}: ${require('./typeHelper')(item.type, true, indent)}`
}
