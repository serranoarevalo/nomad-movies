import { BG_COLOR } from "./colors";

export const MONTHS = [
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
  "December"
];

export const HeaderStyles = {
  headerStyle: {
    backgroundColor: BG_COLOR,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: "white"
  },
  headerTintColor: "white"
};

export const formatDate = date => {
  const cleanDate = new Date(
    date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
  );
  return `${cleanDate.getDate()} ${
    MONTHS[cleanDate.getMonth()]
  } ${cleanDate.getFullYear()}`;
};
