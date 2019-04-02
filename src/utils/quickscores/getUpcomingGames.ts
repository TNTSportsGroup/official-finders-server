import { matchSeasonAndYear } from "./matchSeasonAndYear";
import { filterBy } from "./filterBy";
import { QuickScoreDistrict } from "./request";
import { ILeagueTable, IQuickScoresEvent, IQuickScoresGameData } from "./types";

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba",
  GENEVA_PARK_DISTRICT: "genevaparks",
  GIRLS: "girls",
  WHEATON_PARK_DISTRICT: "wheaton",
  CAROL_STREAM_PARK_DISTRICT: "csparks"
};

const seasonToFilterBy = matchSeasonAndYear("Winter", 2019);

const filterByLeagueSeason = filterBy<IQuickScoresEvent>(league =>
  seasonToFilterBy(league.Season)
);

const filterByDate = filterBy<IQuickScoresGameData>(
  game => game.Date >= "2019-03-13"
);

interface UpcomingGamesOptions {
  districtFilterOptions: {
    [key: string]: {
      filterBySports: () => void;
    };
  };
}

export async function getUpcomingGames(
  season?: string,
  options?: UpcomingGamesOptions
) {
  const DistrictQuickScore = new QuickScoreDistrict(
    QUICKSCOREDIR.GLEN_ELLYN_PARK_DISTRICT,
    process.env.GLEN_ELLYN_PARK_DISTRICT
  );
  // Get event list
  const districtEventList = await DistrictQuickScore.eventList();

  // TODO if carol stream only get soccer volleyball hockey dodgeball

  // filter by the season

  const seasonSchedule = filterByLeagueSeason(districtEventList);

  let upcomingGames: ILeagueTable = {};

  for (let league of seasonSchedule) {
    upcomingGames[league.LeagueID] = [];

    let { RegularGameData, LeagueName } = await DistrictQuickScore.scheduleInfo(
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
