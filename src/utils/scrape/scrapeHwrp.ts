import cheerio from "cheerio";

export interface User {
  name: string;
  amount: string;
}

export const scrapeHWRP = (html: string) => {
  var $ = cheerio.load(html);
  var rows = $(`[name="myform"] table tbody tr[bgcolor^="#"]`);

  let data: User[] = [];

  rows.each((index, el) => {
    const name = $(el)
      .find(`input[name="paymentOID[]"] + b`)
      .text();
    const amount = $(el)
      .find(`input[name="paymentAmount[]"] + font`)
      .text();

    let user: User = {
      name,
      amount
    };

    data.push(user);
  });

  return data;
};
