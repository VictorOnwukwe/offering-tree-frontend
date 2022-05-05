export const getRandomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const parseToNumber = (val: string | number) =>
  typeof val === "string" ? parseInt(val || "0") : val;
