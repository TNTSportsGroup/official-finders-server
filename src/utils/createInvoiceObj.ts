import { IGameInvoice } from "./scrape/scrapeHwrInvoices";
import { getInvoiceName } from "./getInvoiceName";
import { convertToSummableValue } from "./convertToSummableValue";

export const createInvoiceObj = (data: IGameInvoice[]) => {
  const invoiceObj = {};
  getKeys(data, invoiceObj);
  insertGames(data, invoiceObj);

  SumUpMoney(invoiceObj);

  return invoiceObj;
};

const getKeys = (data: IGameInvoice[], obj: object) => {
  data.forEach((value, index) => {
    const key = getInvoiceName(value.Type);

    if (obj[key]) {
      return;
    }

    obj[key] = {
      games: []
    };
  });
};

const insertGames = (data: IGameInvoice[], obj: object) => {
  data.forEach((value, index) => {
    const keyItBelongsTo = getInvoiceName(value.Type);

    if (obj[keyItBelongsTo]) {
      obj[keyItBelongsTo].games.push(value);
    }
  });
};

const SumUpMoney = invoiceObj => {
  return Object.keys(invoiceObj).forEach(key => {
    let totalSum = 0;
    invoiceObj[key].games = invoiceObj[key].games.map(game => {
      totalSum += convertToSummableValue(game.Total);
      return {
        ...game,
        ["Current Total"]: `$${totalSum}`
      };
    });
  });
};

export const getCompleteTotal = invoiceObj => {
  let completeTotal = 0;

  return Object.keys(invoiceObj).reduce((prev, current) => {
    return (
      prev +
      convertToSummableValue(
        invoiceObj[current].games[invoiceObj[current].games.length - 1][
          "Current Total"
        ]
      )
    );
  }, completeTotal);
};
