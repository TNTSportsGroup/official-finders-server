import axios from "axios";

export interface IEvent {
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

export interface ISchedule {
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
  RegularGameData: [
    {
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
  ];
}

export class QuickScoreReq {
  private orgDir: string;
  private authToken: string;
  constructor(orgDir: string, authToken: string) {
    this.orgDir = orgDir;
    this.authToken = authToken;
  }

  async orgInfo(): Promise<{
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
  }> {
    try {
      const response = await axios.get(
        `https://www.quickscores.com/API/OrgInfo.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async eventList(): Promise<IEvent[]> {
    try {
      const response = await axios.get(
        `https://www.quickscores.com/API/EventList.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async scheduleInfo(leagueID: string): Promise<ISchedule> {
    try {
      const response = await axios.get(
        `http://www.quickscores.com/API/ScheduleInfo.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}&LeagueID=${leagueID}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async locationList() {
    try {
      const response = await axios.get(
        `http://www.quickscores.com/API/LocationsList.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async location(locationID: string) {
    try {
      const response = await axios.get(
        `http://www.quickscores.com/API/LocationPage.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}&LocationID=${locationID}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
