import axiosInstance from "../src/api";
import charCounter from "../src/functions/charCounter";
import {
  mockApiResponse,
  mockGetCharacter,
  mockGetEpisode,
  mockGetLocation,
} from "../__mocks__/mocks";

jest.mock("../../src/api");
const mockedAxios = axiosInstance as jest.Mocked<any>;

it("Should get origin locations of episode's characters", async () => {
  const totalPagesLocations = 1;
  const locations = ["Cheeto", "Delirium", "Rally", "Egneto"];
  mockedAxios.get.mockReturnValueOnce(
    Promise.resolve(
      mockApiResponse(
        totalPagesLocations,
        undefined,
        undefined,
        locations.map((name) => mockGetLocation(name))
      )
    )
  );

  const totalPagesEpisodes = 1;
  const episodes = ["Cheeto", "Dalmata", "Rally", "Egneto"];
  mockedAxios.get.mockReturnValueOnce(
    Promise.resolve(
      mockApiResponse(
        totalPagesEpisodes,
        undefined,
        undefined,
        episodes.map((name) => mockGetEpisode(undefined, name))
      )
    )
  );

  const totalPagesCharacters = 1;
  const characters = ["Cheeto", "Delirium", "Rally", "Edecan"];
  mockedAxios.get.mockReturnValueOnce(
    Promise.resolve(
      mockApiResponse(
        totalPagesCharacters,
        undefined,
        undefined,
        characters.map((name) => mockGetCharacter(undefined, undefined, name))
      )
    )
  );

  const result = await charCounter();
  expect(result.exercise_name).toBe("Char counter");
  result.results.forEach((result) => expect(result.count).toBe(2));
});
