const commonTags = require('common-tags');
const typeHelper = require('./typeHelper');
const itemTitleHelper = require('./itemTitleHelper');
const commentsHelper = require('./commentsHelper');


function fnSignatureHelper(item) {
  const params = (item.parameters || []).map(param => `${param.name}: ${typeHelper(param.type)}`).join(', ');
  const signature = `(${params}): ${typeHelper(item.type)}`;

  // Special case for inline, anonymous function signaruters in interfaces
  if (item.name === '__call') {
    return signature
  }

  return `${item.name}${signature}`;
}


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


fnHelper.fnSignatureHelper = fnSignatureHelper;
module.exports = fnHelper;
