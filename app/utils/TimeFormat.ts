export const plainTime = (isoDate: string) => {
  // Create a Date object from the ISO string
  const date = new Date(isoDate);

  // Get the parts of the date
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours(); // Get hours in 24-hour format
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert hour to 12-hour format
  hours = hours ? hours : 12; // If hours is 0, set it to 12
  const minutesFormatted = minutes.toString().padStart(2, "0"); // Format minutes with leading zero
  const secondsFormatted = seconds.toString().padStart(2, "0"); // Format seconds with leading zero

  // Format the date as "Month Day, Year"
  const formattedDate = `${day}-${month}-${year}`;
  // Format the time as "hh:mm:ss AM/PM"
  const formattedTime = `${hours}:${minutesFormatted}:${secondsFormatted} ${ampm}`;

  return formattedDate + " " + formattedTime;
};
