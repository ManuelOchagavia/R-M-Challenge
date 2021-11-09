export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Character {
  id: number;
  name: string;
  status: "alive" | "dead" | "unknown";
  species: string;
  type: string;
  gender: "male" | "female" | "genderless" | "unknown";
  origin: {
    name: string;
    link: string;
  };
  image: string;
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ResponseInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface RMApiResponse<T> {
  info: ResponseInfo;
  results: T[];
}

export interface CharCounterAnswer {
  exercise_name: string;
  time: string;
  in_time: boolean;
  results: {
    char: string;
    count: number;
    resource: string;
  }[];
}
