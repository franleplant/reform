import sinon from 'sinon'

describe("Date", () => {
  it("should be defined!", () => {
    console.log("\nIm the Date object")
    console.log(typeof Date)
    console.log(Date)
    expect(Date).toBeDefined();
  })
})
