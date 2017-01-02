const commonTags = require('common-tags');

module.exports = 
function commentsHelper(comment = {}) {
  const { shortText = '', text = ''} = comment;
  const comments = shortText + '\n\n' + text;
  const tags = comment.tags || [];

  const result = commonTags.stripIndents`

    ${comments}

    ${tags.length ? 'Tags' : '' }

    ${tags.map(tag => commonTags.stripIndent`
        - ${tag.tag} ${tag.text}
      `).join('\n')
    }

  `;

  return result;
}

