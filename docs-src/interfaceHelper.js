const commentsHelper = require('./commentsHelper')
const itemTitleHelper = require('./itemTitleHelper');
const typeHelper = require('./typeHelper');


module.exports =
function interfaceHelper(item ={}, inline){
  return `## ${itemTitleHelper(item)}
  ${commentsHelper(item.comment)}
  
  `
  //let rest = '';

  //if (item.indexSignature) {
    //const res = item.indexSignature.map(ind => {
      //const params = ind.parameters
      //const param = params[0]
      //return `\\[${param.name}: ${typeHelper(param.type, true)}\\]: ${typeHelper(ind.type)}`
    //})
    //.join(';\n')

    //rest += res;
  //}

  //if (item.children) {
    //const res = item.children.map(child => {
      //return `${itemHelper(child, true)}`
    //})
    //.join(';\n\n')
    //rest += res;
  //}

  //return `

     //\`{\`

     //${rest}

     //\`}\`
  //`

}
