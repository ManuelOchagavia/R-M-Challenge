import charCounter from "./functions/charCounter";
import episodeLocations from "./functions/episodeLocations";
import { getTimeStats, writeJson } from "./functions/utils";
import { CharacterLocationAnswer, CharCounterAnswer } from "./interfaces/d";

const exerciseWrapper = async () => {
  const startCounter = Date.now();
  const answerCounter = (await charCounter()) as CharCounterAnswer;
  const finishCounter = Date.now();
  const startOrigin = Date.now();
  const answerOrigin = (await episodeLocations()) as CharacterLocationAnswer;
  const finishOrigin = Date.now();
  getTimeStats(answerCounter, startCounter, finishCounter);
  getTimeStats(answerOrigin, startOrigin, finishOrigin);
  writeJson(JSON.stringify([answerCounter, answerOrigin], null, 2));
};

exerciseWrapper();
