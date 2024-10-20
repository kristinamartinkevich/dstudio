export const getUTCTimestamp = (date: Date) => {
  const UTCTimestamp = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ),
  ).toISOString();

  return UTCTimestamp;
};

export const UTCToDate = (dateString: string) => {
  return new Date(dateString).toISOString().split("T")[0];
};
