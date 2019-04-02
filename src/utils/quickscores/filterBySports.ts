import { matchSport } from "./matchSport";

export const filterBySports = (sports: any[]) => (data: any[]) => {
  if (sports.length === 1) {
    return data.filter(value => {
      return matchSport(sports[0], value.Sport);
    });
  }

  return data.filter((game: any) => {
    return sports.some(sport => {
      return matchSport(sport, game.Sport);
    });
  });
};
