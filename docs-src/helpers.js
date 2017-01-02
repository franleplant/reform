const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars');

Handlebars.registerHelper({
  ifEqual: function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  includeFile: function(filePath) {
    const file = fs.readFileSync(filePath, 'utf8');
    return file;
  },

  noNewLines: function(options) {
    let str = options.fn(this);
    return str.replace(/\n/g, '');
  },
  noWhitespace: function(options) {
    let str = options.fn(this);
    return str.replace(/\s*/g, 'a');
  },
  trimWhitespace: function(options) {
    let str = options.fn(this);
    return str.split('\n').map(line => line.trim()).join('\n')
  },

  absoluteToRelativePath: absoluteToRelativePathHelper,
  comments: commentsHelper,
  fn: fnHelper,
  fnSignature: fnSignatureHelper,
  type: typeHelper,
  src: srcHelper,
  kind: kindHelper,
  item: itemHelper,
  module: moduleHelper,
});

function absoluteToRelativePathHelper(absolutePath) {
  const root = path.resolve(__dirname, '../');
  return './' + path.relative(root, absolutePath)
}
function commentsHelper(comment = {}) {
  const res = Object.keys(comment).map(id => comment[id]).join('\n\n')
  return res;
}
function kindHelper(kind) {
  if (kind === 'External module') {
    return 'Module';
  }

  return kind;
}

function srcHelper(sources) {
  const src = sources[0];
  return `./src/${src.fileName}#L${src.line}`
}

function typeHelper(type = {}) {
  //Special case for re exported modules
  if (type.type === 'reference' && type.name.includes('/src/')) {
    const name = absoluteToRelativePathHelper(type.name.replace(/"/g,''))
    return `[${name}](#${type.id})`
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

function fnSignatureHelper(item) {
  const params = item.parameters.map(param => `${param.name}: ${typeHelper(param.type)}`).join(', ');
  return `${item.name}(${params}): ${typeHelper(item.type)}`;
}

function fnHelper(item = {}, inline) {
  if (inline) {
    return (item.signatures || []).map(sign => `${fnSignatureHelper(sign)}`).join(' | ')
  }

  return (item.signatures || []).map(sign => (
`
## ${itemTitleHelper(item)}
${commentsHelper(sign.comment)}

${fnSignatureHelper(sign)}
`
  )).join('\n\n')
}

function objectHelper(item = {}, inline) {
  const children = item.children.map(child => `
    ${commentsHelper(child.comment)}

    - ${child.name}: ${itemHelper(child, true).replace(/\n/g, '')}

    `).join('\n')

  let str = `
    \`{\`

      ${children}

    \`}\`
  `

  if (!inline) {
    str = (
`
## ${itemTitleHelper(item)}

${commentsHelper(item.comment)}

${str}
`
    )
  }

  return str;
}

function variableHelper(item ={}) {
  if (item.name === 'validators') {
    return '[./src/validators](./src/validators)'
  }

  return `${typeHelper(item.type)}`
}

function moduleHelper(item = {}, inline) {
			//"id": 178,
			//"name": "\"core\"",
			//"kind": 1,
			//"kindString": "External module",
			//"flags": {
				//"isExported": true
			//},
			//"originalName": "/Users/flp/code/reform5/src/core.ts",

  const filePath = absoluteToRelativePathHelper(item.originalName);

  return (
`# ${itemTitleHelper(item)}

`
  );
}

function interfaceHelper(item ={}, inline){
  return `## ${itemTitleHelper(item)}
  ${commentsHelper(item.comment)}
  
  `
  //let rest = '';

  //if (item.indexSignature) {
    //const res = item.indexSignature.map(ind => {
      //const params = ind.parameters
      //const param = params[0]
      //return `\\[${param.name}: ${typeHelper(param.type, true)}\\]: ${typeHelper(ind.type)}`
    //})
    //.join(';\n')

    //rest += res;
  //}

  //if (item.children) {
    //const res = item.children.map(child => {
      //return `${itemHelper(child, true)}`
    //})
    //.join(';\n\n')
    //rest += res;
  //}

  //return `

     //\`{\`

     //${rest}

     //\`}\`
  //`

}

//TODO not inline mode
function typeLiteralHelper(item = {}, inline) {
  return `${item.name}`
  //const children = item.children.map(child => `
    //${commentsHelper(child.comment)}

    //- ${child.name}: ${itemHelper(child, true).replace(/\n/g, '')}

    //`).join('\n')

  //let str = `
    //\`{\`

      //${children}

    //\`}\`
  //`

  //return str;

}


function propertyHelper(item = {}, inline) {
  return `${item.name}: ${typeHelper(item.type)}`
}

function itemTitleHelper(item) {
  let title = `${item.name} `

  const kind = item.kindString === 'External module' ? 'Module' : item.kindString;
  const src = srcHelper(item.sources);
  title += `<small>${kind} [src](${src})</small> `

  if (item.id) {
    title += `<a id="#${item.id}"></a>`
  }

  return title;
}

function itemHelper(item, inline = false) {
  switch (item.kindString) {
    case 'Function':
      return fnHelper(item, inline)
    case 'Object literal':
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
