export const filterBySeason = (data: any, season: string) => {
  return data.filter(league => league.Season === season);
};
