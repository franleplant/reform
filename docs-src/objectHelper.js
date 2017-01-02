const commonTags = require('common-tags');
const itemHelper = require('./itemHelper');
const itemTitleHelper = require('./itemTitleHelper');
const commentsHelper = require('./commentsHelper');

module.exports =
function objectHelper(item = {}, inline) {
  const obj = [
    '<big><pre>',
    '{',
    item.children
      .map(child => `${child.name}: ${require('./itemHelper')(child, true).replace(/\n/g, '')}`)
      .join('\n'),
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
