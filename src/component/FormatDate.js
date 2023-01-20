export const FormatDate = (dateString) => {
  const myDate = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()) +
    " " +
    (months[myDate.getMonth()]) +
    " " +
    myDate.getFullYear()
  );
};
