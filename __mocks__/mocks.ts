import { datatype, date, internet, lorem, name } from "faker";
import { randomPick } from "../src/functions/utils";
import {
  Character,
  Episode,
  Location,
  Origin,
  RMApiResponse,
} from "../src/interfaces/d";

export const mockGetCharacter = (
  origin?: Origin,
  url?: string,
  characterName?: string
): Character => ({
  id: datatype.number(),
  name: characterName ?? name.firstName(),
  status: randomPick(["alive", "dead", "unknown"]),
  species: lorem.word(),
  type: lorem.word(),
  gender: randomPick(["unknown", "male", "female", "genderless"]),
  origin: origin ?? { name: lorem.word(), url: lorem.word() },
  location: {
    name: lorem.word(),
    url: internet.url(),
  },
  image: internet.url(),
  episode: [lorem.word(), lorem.word()],
  url: url ?? internet.url(),
  created: date.past().toISOString(),
});

export const mockGetLocation = (locationName?: string): Location => ({
  id: datatype.number(),
  name: locationName ?? name.firstName(),
  type: lorem.word(),
  dimension: lorem.word(),
  residents: [lorem.word()],
  url: internet.url(),
  created: date.past().toISOString(),
});

export const mockGetEpisode = (
  charactersUrls?: string[],
  episodeName?: string
): Episode => ({
  id: datatype.number(),
  name: episodeName ?? name.firstName(),
  episode: lorem.word(),
  characters: charactersUrls ?? [lorem.word()],
  air_date: date.past().toISOString(),
  url: internet.url(),
  created: date.past().toISOString(),
});

export const mockApiResponse = (
  n: number,
  getElement: (...vars: any) => Character | Location | Episode,
  origin?: Origin,
  results?: any
): { data: RMApiResponse<Character | Location | Episode> } => ({
  data: {
    info: { pages: n, count: 1, next: "", prev: "" },
    results: results ?? [getElement(origin)],
  },
});
