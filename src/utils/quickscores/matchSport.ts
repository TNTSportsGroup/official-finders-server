export const matchSport = (sport: string, str: string) => {
  let regxp = `${sport}`;

  const seasonRegularExpression = new RegExp(regxp, "g");

  const matches = str.match(seasonRegularExpression);

  return !!matches;
};
