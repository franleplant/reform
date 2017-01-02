const commonTags = require('common-tags');
const srcHelper = require('./srcHelper');
const kindStringHelper = require('./kindStringHelper');


module.exports =
function itemTitleHelper(item) {
  const kindString = kindStringHelper(item.kindString);

  return commonTags.oneLine`
    ${item.name}
    <small>${kindString} [src](${srcHelper(item.sources)})</small>
    ${item.id ? `<a id="#${item.id}"></a>` : '' }
  `;
}
