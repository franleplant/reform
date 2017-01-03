const typeHelper = require('./typeHelper');
const commentsHelper = require('./commentsHelper')
const itemTitleHelper = require('./itemTitleHelper');

module.exports =
function typeLiteralHelper(item = {}, inline, indent = 0) {

  if (item.name === '__type') {
    inline = true;
  }

  const content = [];

  if (item.children) {
    content.push(item.children.map(child => {
        const value = require('./itemHelper')(child, true);
        return `${child.name}: ${value}`
      })
      .join(';\n')
    )
  }

  if (item.indexSignature) {
    content.push(item.indexSignature.map(ind => {
      const params = ind.parameters
      const param = params[0]
      return `\\[${param.name}: ${require('./typeHelper')(param.type, true)}\\]: ${require('./typeHelper')(ind.type)}`
    })
    .join(';\n')
    )
  }


  if (inline) {
    return [
      '{',
      ...content,
      '}',
    ]
    .join('\n')
    .split('\n')
    .map((s, i, arr) => i === 0 || i + 1 === arr.length ? s : `${" ".repeat(indent)}${s}`)
    .join('\n');
  }

  const obj = [
    '<big><pre>',
    '{',
    indices,
    children,
    '}',
    '</big></pre>',
  ]

  return [
    `## ${itemTitleHelper(item)}`,
    `${commentsHelper(item.comment)}`,
    ...obj,
  ].join('\n');
}



 //{
          //"id": 31,
          //"name": "__type",
          //"kind": 65536,
          //"kindString": "Type literal",
          //"flags": {},
          //"children": [
            //{
              //"id": 33,
              //"name": "errors",
              //"kind": 32,
              //"kindString": "Variable",
              //"flags": {},
              //"sources": [
                //{
                  //"fileName": "types.ts",
                  //"line": 37,
                  //"character": 10
                //}
              //],
              //"type": {
                //"type": "reference",
                //"name": "FormErrors",
                //"id": 18
              //}
            //},
            //{
              //"id": 32,
              //"name": "fields",
              //"kind": 32,
              //"kindString": "Variable",
              //"flags": {},
              //"sources": [
                //{
                  //"fileName": "types.ts",
                  //"line": 36,
                  //"character": 10
                //}
              //],
              //"type": {
                //"type": "reference",
                //"name": "Fields",
                //"id": 21
              //}
            //},
            //{
              //"id": 34,
              //"name": "formIsDirty",
              //"kind": 32,
              //"kindString": "Variable",
              //"flags": {
                //"isOptional": true
              //},
              //"sources": [
                //{
                  //"fileName": "types.ts",
                  //"line": 38,
                  //"character": 15
                //}
              //],
              //"type": {
                //"type": "instrinct",
                //"name": "boolean"
              //}
            //}
          //],
          //"groups": [
            //{
              //"title": "Variables",
              //"kind": 32,
              //"children": [
                //33,
                //32,
                //34
              //]
            //}
          //],
          //"sources": [
            //{
              //"fileName": "types.ts",
              //"line": 35,
              //"character": 8
            //}
          //]
        //}
