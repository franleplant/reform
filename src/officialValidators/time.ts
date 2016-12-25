// Official docs https://www.w3.org/TR/html5/infrastructure.html#valid-date-string
import { parseTime } from '../utils';

// Example "02:00"
export const time = (value: string) => !!value && Number.isNaN(parseTime(value));
