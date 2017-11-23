module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  mapCoverage: true,

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/", "/examples/", "/examples-ts/"]
}
