export const isNegative = (amount: string) => {
  // check if strings starts with $-
  // this will indicate that it's a negative number.
  const regex = /^\$-/;

  const result = amount.match(regex);

  return !!result;
};
