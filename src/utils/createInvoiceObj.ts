import { IGameInvoice } from "./scrape/scrapeHwrInvoices";
import { getInvoiceName } from "./getInvoiceName";

export const createInvoiceObj = (data: IGameInvoice[]) => {
  const invoiceObj = {};
  getKeys(data, invoiceObj);
  insertGames(data, invoiceObj);

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
