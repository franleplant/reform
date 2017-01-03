const fnHelper = require('./fnHelper');
const variableHelper = require('./variableHelper');
const moduleHelper = require('./moduleHelper');
const objectHelper = require('./objectHelper');
const interfaceHelper = require('./interfaceHelper');
const propertyHelper = require('./propertyHelper');
const typeLiteralHelper = require('./typeLiteralHelper');


module.exports =
function itemHelper(item, inline = false, indent = 0) {
  switch (item.kindString) {
    case 'Function':
      return fnHelper(item, inline)
    case 'Object literal':
      return require('./objectHelper')(item, inline)
    case 'Variable':
      return variableHelper(item, inline)
    case "External module":
      return moduleHelper(item, inline)
    case 'Interface':
      return require('./interfaceHelper')(item, inline)
    case 'Property':
      return propertyHelper(item, inline, indent)
    case 'Type literal':
      return typeLiteralHelper(item, inline, indent)
    default:
      return ''
  }
}
