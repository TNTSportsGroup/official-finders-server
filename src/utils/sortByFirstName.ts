import { User } from "./scrape/scrapeHwrp";

export const sortByFirstName = (data: User[]) => {
  return data.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};
