const commonTags = require('common-tags');

module.exports =
function commentsHelper(comment = {}) {
  const { shortText = '', text = ''} = comment;


  const content = [];
  if (comment.shortText && comment.text) {
    content.push(comment.shortText);
    content.push('');
    content.push(comment.text);

  } else if (comment.shortText) {
    content.push(comment.shortText);
  } else if (comment.text) {
    content.push(comment.text);
  }

  const tags = comment.tags || [];
  const contentTags = [];
  if (tags.length) {
    contentTags.push('Tags');
    contentTags.push('\n');
    contentTags.push(tags.map(tag => `- ${tag.tag} ${tag.text}`).join('\n'))
  }

  return [
    ...content,
    '',
    ...contentTags,
  ].join('\n')
}

