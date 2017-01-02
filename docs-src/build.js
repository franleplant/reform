const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars');
require('./helpers')
const docsContent = require('./data');

const partialsDir = __dirname + '/view'

const toCompile = [
  {
    tplFileName: '/API.hbs',
    outputFileName: '../API.md',
    data: docsContent,
  },
  {
    tplFileName: '/README.hbs',
    outputFileName: '../README.md',
  },
]

partialsBootstrap();

toCompile.forEach(config => {
  const tplFileName = path.resolve(partialsDir + config.tplFileName);
  const outputFileName = path.resolve(__dirname, config.outputFileName);
  console.log(`COMPILING ${tplFileName} -> ${outputFileName}`)

  const template = fs.readFileSync(tplFileName, 'utf-8');
  const result = Handlebars.compile(template)(config.data);
  fs.writeFileSync(outputFileName, result, 'utf-8');
  //console.log(result);
  console.log("SUCCESS")
})


function partialsBootstrap() {
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach(function (filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    Handlebars.registerPartial(name, template);
  });
}
