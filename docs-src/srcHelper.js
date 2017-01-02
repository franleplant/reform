
module.exports =
function srcHelper(sources) {
  const src = sources[0];
  return `./src/${src.fileName}#L${src.line}`
}
