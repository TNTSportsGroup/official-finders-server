import { filterBySports } from "../utils/quickscores/filterBySports";

let data = [
  {
    LeagueID: "999623",
    EventOrder: "1",
    Season: "Spring 2019",
    Sport: "Flag Football - Adult",
    LeagueName: "Adult Flag Football - Sunday - Competitive"
  },
  {
    LeagueID: "999685",
    EventOrder: "2",
    Season: "Spring 2019",
    Sport: "Flag Football - Adult",
    LeagueName: "Adult Flag Football - Sunday - Recreational"
  },
  {
    LeagueID: "1005638",
    EventOrder: "1",
    Season: "Spring 2019",
    Sport: "Soccer - Youth",
    LeagueName: "U6 Instructional Soccer"
  },
  {
    LeagueID: "1005639",
    EventOrder: "2",
    Season: "Spring 2019",
    Sport: "Soccer - Youth",
    LeagueName: "U8 Soccer - Games"
  },
  {
    LeagueID: "1004081",
    EventOrder: "1",
    Season: "Spring 2019",
    Sport: "Volleyball - Youth",
    LeagueName: "5/6 Grade Volleyball"
  },
  {
    LeagueID: "1004156",
    EventOrder: "2",
    Season: "Spring 2019",
    Sport: "Volleyball - Youth",
    LeagueName: "7/8 Grade Volleyball"
  },
  {
    LeagueID: "1003171",
    EventOrder: "1",
    Season: "Spring 2019",
    Sport: "Baseball",
    LeagueName: "8U Baseball - Practices"
  }
];

describe("filterBySports", () => {
  test("filterBySports, select 1 sport", () => {
    const results = filterBySports(["Football"])(data);

    expect(results.length).toEqual(2);
  });
  test("filterBySports, select 2 sports", () => {
    const results = filterBySports(["Football", "Soccer"])(data);

    expect(results.length).toEqual(4);
  });

  test("filterBySports, select 3 sports", () => {
    const results = filterBySports(["Football", "Soccer", "Baseball"])(data);

    expect(results.length).toEqual(5);
  });
});
