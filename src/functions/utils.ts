import axiosInstance from "../api";
import { Character, Episode, Location, RMApiResponse } from "../interfaces/d";

export const getAllInfo = async (route: string) => {
  const answerAux = [];
  const { data }: { data: RMApiResponse<any> } = await axiosInstance.get(route);
  const firstAnswer = data.results;
  const { pages } = data?.info;
  for (let i = 2; i <= pages; i++) {
    answerAux.push(axiosInstance.get(route, { params: { page: i } }));
  }
  const results = (await Promise.all(answerAux))?.map(
    (elem) => elem?.data?.results
  );
  return [firstAnswer, ...results.reduce((acc, elem) => [...acc, ...elem], [])];
};

export const getMatchesNumber = (letter: string, elements: any[]): number =>
  elements.reduce((acc: number, elem: Location | Character | Episode) => {
    if (elem?.name?.toLocaleLowerCase()?.includes(letter)) {
      return acc + 1;
    }
    return acc;
  }, 0);

export const getTimeStats = (result, start, finish) => {
  const delta = (finish - start) / 10e3;
  const seconds = Math.trunc(delta);
  const milli = delta % 1;
  result.time = `${seconds ? `${seconds}s` : ""}${
    milli ? ` ${milli * 10e2}ms` : ""
  }`;
  result.in_time = delta < 3;
};
