const path = require('path')

module.exports =
function absoluteToRelativePathHelper(absolutePath) {
  const root = path.resolve(__dirname, '../');
  return './' + path.relative(root, absolutePath)
}
