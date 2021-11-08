export const locationsRoute = (): string => "location";

export const episodesRoute = (): string => "episode";

export const charactersRoute = (): string => "character";

export const locationRoute = (id: number): string => `location/${id}`;

export const episodeRoute = (id: number): string => `episode/${id}`;

export const characterRoute = (id: number): string => `character/${id}`;
