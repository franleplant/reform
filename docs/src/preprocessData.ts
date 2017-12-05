import { Node } from "./types";

const FIRST_CHILDREN_ORDER = {
  index: 1,
  core: 2,
  reactHelpers: 3,
  reactMixins: 5,
  validators: 6,
  types: 7,
  "officialValidators/index": 8,
  utils: 200,
};

const removeQuotes = (str: string) => str.replace(/"/g, "");

function removeQuotesFromName(module: Node) {
  module.name = removeQuotes(module.name);
  return module;
}

function ignoredModules(_module: Node) {
  //TODO dont ignore but push the bottom
  //if (module.name.includes('officialValidators') && module.name !== 'officialValidators/index') {
  //return false;
  //}

  return true;
}

function hiddenDeclarations(dec: Node) {
  if (dec.comment && JSON.stringify(dec.comment).includes("@hidden")) {
    return false;
  }

  return true;
}

export default function preprocessData(docsContent: Node): Node {
  docsContent.children = docsContent.children
    .map(removeQuotesFromName)
    .filter(ignoredModules)
    .sort((a: Node, b: Node) => {
      const a_order = FIRST_CHILDREN_ORDER[a.name] || 100;
      const b_order = FIRST_CHILDREN_ORDER[b.name] || 100;
      return a_order > b_order ? 1 : -1;
    })
    .map((module: Node) => {
      module.children = (module.children || []).filter(hiddenDeclarations);

      return module;
    });

  return docsContent as Node;
}
