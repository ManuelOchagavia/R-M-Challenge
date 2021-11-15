import { charactersRoute, episodesRoute } from "../api/routes";
import { CharacterOriginInfo, Episode } from "../interfaces/d";
import {
  buildEpisodeWithCharacterInfo,
  getAllInfo,
  getCharactersOrigin,
} from "./utils";

const episodeLocations = async () => {
  const episodesInfo: Episode[] = await getAllInfo(episodesRoute());
  const charactersOrigin = (await getCharactersOrigin()) as CharacterOriginInfo;
  const result = buildEpisodeWithCharacterInfo(episodesInfo, charactersOrigin);

  return {
    exercise_name: "Episodes locations",
    results: result,
  };
};

export default episodeLocations;
