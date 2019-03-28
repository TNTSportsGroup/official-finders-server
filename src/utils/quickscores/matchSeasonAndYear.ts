export const matchSeasonAndYear = (season: string, year: number) => (
  str: string
): boolean => {
  let regxp = `${season}\\s(${year - 1}-${year}|${year}-${year + 1}|${year})`;

  const seasonRegularExpression = new RegExp(regxp, "g");

  const matches = str.match(seasonRegularExpression);

  return !!matches;
};
