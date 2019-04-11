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
export interface IQuickScoresEvent {
  LeagueID: string;
  EventOrder: string;
  Season: string;
  Sport: string;
  LeagueName: string;
  PublicStatus: string;
  ViewScheduleURL: string;
  PrintScheduleURL: string;
  MessagePageList: string;
  ParentLeagueID: string;
  SubEventTitle: string;
  SubEventOrder: string;
  ExternalEventID: string;
  DayOfWeek: string;
}

export interface IQuickScoresGameData {
  GameID: string;
  Week: string;
  DateTime: string;
  Date: string;
  Time: string;
  LocationID: string;
  LocationName: string;
  TeamID1: string;
  TeamID2: string;
  TeamName1: string;
  TeamName2: string;
  PoolName1: string;
}

export interface IQuickScoresSchedule {
  LeagueID: string;
  ExternalEventID: string;
  LeagueName: string;
  SportName: string;
  SeasonName: string;
  PublicStatus: "Hidden" | "Public";
  MainLeagueContact: string;
  LeagueMessage: string;
  MessageBgColor: string;
  MessagePageList: string;
  TeamLabel1: string;
  TeamLabel2: string;
  ViewScheduleURL: string;
  PrintScheduleURL: string;
  StandingsData: [
    {
      Rank: string;
      TeamID: string;
      TeamName: string;
      Subtitle: string;
      Wins: string;
      Losses: string;
      PoolName: string;
      TotalGamesPlayed: string;
      Ties: string;
      OTWins: string;
      OTLosses: string;
      OTTies: string;
      TieBreakers: {
        [key: string]: {
          ShortName: string;
          LongName: string;
          Value: string;
        };
      };
    }
  ];
  LegendText: string;
  LegendLinks: string;
  RegularGameData: IQuickScoresGameData[];
}

export interface IQuickScoresOrgInfo {
  OrgName: string;
  OrgDir: string;
  City: string;
  State: string;
  Zip: string;
  Latitude: string;
  Longitude: string;
  TimeZone: string;
  DisplayOrgName: string;
  Logo: string;
  DisplayUrl: string;
  HomePageHTML: string;
  MobileHomePageHTML: string;
  MessageLastUpdated: string;
  HomePageBgColor: string;
  MobileDisplayOrgName: string;
  MobileHeaderLogo: string;
  ContactUs: string;
  Downloads: [
    {
      displayName: string;
      FileUrl: string;
      GroupName: string;
      LastUpdated: string;
    }
  ];
}
