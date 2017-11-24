import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

export default function includeFile(inputFile: string, outputFile: string) {
  const template = fs.readFileSync(path.resolve(__dirname, inputFile), {
    encoding: "utf-8",
  });
  const match = template.match(/{{includeFile ([^}]*)}}/);
  assert(match.length > 1, "includeFile: bad match");
  const includeDirective = match[0];
  const includeFileName = match[1];
  assert(
    includeFileName[0] === "'",
    "includeFile: unexpected file name delimitator"
  );
  assert(
    includeFileName[includeFileName.length - 1] === "'",
    "includeFile: unexpected file name delimitator"
  );
  const includeFilePath = path.resolve(
    __dirname,
    "../",
    includeFileName.slice(1, -1)
  );
  console.log(`BUILD README: found includeFile: ${includeFilePath}`);

  const includeFileContent = fs.readFileSync(includeFilePath, {
    encoding: "utf-8",
  });
  const outputFileContent = template.replace(
    includeDirective,
    includeFileContent
  );
  const outputFilePath = path.resolve(__dirname, outputFile);
  fs.writeFileSync(outputFilePath, outputFileContent, { encoding: "utf-8" });
  console.log(`BUILD README: wrote successfully ${outputFilePath}`);
}
