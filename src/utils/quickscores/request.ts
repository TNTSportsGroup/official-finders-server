import axios from "axios";
import {
  IQuickScoresOrgInfo,
  IQuickScoresEvent,
  IQuickScoresSchedule
} from "./types";

export class QuickScoreDistrict {
  private orgDir: string;
  private authToken: string;
  constructor(orgDir: string, authToken: string) {
    this.orgDir = orgDir;
    this.authToken = authToken;
  }

  async orgInfo(): Promise<IQuickScoresOrgInfo> {
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

  async eventList(): Promise<IQuickScoresEvent[]> {
    try {
      const response = await axios.get(
        `https://www.quickscores.com/API/EventList.php?OrgDir=${
          this.orgDir
        }&APIAuthToken=${this.authToken}`
      );

      return response.data;
    } catch (error) {
      console.error(`${error.response.data}, error with ${this.orgDir}`);
    }
  }

  async scheduleInfo(leagueID: string): Promise<IQuickScoresSchedule> {
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
