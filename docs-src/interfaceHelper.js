const commentsHelper = require('./commentsHelper')
const itemTitleHelper = require('./itemTitleHelper');
const itemHelper = require('./itemHelper');
const typeHelper = require('./typeHelper');
const fnHelper = require('./fnHelper')


module.exports =
function interfaceHelper(item = {}, inline){

  const content = [];

  if (item.children) {
    content.push(item.children.map(child => {
        return `${require('./itemHelper')(child, true, 2)}`
      })
      .join(';\n')
    )
  }

  if (item.indexSignature) {
    content.push(item.indexSignature.map(ind => {
        const params = ind.parameters
        const param = params[0]
        return `\\[${param.name}: ${typeHelper(param.type, true)}\\]: ${typeHelper(ind.type)}`
      })
      .join(';\n')
    )
  }

  if (item.signatures) {
    content.push(item.signatures.map(sig => {
        return `${fnHelper.fnSignatureHelper(sig)}`;
      })
      .join(';\n')
    )
  }

  const obj = [
    '<big><pre>',
    '{',
    ...content,
    '}',
    '</big></pre>',
  ]

  if (inline) {
    return obj.join('\n');
  }

  return [
    `## ${itemTitleHelper(item)}`,
    `${commentsHelper(item.comment)}`,
    ...obj,
  ].join('\n');
}
