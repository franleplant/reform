const commonTags = require('common-tags');
const typeHelper = require('./typeHelper');
const itemTitleHelper = require('./itemTitleHelper');
const commentsHelper = require('./commentsHelper');


function fnSignatureHelper(item) {
  const params = item.parameters.map(param => `${param.name}: ${typeHelper(param.type)}`).join(', ');
  return `${item.name}(${params}): ${typeHelper(item.type)}`;
}


module.exports =
function fnHelper(item = {}, inline) {
  if (inline) {
    return (item.signatures || []).map(sign => `${fnSignatureHelper(sign)}`).join(' | ')
  }

  const signatures = item.signatures.map(sign => [
      ``,
      `${commentsHelper(sign.comment)}`,
      ``,
      `<big><pre>`,
      `${fnSignatureHelper(sign)}`,
      `</pre></big>`,
      ``,
      ].join('\n')
  );

  return [
    `## ${itemTitleHelper(item)}`,
    ...signatures,
  ].join('\n')
}
