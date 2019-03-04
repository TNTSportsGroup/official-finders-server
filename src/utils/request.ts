import axios from "axios";

export class QuickScoreReq {
  private orgDir: string;
  private authToken: string;
  constructor(orgDir: string, authToken: string) {
    this.orgDir = orgDir;
    this.authToken = authToken;
  }

  async orgInfo() {
    try {
      const response = await axios.get(
        `https://www.quickscores.com/API/OrgInfo.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async eventList() {
    const response = await axios.get(
      `https://www.quickscores.com/API/EventList.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}`
    );

    return response.data;
  }

  async scheduleInfo(leagueID: string) {
    const response = await axios.get(
      `http://www.quickscores.com/API/ScheduleInfo.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}&LeagueID=${leagueID}`
    );

    return response;
  }

  async locationList() {
    const response = await axios.get(
      `http://www.quickscores.com/API/LocationsList.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}`
    );

    return response;
  }

  async location(locationID: string) {
    const response = await axios.get(
      `http://www.quickscores.com/API/LocationPage.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}&LocationID=${locationID}`
    );

    return response;
  }
}
