import cheerio from "cheerio";

export interface IGameInvoice {
  ["ID"]: string;
  ["Game Date"]: string;
  ["Type"]: string;
  ["Home Team"]: string;
  ["Away Team"]: string;
  ["Facility"]: string;
  ["Game Fee"]: string;
  ["Travel"]: string;
  ["Other"]: string;
  ["Total"]: string;
}

export const scrapeHwrInvoices = (html: string): IGameInvoice[] => {
  var $ = cheerio.load(html);
  var rows = $(`table[width="100%"] tbody tr[bgcolor^="#"]`);
  var rowsLength = rows.length;
  var tableTitle = {
    0: "ID",
    1: "Game Date",
    2: "Type",
    3: "Home Team",
    4: "Away Team",
    5: "Facility",
    6: "Game Fee",
    7: "Travel",
    8: "Other",
    9: "Total"
  };

  const data: IGameInvoice[] = [];

  rows.each((index, element) => {
    if (index === 0) {
      return;
    }

    let tdList = $(element).find("td");
    let gameData = {};

    tdList.each((index, element) => {
      gameData[tableTitle[index]] = $(element).text();
    });

    data.push(gameData as IGameInvoice);
  });

  return data;
};
