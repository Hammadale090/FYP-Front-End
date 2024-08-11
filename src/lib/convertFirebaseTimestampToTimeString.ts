import moment from "moment";
function convertFirebaseTimestampToTimeString(timestamp: any) {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = (hours % 12) + ":" + minutes.substr(-2) + " " + ampm;
  return formattedTime;
}
export default convertFirebaseTimestampToTimeString;
export function formatTimestamp(_timestamp: any) {
  const timestamp = moment.unix(_timestamp.seconds);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  if (timestamp.isSame(today, "d")) {
    return "Today";
  } else if (timestamp.isSame(yesterday, "d")) {
    return "Yesterday";
  } else {
    return timestamp.format("MMM D, YY");
  }
}
