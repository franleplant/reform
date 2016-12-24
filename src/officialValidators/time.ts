// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string

// Example "02:00"
// Hack to make parsing times easier
// TODO: review this
const BASE_DATE = "1970-01-01"
export const time = (value: string) => !!value && Number.isNaN(Date.parse(BASE_DATE + ' ' + value));
