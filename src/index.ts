import charCounter from "./functions/charCounter";
import { getTimeStats } from "./functions/utils";
import { CharCounterAnswer } from "./interfaces/d";

const exerciseWrapper = async () => {
  const start = Date.now();
  const answer = (await charCounter()) as CharCounterAnswer;
  const finish = Date.now();
  getTimeStats(answer, start, finish);
  console.log(answer);
};

exerciseWrapper();
