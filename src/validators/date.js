// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string

console.log("FAILING DATE")
console.log(Date, typeof Date)
export default function dateValidator(control) {
  const date = Date.parse(control.value);
  return Number.isNaN(date);
}
