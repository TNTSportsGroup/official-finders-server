class QuickScoreReq {
  private orgDir: string;
  private authToken: string;
  constructor(orgDir: string, authToken: string) {
    this.orgDir = orgDir;
    this.authToken = authToken;
  }

  async orgInfo() {
    const response = await fetch(
      `https://wwww.quickscores.com/API/OrgInfo.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}`
    );

    return response;
  }

  async eventList() {
    const response = await fetch(
      `https://www.quickscores.com/API/EventList.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}`
    );

    return response;
  }

  async scheduleInfo(leagueID: string) {
    const response = await fetch(
      `http://www.quickscores.com/API/ScheduleInfo.php?OrgDir=${
        this.orgDir
      }&APIAuthToken=${this.authToken}&LeagueID=${leagueID}`
    );

    return response;
  }
}
