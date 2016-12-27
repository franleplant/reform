/**
 *  Quick and dirty script to replace 
 *  ```replaceFile
 *  filePath
 *  ```
 *
 *  with the content of the actual file
 *
 */
const fs = require('fs');


const README = './README.md';
const README_TEMPLATE = './README_TEMPLATE.md';
const START_DELIMITER = "```replaceFile";
const END_DELIMITER = "```";
console.log(`Building README...
from template ${README_TEMPLATE} into ${README},
with delimiters set to
${START_DELIMITER}
${END_DELIMITER}
`)

let file = fs.readFileSync(README_TEMPLATE, 'utf8');

let start_index = 0;
let end_index = 0;
while ( (start_index = file.indexOf(START_DELIMITER, end_index)) !== -1) {
  end_index = file.indexOf(END_DELIMITER, start_index + START_DELIMITER.length);
  const fileNameToReplace = file.slice(start_index + START_DELIMITER.length, end_index).trim();
  const fileToReplace = fs.readFileSync(fileNameToReplace, 'utf8');
  file = file.substring(0, start_index) + fileToReplace + file.substring(end_index + END_DELIMITER.length, file.length)
  end_index = start_index + fileToReplace.lenght;
}

fs.writeFileSync(README, file, 'utf8');

console.log("Success!!!")
