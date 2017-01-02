const absoluteToRelativePathHelper = require('./absoluteToRelativePathHelper.js');



module.exports =
function typeHelper(type = {}) {
  //Special case for re exported modules
  if (type.type === 'reference' && type.name.includes('/src/')) {
    const name = absoluteToRelativePathHelper(type.name.replace(/"/g,''))
    return `[${name}](#user-content-#${type.id})`
  }

  if (type.type === 'union') {
    return type.types.map(t => typeHelper(t)).join(' | ');
  }

  if (type.type === 'stringLiteral') {
    return 'String'
  }

  if (type.name === "(Anonymous function)") {
    return 'Function'
  }

  //TODO "type": "reflection",

  // sums are broken
  //if (type.type === 'unknown' && type.name.includes('&')) {
    //return type.name.split('&').map(s => s.trim()).map(t => typeHelper(t)).join(' & ');
  //}

  let typeStr;
  if (type.id) {
    typeStr = `[${type.name}](#${type.id})`
  } else {
    typeStr = `${type.name}`
  }

  if (type.typeArguments || type.typeParameters) {
    const tas = (type.typeArguments || type.typeParameters).map(ta => typeHelper(ta)).join(', ')

    typeStr += `\\<${tas}\\>`
  }


  return typeStr;
}
