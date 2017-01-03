const fs = require('fs')
const docsContent = require('../docsContent.json');


const FIRST_CHILDREN_ORDER = {
  'index': 1,
  'core': 2,
  'reactHelpers': 3,
  'reactMixins': 5,
  'validators': 6,
  'types': 7,
  'officialValidators/index': 8,
  'utils': 200,
}

const removeQuotes = str => str.replace(/"/g, '')
function removeQuotesFromName(module) {
  module.name = removeQuotes(module.name)
  return module;
}

function ignoredModules(module) {
  //TODO dont ignore but push the bottom
  //if (module.name.includes('officialValidators') && module.name !== 'officialValidators/index') {
    //return false;
  //}

  return true
}

function hiddenDeclarations(dec) {
  if (dec.comment && JSON.stringify(dec.comment).includes('@hidden')) {
    return false
  }

  return true
}

docsContent.children = docsContent.children
  .map(removeQuotesFromName)
  .filter(ignoredModules)
  .sort((a, b) => {
    const a_order = FIRST_CHILDREN_ORDER[a.name] || 100;
    const b_order = FIRST_CHILDREN_ORDER[b.name] || 100;
    return a_order > b_order ? 1 : -1;
  })
  .map(module => {
    module.children = (module.children || [])
      .filter(hiddenDeclarations)

    return module;
  });


module.exports = docsContent;
