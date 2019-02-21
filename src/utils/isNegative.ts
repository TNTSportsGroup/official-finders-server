export const isNegative = (amount: string) => {
  const regex = /^\$-/;

  const result = amount.match(regex);

  return !!result;
};
