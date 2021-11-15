import fs from "fs";

import axiosInstance from "../api";
import { charactersRoute } from "../api/routes";
import {
  Character,
  CharacterOriginInfo,
  Episode,
  Location,
  RMApiResponse,
} from "../interfaces/d";

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
  return [
    ...firstAnswer,
    ...results.reduce((acc, elem) => [...acc, ...elem], []),
  ];
};

export const getMatchesNumber = (letter: string, elements: any[]): number =>
  elements.reduce((acc: number, elem: Location | Character | Episode) => {
    if (elem?.name?.toLocaleLowerCase()?.includes(letter)) {
      return acc + 1;
    }
    return acc;
  }, 0);

export const getTimeStats = (result, start, finish) => {
  const delta = finish - start;
  const seconds = Math.trunc(delta / 1000);
  const milli = delta % 1000;
  result.time = `${seconds ? `${seconds}s` : ""}${milli ? ` ${milli}ms` : ""}`;
  result.in_time = delta < 3000;
};

export const getDistinctCharacters = (episodes: Episode[]) => {
  const distinctCharacters = {};
  episodes?.forEach((elem) =>
    elem?.characters?.forEach((item) => {
      if (!distinctCharacters[item]) distinctCharacters[item] = true;
    })
  );
  return Object.keys(distinctCharacters);
};

export const getCharactersOrigin = async () => {
  const answer: Character[] = await getAllInfo(charactersRoute());
  const originsByCharacter: CharacterOriginInfo = {};
  answer.forEach((elem) => (originsByCharacter[elem.url] = elem.origin));
  return originsByCharacter;
};

export const buildEpisodeWithCharacterInfo = (
  episodes: Episode[],
  originsByCharacter: CharacterOriginInfo
) => {
  const result = [];
  episodes?.forEach((elem) => {
    const { episode, characters, name } = elem ?? ({} as Episode);
    result.push({
      name,
      episode,
      locations: characters?.map((elem) => originsByCharacter[elem]?.name),
    });
  });
  return result;
};

export const writeJson = (data) => {
  fs.writeFile("response.json", data, function (err) {
    if (err) return console.log(err);
    console.log(`Saved at > response.json`);
  });
};

// Testing utils

export const randomPick = (list: any[]): any =>
  list[Math.floor(Math.random() * list.length)];
