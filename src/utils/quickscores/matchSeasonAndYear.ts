export const matchSeasonAndYear = (season: string, year: number) => (
  str: string
) => {
  let regxp = `${season}\\s(${year - 1}-${year}|${year}-${year + 1}|${year})`;

  const seasonRegularExpression = new RegExp(regxp, "g");

  const [firstMatch] = str.match(seasonRegularExpression);

  return firstMatch;
};
