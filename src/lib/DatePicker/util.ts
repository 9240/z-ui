const getYearMonthDay = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
};
const getDate = (year: number, month: number, day: number) => {
  return new Date(year, month, day);
};
export { getYearMonthDay, getDate };
