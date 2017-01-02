
module.exports =
//TODO not inline mode
function typeLiteralHelper(item = {}, inline) {
  return `${item.name}`
  //const children = item.children.map(child => `
    //${commentsHelper(child.comment)}

    //- ${child.name}: ${itemHelper(child, true).replace(/\n/g, '')}

    //`).join('\n')

  //let str = `
    //\`{\`

      //${children}

    //\`}\`
  //`

  //return str;

}



