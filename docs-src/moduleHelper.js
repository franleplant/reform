const commonTags = require('common-tags');
const absoluteToRelativePathHelper = require('./absoluteToRelativePathHelper');
const itemTitleHelper = require('./itemTitleHelper')


module.exports =
function moduleHelper(item = {}, inline) {
  const filePath = absoluteToRelativePathHelper(item.originalName);

  return commonTags.stripIndent`
    # ${itemTitleHelper(item)}

  `;
}
