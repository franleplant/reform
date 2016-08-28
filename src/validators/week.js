// Official docs https://www.w3.org/TR/html5/infrastructure.html
// 2.4.5.8 Weeks

// Example week: "2016-W33"
// TODO: this needs to be improved since some years have 52 weeks
const MAX_WEEK = 53
export default function weekValidator(control) {
  const value = control.value
  let [ year, weekstr ] = value.split("-");
  year = parseInt(year, 10)

  // Error if weekstr is not defined
  if (!weekstr) {
    return true
  }
  // We remove the "W" from "W33"
  let week = weekstr.slice(1)
  week = parseInt(week, 10)

  if (!Number.isFinite(year) || !Number.isFinite(week)) {
    return true
  }

  return !(0 < year && 1 <= week && week <= MAX_WEEK)
}
