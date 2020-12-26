export const humanReadableDate = (time: number) => {
  const date: Date = new Date(time);
  console.log(date, time)
  return `${padd(date.getHours())}:${padd(date.getMinutes())} ${padd(
    date.getDate()
  )}.${padd(date.getMonth())}.${date.getFullYear()}`;
};

export const padd = (elem: number): string => (elem < 10 ? `0${elem}` : `${elem}`);
