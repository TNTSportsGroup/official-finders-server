import dayjs from "dayjs";
import { matchSeasonAndYear } from "./matchSeasonAndYear";
import { filterBy } from "./filterBy";
import { QuickScoreDistrict } from "./request";
import { ILeagueTable, IQuickScoresEvent, IQuickScoresGameData } from "./types";
import { resolve } from "url";
import { filterBySports } from "../../../build/src/utils/quickscores/filterBySports";

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba",
  GENEVA_PARK_DISTRICT: "genevaparks",
  GIRLS: "girls",
  WHEATON_PARK_DISTRICT: "wheaton",
  CAROL_STREAM_PARK_DISTRICT: "csparks"
};

interface UpcomingGamesOptions {
  districtFilterOptions: {
    [key: string]: {
      filterBySports: (any) => IQuickScoresEvent[];
    };
  };
}

export async function getUpcomingGames(
  season: string,
  year: number,
  options?: UpcomingGamesOptions
) {
  // season and year to filterBy
  const seasonToFilterBy = matchSeasonAndYear(season, year);

  // filter by Season
  const filterByLeagueSeason = filterBy<IQuickScoresEvent>(league =>
    seasonToFilterBy(league.Season)
  );

  const todaysDate = dayjs().format("YYYY-MM-DD");

  const filterByDate = filterBy<IQuickScoresGameData>(
    game => game.Date >= todaysDate
  );

  let upcomingGames: ILeagueTable = {};

  for (const key of Object.keys(QUICKSCOREDIR)) {
    const DistrictQuickScore = new QuickScoreDistrict(
      QUICKSCOREDIR[key],
      process.env[key]
    );

    // Get event list
    let districtEventList = await DistrictQuickScore.eventList();
    //console.log(districtEventList);
    //console.log(districtEventList);

    // filter by sports first
    // this avoids us then getting league data that we don't need later.

    if (key === "CAROL_STREAM_PARK_DISTRICT") {
      districtEventList = filterBySports([
        "Soccer",
        "Volleyball",
        "Hockey",
        "Dodgeball"
      ])(districtEventList);
    }

    // TODO if carol stream only get soccer volleyball hockey dodgeball

    // filter by the season

    const seasonSchedule = filterByLeagueSeason(districtEventList);

    for (let league of seasonSchedule) {
      upcomingGames[league.LeagueID] = [];

      let {
        RegularGameData,
        LeagueName,
        SportName
      } = await DistrictQuickScore.scheduleInfo(league.LeagueID);
      //console.log(SportName);
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
  }

  return upcomingGames;
}
