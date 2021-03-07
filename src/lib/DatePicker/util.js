const getYearMonthDay = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
};
const getDate = (year, month, day) => {
  return new Date(year, month, day);
};
export { getYearMonthDay, getDate };
