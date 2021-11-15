import axiosInstance from "../src/api";
import episodeLocations from "../src/functions/episodeLocations";
import {
  mockApiResponse,
  mockGetCharacter,
  mockGetEpisode,
} from "../__mocks__/mocks";

jest.mock("../src/api");
const mockedAxios = axiosInstance as jest.Mocked<any>;

it("Should get origin locations of episode's characters", async () => {
  const totalPagesEpisodes = 2;
  const charactersUrls = [["aslan.cl", "sirius.cl"], ["aslan.cl"]];
  charactersUrls.map((urls) =>
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve(
        mockApiResponse(totalPagesEpisodes, undefined, undefined, [
          mockGetEpisode(urls),
        ])
      )
    )
  );
  const totalPages = 2;
  const charactersInfo = [
    {
      origin: {
        name: "Narnia",
        url: "",
      },
      url: "aslan.cl",
    },
    {
      origin: {
        name: "Askaban",
        url: "",
      },
      url: "sirius.cl",
    },
  ];
  charactersInfo.map((info) =>
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve(
        mockApiResponse(totalPages, undefined, undefined, [
          mockGetCharacter(info.origin, info.url),
        ])
      )
    )
  );

  const result = await episodeLocations();
  expect(result.exercise_name).toBe("Episodes locations");
  expect(result.results[0].locations).toStrictEqual(["Narnia", "Askaban"]);
  expect(result.results[1].locations).toStrictEqual(["Narnia"]);
});
