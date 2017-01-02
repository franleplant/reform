const fnHelper = require('./fnHelper');
const variableHelper = require('./variableHelper');
const moduleHelper = require('./moduleHelper');
const interfaceHelper = require('./interfaceHelper');
const propertyHelper = require('./propertyHelper');
const typeLiteralHelper = require('./typeLiteralHelper');


module.exports =
function itemHelper(item, inline = false) {
  switch (item.kindString) {
    case 'Function':
      return fnHelper(item, inline)
    case 'Object literal':
      const objectHelper = require('./objectHelper')
      return objectHelper(item, inline)
    case 'Variable':
      return variableHelper(item, inline)
    case "External module":
      return moduleHelper(item, inline)
    case 'Interface':
      return interfaceHelper(item, inline)
    case 'Property':
      return propertyHelper(item, inline)
    case 'Type literal':
      return typeLiteralHelper(item, inline)
    default:
      return ''
  }
}
