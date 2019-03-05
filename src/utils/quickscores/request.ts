import axios from "axios";

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

  async eventList(): Promise<
    [
      {
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
    ]
  > {
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

  async scheduleInfo(leagueID: string) {
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
