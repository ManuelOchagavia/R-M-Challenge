import { charactersRoute, episodesRoute, locationsRoute } from "../api/routes";
import { Character, Episode } from "../interfaces/d";
import { getAllInfo, getMatchesNumber } from "./utils";

const routes = [locationsRoute, episodesRoute, charactersRoute];
const letters = ["l", "e", "c"];

const charCounter = async () => {
  const promises = routes.map((route) => getAllInfo(route()));
  const responses = (await Promise.all(promises)) as [
    Location[],
    Episode[],
    Character[]
  ];
  const counters = responses.reduce(
    (respAcc, response, index) => [
      ...respAcc,
      getMatchesNumber(letters[index], response),
    ],
    []
  );

  return {
    exercise_name: "Char counter",
    results: counters.map((elem, index) => ({
      char: letters[index],
      count: elem,
      resource: routes[index](),
    })),
  };
};

export default charCounter;
