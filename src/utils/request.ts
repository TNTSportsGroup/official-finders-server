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
}
