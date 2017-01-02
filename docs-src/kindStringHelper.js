
module.exports =
function kindStringHelper(kindString) {
  if (kindString === 'External module') {
    return 'Module';
  }

  return kindString;
}
