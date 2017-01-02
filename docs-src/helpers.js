const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars');
const commonTags = require('common-tags');
const commentsHelper = require('./commentsHelper');
const itemTitleHelper = require('./itemTitleHelper');
const objectHelper = require('./objectHelper');
const srcHelper = require('./srcHelper');
const itemHelper = require('./itemHelper');

Handlebars.registerHelper({
  ifEqual: function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  includeFile: function(filePath) {
    const file = fs.readFileSync(filePath, 'utf8');
    return file;
  },

  noNewLines: function(options) {
    let str = options.fn(this);
    return str.replace(/\n/g, '');
  },
  noWhitespace: function(options) {
    let str = options.fn(this);
    return str.replace(/\s*/g, 'a');
  },
  trimWhitespace: function(options) {
    let str = options.fn(this);
    return str.split('\n').map(line => line.trim()).join('\n')
  },

  item: itemHelper,
});
