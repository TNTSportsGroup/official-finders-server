import dayjs from "dayjs";
import { matchSeasonAndYear } from "./matchSeasonAndYear";
import { filterBy } from "./filterBy";

import { QuickScoreReq, IEvent, IGameData } from "./request";
import { ILeagueTable } from "./types";

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba",
  GENEVA_PARK_DISTRICT: "genevaparks",
  GIRLS: "girls",
  WHEATON_PARK_DISTRICT: "wheaton",
  CAROL_STREAM_PARK_DISTRICT: "csparks"
};

export async function getUpcomingGames(season: string, year: number) {
  const seasonToFilterBy = matchSeasonAndYear("Winter", 2019);
  const filterByLeagueSeason = filterBy<IEvent>(league =>
    seasonToFilterBy(league.Season)
  );

  const todaysDate = dayjs().format("YYYY-MM-DD");

  const filterByDate = filterBy<IGameData>(game => game.Date >= todaysDate);

  const demo = new QuickScoreReq(
    QUICKSCOREDIR.GLEN_ELLYN_PARK_DISTRICT,
    process.env.GLEN_ELLYN_PARK_DISTRICT
  );

  // Get event list
  const data = await demo.eventList();

  // TODO if carol stream only get soccer volleyball hockey dodgeball

  // filter by the season

  const seasonSchedule = filterByLeagueSeason(data);

  let upcomingGames: ILeagueTable = {};

  for (let league of seasonSchedule) {
    upcomingGames[league.LeagueID] = [];

    let { RegularGameData, LeagueName } = await demo.scheduleInfo(
      league.LeagueID
    );

    let newData = filterByDate(RegularGameData);

    newData.forEach(game => {
      upcomingGames[league.LeagueID].push({
        GameID: game.GameID,
        LeagueName,
        Date: game.Date,
        Time: game.Time,
        LocationName: game.LocationName,
        HomeTeam: game.TeamName1,
        AwayTeam: game.TeamName2
      });
    });
  }

  return upcomingGames;
}
