import axiosInstance from "../../src/api";
import {
  buildEpisodeWithCharacterInfo,
  getAllInfo,
  getCharactersOrigin,
  getDistinctCharacters,
  getMatchesNumber,
  getTimeStats,
} from "../../src/functions/utils";
import {
  mockApiResponse,
  mockGetCharacter,
  mockGetEpisode,
  mockGetLocation,
} from "../../__mocks__/mocks";

jest.mock("../../src/api");
const mockedAxios = axiosInstance as jest.Mocked<any>;

describe("Utils tests", () => {
  afterEach(() => {
    mockedAxios.mockReset();
  });

  it("Should get all elements correctly", async () => {
    const totalPages = 5;
    mockedAxios.get.mockReturnValue(
      Promise.resolve(mockApiResponse(totalPages, mockGetCharacter))
    );
    const result = await getAllInfo("mocked-route");
    expect(mockedAxios.get).toHaveBeenCalledTimes(totalPages);
    expect(result).toHaveLength(totalPages);
    result.forEach((elem) =>
      expect(Object.keys(elem)).toEqual(Object.keys(mockGetCharacter()))
    );
  });

  it("Should find locations with 'l' letter on name", () => {
    const locationsNames = [
      "Narnia",
      "Lisboa",
      "Libia",
      "Costa de Marfil",
      "Trinidad y Tobago",
    ];
    const result = getMatchesNumber(
      "l",
      locationsNames.map((name) => mockGetLocation(name))
    );
    expect(result).toBe(3);
  });

  it("Should add correctly time and if ended in time", () => {
    const result = {} as { time: string; in_time: Boolean };
    const start = 133232;
    const end = 134434;
    getTimeStats(result, start, end);
    expect(result).toHaveProperty("time");
    expect(result).toHaveProperty("in_time");
    expect(result.time).toBe("1s 202ms");
    expect(result.in_time).toBeTruthy();
  });

  it("Should get distinct characters correctly", () => {
    const charactersList = [
      ["Aslan", "Cinderella", "Mickey"],
      ["Mickey", "Robin Hood"],
      ["Robin Hood", "Little John"],
    ];
    const result = getDistinctCharacters(
      charactersList.map((characters) => mockGetEpisode(characters))
    );
    expect(result).toEqual(
      expect.arrayContaining([
        "Aslan",
        "Cinderella",
        "Mickey",
        "Robin Hood",
        "Little John",
      ])
    );
  });

  it("Should get all characters origin locations", async () => {
    const totalPages = 5;
    const charactersOrigins = [
      {
        name: "Narnia",
        url: "",
      },
      {
        name: "Askaban",
        url: "",
      },
      {
        name: "Vinland",
        url: "",
      },
      {
        name: "Hispania",
        url: "",
      },
      {
        name: "Atlantis",
        url: "",
      },
    ];
    charactersOrigins.map((origin) =>
      mockedAxios.get.mockReturnValueOnce(
        Promise.resolve(mockApiResponse(totalPages, mockGetCharacter, origin))
      )
    );
    const result = await getCharactersOrigin();

    expect(Object.values(result).map((origin) => origin.name)).toEqual(
      expect.arrayContaining(charactersOrigins.map((origin) => origin.name))
    );
  });

  it("Should build episodes with origin info", async () => {
    const charactersEpisode = [["treeMan.cl", "aslan.cl"], ["aslan.cl"]];
    const episodes = charactersEpisode.map((episodes) =>
      mockGetEpisode(episodes)
    );

    const charactersOrigin = {
      "treeMan.cl": { name: "Earth", url: "" },
      "aslan.cl": { name: "Narnia", url: "" },
    };
    const charactersOriginInverse = {
      Earth: "treeMan.cl",
      Narnia: "aslan.cl",
    };
    const result = buildEpisodeWithCharacterInfo(episodes, charactersOrigin);
    result.forEach((elem, index) => {
      expect(elem.locations).toHaveLength(charactersEpisode[index].length);
      elem.locations.forEach((location, i) =>
        expect(charactersOriginInverse[location]).toEqual(
          charactersEpisode[index][i]
        )
      );
    });
  });
});
