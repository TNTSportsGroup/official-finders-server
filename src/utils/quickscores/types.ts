export interface IGame {
  GameID: string;
  LeagueName: string;
  Date: string;
  Time: string;
  LocationName: string;
  HomeTeam: string;
  AwayTeam: string;
}

export interface ILeagueTable {
  [key: string]: IGame[];
}
